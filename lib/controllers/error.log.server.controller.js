var errorLogController = (function () {

    'use strict';

    var dataProviderHelper = require('../data/mongo.provider.helper'),
        HTTPStatus = require('http-status'),
        messageConfig = require('../configs/api.message.config'),
        ErrorLog = require('../models/error.log.server.model'),
        errorHelper = require('../helpers/error.helper'),
        mailHelper = require('../helpers/mail.helper'),
        utilityHelper = require('../helpers/utilities.helper'),
        Promise = require("bluebird");

    var supportEmailId = "help@nodebeats.com";
    var documentFields='_id errorMessage errorStack errorType errorNotified addedOn';

    function ErrorLogModule(){}

    ErrorLogModule.CreateErrorLog = function(errorLogObj){
        var errorLogInfo = new ErrorLog();
        errorLogInfo.errorMessage = errorLogObj.errorMessage;
        errorLogInfo.errorStack = errorLogObj.errorStack;
        errorLogInfo.errorType = errorLogObj.errorType;
        errorLogInfo.addedBy = 'system';
        errorLogInfo.addedOn = new Date();
        return errorLogInfo;
    };

    var _p = ErrorLogModule.prototype;

    _p.getErrorLogs = function(req, next){
        var pagerOpts = utilityHelper.getPaginationOpts(req, next);
        var query = {};
        if(req.query.startdate && req.query.enddate && (new Date(req.query.startdate) instanceof Date) && (new Date(req.query.enddate) instanceof Date)){
            if(req.query.startdate === req.query.enddate){
                req.query.enddate = new Date(req.query.enddate).setHours(23, 59, 59, 999);
            }
            query.addedOn = {
                $gte: new Date(req.query.startdate),
                $lte: new Date(req.query.enddate)
            };
        }
        else if(req.query.startdate && !req.query.enddate && (new Date(req.query.startdate) instanceof Date) ){
            var currentDate = new Date(req.query.startdate);
            var startDate = currentDate.setHours(0, 0, 0, 0);
            var endDate = currentDate.setHours(23, 59, 59, 999);

            query.addedOn = {
                $gt: startDate,
                $lt: endDate
            };
        }
        var sortOpts = { addedOn: -1 };
        return dataProviderHelper.getAllWithDocumentFieldsPagination(ErrorLog, query, pagerOpts, documentFields, sortOpts);
    };

    _p.deleteErrorLog = function(req, res, next){

        var updateQueryOpts = {};
        if(!req.query.deleteall){
            updateQueryOpts = {
                _id: req.params.errorLogId
            };
        }

        dataProviderHelper.removeModelData(ErrorLog, updateQueryOpts)
            .then(function(){
                res.status(HTTPStatus.OK);
                res.json({
                    message: messageConfig.errorLog.deleteMessage
                });
            })
            .catch(function(err){
                return next(err);
            });
    };

    _p.postErrorLogs = function(err, req, next){
        var errObj = errorHelper.getErrorObj(err, next);
        var errorLogInfo = ErrorLogModule.CreateErrorLog(errObj);

        dataProviderHelper.save(errorLogInfo)
            .then(function(){
                console.log('error saved');
            })
            .catch(function(){
                // return next(err);
            });

    };

    _p.sendNotificationEmailToSolveErrors = function(req, res, next){

        var query = {};
        query.errorNotified = false;
        var sortOpts = { addedOn: -1 };

        dataProviderHelper.getAllWithDocumentFieldsNoPagination(ErrorLog, query, documentFields, sortOpts)
            .then(function(lstErrorLogs){
                if(lstErrorLogs.length > 0){
                    return _p.sendEmail(req, lstErrorLogs, next);
                }else{
                    throw new Promise.CancellationError('{ "statusCode":"' + HTTPStatus.CONFLICT + '", "message": "' + messageConfig.errorLog.emailAlreadySent + '"}');
                }
            })
            .then(function(){
                return _p.updateErrorNotifiedBit();
            })
            .then(function(){
                res.status(HTTPStatus.OK);
                res.json({
                    message: messageConfig.errorLog.emailSentMessage
                });
            })
            .catch(Promise.CancellationError, function (cancellationErr) {
                errorHelper.customErrorResponse(res, cancellationErr, next);
            })
            .catch(function(err){
                return next(err);
            });

    };

    _p.sendEmail = function(req, lstErrorLogs, next){
        var applicationUrl = utilityHelper.getApplicationDeploymentPortNumber(req);

        var messageBody = '';
        messageBody += '<h2>Email to report application errors</h2>';
        messageBody += '<p>Following table contains the errors that occured in the application</p>';
        messageBody += '<br/>';
        messageBody += '<br/>';
        messageBody += '<hr/>';
        messageBody += '<table class="error_log_tbl">';
        messageBody += '<thead  style="background-color: slategray; color: #ffffff; font-size: 18px;margin-bottom: 20px;">';
        messageBody += '<tr>';
        messageBody += '<th>S.N.</th>';
        messageBody += '<th>Error Message</th>';
        messageBody += '<th>Error Stack</th>';
        messageBody += '<th>Error Type</th>';
        messageBody += '<th>Exception Date</th>';
        messageBody += '</thead>';
        messageBody += '<tbody>';
        lstErrorLogs.forEach(function(errObj, index) {
            if(index % 2 === 0){
                messageBody += '<tr style="margin-bottom: 20px;padding: 10px;">';
            }else{
                messageBody += '<tr style="margin-bottom: 20px;padding: 10px; background-color: lightgrey">';
            }
            messageBody += '<td>';
            messageBody += (index + 1);
            messageBody += '</td>';
            messageBody += '<td>';
            messageBody += errObj.errorMessage;
            messageBody += '</td>';
            messageBody += '<td>';
            messageBody += errObj.errorStack;
            messageBody += '</td>';
            messageBody += '<td>';
            messageBody += errObj.errorType;
            messageBody += '</td>';
            messageBody += '<td>';
            messageBody += utilityHelper.getFormattedDate(errObj.addedOn, '-', next);
            messageBody += '</td>';

            messageBody += '</tr>';
            messageBody += '<tr>';
            messageBody += '<td colspan="5">';
            messageBody += '<br />';
            messageBody += '<br />';
            messageBody += '<hr />';
            messageBody += '</td>';
            messageBody += '</tr>';
        });
        messageBody += '</tbody>';
        messageBody += '</table>';

        var mailOptions = {
            fromEmail: req.decoded.user.email, // sender address
            toEmail: supportEmailId, // list of receivers
            subject: "Email to report application errors of " + applicationUrl, // Subject line
            textMessage: messageBody, // plaintext body
            htmlTemplateMessage: messageBody
        };

        return new Promise(function(resolve, reject) {
            mailHelper.sendEmailWithNoAttachment(req, mailOptions, next)
                .then(function(lstErrorLogs){
                    resolve(lstErrorLogs);
                })
                .catch(function(err){
                    reject(err);
                });
        });
    };

    _p.updateErrorNotifiedBit = function () {
        var errorLogSchema = {
            'errorNotified'  : true,
            'errorNotifiedDate' : new Date()
        };
        var updateQueryOpts = {
            errorNotified: false
        };
        var multiOpts = true;

        return dataProviderHelper.updateModelData(ErrorLog, updateQueryOpts, errorLogSchema, multiOpts);
    };

    return{
        getErrorLogs: _p.getErrorLogs,
        deleteErrorLog: _p.deleteErrorLog,
        postErrorLogs: _p.postErrorLogs,
        sendNotificationEmailToSolveErrors : _p.sendNotificationEmailToSolveErrors
    };

})();

module.exports = errorLogController;
