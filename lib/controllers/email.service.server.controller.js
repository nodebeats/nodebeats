var mailServiceController = (function () {

    'use strict';

    var dataProviderHelper = require('../data/mongo.provider.helper'),
        HTTPStatus = require('http-status'),
        messageConfig = require('../configs/api.message.config'),
        MailService = require('../models/email.service.server.model'),
        utilityHelper = require('../helpers/utilities.helper'),
        errorHelper = require('../helpers/error.helper'),
        Promise = require("bluebird");


    var documentFields = '_id serviceProviderType host port secure authUserName authPassword pool api_Key api_Secret api_User domain rateLimit addedOn';


    function EmailServiceModule(){}

    EmailServiceModule.createEmailService = function(emailServiceObj, loggedInUser){
        var newMailServiceConfigInfo = new MailService();

        newMailServiceConfigInfo.serviceProviderType = emailServiceObj.serviceProviderType;
        newMailServiceConfigInfo.host = emailServiceObj.host;
        newMailServiceConfigInfo.port = emailServiceObj.port === '' ? 587 : emailServiceObj.port;
        newMailServiceConfigInfo.secure = emailServiceObj.secure;
        newMailServiceConfigInfo.authUserName = emailServiceObj.authUserName;
        newMailServiceConfigInfo.authPassword = emailServiceObj.authPassword;
        newMailServiceConfigInfo.pool = emailServiceObj.pool;
        newMailServiceConfigInfo.api_Key = emailServiceObj.api_Key;
        newMailServiceConfigInfo.api_Secret = emailServiceObj.api_Secret;
        newMailServiceConfigInfo.api_User = emailServiceObj.api_User;
        newMailServiceConfigInfo.domain = emailServiceObj.domain;
        newMailServiceConfigInfo.rateLimit = emailServiceObj.rateLimit === '' ? 1 : emailServiceObj.rateLimit;
        newMailServiceConfigInfo.addedBy = loggedInUser;
        newMailServiceConfigInfo.addedOn = new Date();

        return newMailServiceConfigInfo;
    };

    var _p = EmailServiceModule.prototype;

    _p.checkValidationErrors = function(req){

        req.checkBody('serviceProviderType', messageConfig.emailService.validationErrMessage.serviceProviderType).notEmpty();
        if(req.body.port){
            req.checkBody('port', messageConfig.emailService.validationErrMessage.portValid).isInt();
        }
        if(req.body.host){
            req.checkBody('host', messageConfig.emailService.validationErrMessage.hostValid).isFQDN();
        }
        if(req.body.domain){
            req.checkBody('domain', messageConfig.emailService.validationErrMessage.domainValid).isFQDN();
        }
        if(req.body.rateLimit){
            req.checkBody('rateLimit', messageConfig.emailService.validationErrMessage.rateLimitValid).isInt();
        }

        return req.validationErrors();
    };

    _p.getMailServiceConfig = function(){

        return dataProviderHelper.findOne(MailService, {}, documentFields);
    };

    _p.getMailServiceConfigByID = function(req){

        return dataProviderHelper.findById(MailService, req.params.mailServiceConfigId, documentFields);
    };


    _p.postMailServiceConfig = function(req, res, next){
        var errors = _p.checkValidationErrors(req);
        if (errors) {
            res.status(HTTPStatus.BAD_REQUEST);
            res.json({
                message: errors
            });
        }else {

            dataProviderHelper.checkForDuplicateEntry(MailService, {})
                .then(function (count) {
                    if (count > 0) {
                        throw new Promise.CancellationError('{ "statusCode":"' + HTTPStatus.CONFLICT + '", "message": "' + messageConfig.emailService.alreadyExists + '"}');
                    } else {
                        var modelInfo = utilityHelper.sanitizeUserInput(req, next);
                        var newMailServiceConfig = EmailServiceModule.createEmailService(modelInfo, req.decoded.user.username);

                        return dataProviderHelper.save(newMailServiceConfig);
                    }
                })
                .then(function () {
                    res.status(HTTPStatus.OK);
                    res.json({
                        message: messageConfig.emailService.saveMessage
                    });
                })
                .catch(Promise.CancellationError, function (cancellationErr) {
                    errorHelper.customErrorResponse(res, cancellationErr, next);
                })
                .catch(function (err) {
                    return next(err);
                });
        }
    };

    _p.updateMailService = function(req, res, next){
        var errors = _p.checkValidationErrors(req);
        if (errors) {
            res.status(400);
            res.json({
                message: errors
            });
        }else {
            var modelInfo = utilityHelper.sanitizeUserInput(req, next);
            var rateLimit = 1;
            if(modelInfo  && modelInfo.rateLimit!=="null"){
                rateLimit = modelInfo.rateLimit;
            }
            req.mailService.serviceProviderType = modelInfo.serviceProviderType;
            req.mailService.host = modelInfo.host;
            req.mailService.port = modelInfo.port === '' ? 587 : modelInfo.port;
            req.mailService.secure = modelInfo.secure;
            req.mailService.authUserName = modelInfo.authUserName;
            req.mailService.authPassword = modelInfo.authPassword;
            req.mailService.pool = modelInfo.pool;
            req.mailService.api_Key = modelInfo.api_Key;
            req.mailService.api_Secret = modelInfo.api_Secret;
            req.mailService.api_User = modelInfo.api_User;
            req.mailService.domain = modelInfo.domain;
            req.mailService.rateLimit = rateLimit;
            req.mailService.updatedBy = req.decoded.user.username;
            req.mailService.updatedOn = new Date();

            dataProviderHelper.save(req.mailService)
                .then(function(){
                    res.status(HTTPStatus.OK);
                    res.json({
                        message: messageConfig.emailService.updateMessage
                    });
                })
                .catch(function(err){
                    return next(err);
                });
        }
    };

    return{
        getMailServiceConfig : _p.getMailServiceConfig,
        getMailServiceConfigByID : _p.getMailServiceConfigByID,
        postMailServiceConfig : _p.postMailServiceConfig,
        updateMailService : _p.updateMailService

    };

})();

module.exports = mailServiceController;