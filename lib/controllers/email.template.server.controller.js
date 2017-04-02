var emailTemplateController = (function () {

    'use strict';

    var dataProviderHelper = require('../data/mongo.provider.helper'),
        HTTPStatus = require('http-status'),
        messageConfig = require('../configs/api.message.config'),
        EmailTemplate = require('../models/email.template.server.model'),
        utilityHelper = require('../helpers/utilities.helper'),
        errorHelper = require('../helpers/error.helper'),
        Promise = require("bluebird");

    var documentFields='_id templateName emailSubject emailFrom templateBody attachmentAvailabilityStatus active addedOn';

    function EmailTemplateModule(){}

    EmailTemplateModule.createEmailTemplate = function(emailTemplateObj, templateBody, loggedInUser){
        var emailTemplateInfo = new EmailTemplate();
        emailTemplateInfo.templateName = emailTemplateObj.templateName;
        emailTemplateInfo.emailSubject = emailTemplateObj.emailSubject;
        emailTemplateInfo.emailFrom = emailTemplateObj.emailFrom;
        emailTemplateInfo.templateBody = templateBody;
        emailTemplateInfo.attachmentAvailabilityStatus = emailTemplateObj.attachmentAvailabilityStatus;
        emailTemplateInfo.active = emailTemplateObj.active;
        emailTemplateInfo.addedBy = loggedInUser;
        emailTemplateInfo.addedOn = new Date();
        return emailTemplateInfo;
    };

    var _p = EmailTemplateModule.prototype;


    _p.checkValidationErrors = function(req){
        req.checkBody('templateName', messageConfig.emailTemplate.validationErrMessage.templateName).notEmpty();
        req.checkBody('emailSubject', messageConfig.emailTemplate.validationErrMessage.emailSubject).notEmpty();
        req.checkBody('emailFrom', messageConfig.emailTemplate.validationErrMessage.emailFrom).notEmpty();
        req.checkBody('emailFrom', messageConfig.emailTemplate.validationErrMessage.emailFromValid).isEmail();
        req.checkBody('templateBody', messageConfig.emailTemplate.validationErrMessage.templateBody).notEmpty();
        return req.validationErrors();
    };

    _p.getEmailTemplate = function(req, next){
        var pagerOpts = utilityHelper.getPaginationOpts(req, next);

        var query = {};
        query.deleted = false;
        var sortOpts = {
            addedOn: -1
        };
        return  dataProviderHelper.getAllWithDocumentFieldsPagination(EmailTemplate, query, pagerOpts, documentFields, sortOpts);
    };

    _p.getEmailTemplateByTemplateName = function(req){
        var query = {};
        query.templateName = req.body.templateName;
        query.deleted = false;
        return dataProviderHelper.findOne(EmailTemplate, query, documentFields);
    };

    _p.getEmailTemplateDataByID = function(req){
        return dataProviderHelper.findById(EmailTemplate, req.params.templateId, documentFields);
    };

    _p.patchEmailTemplateData = function(req, res, next){
        req.emailTemplateInfo.deleted = true;
        req.emailTemplateInfo.deletedOn = new Date();
        req.emailTemplateInfo.deletedBy = req.decoded.user.username;
        dataProviderHelper.save(req.emailTemplateInfo)
            .then(function(){
                res.status(HTTPStatus.OK);
                res.json({
                    message: messageConfig.emailTemplate.deleteMessage
                });
            })
            .catch(function(err){
                return next(err);
            });
    };

    _p.postEmailTemplate = function(req, res, next){
        var errors = _p.checkValidationErrors(req);
        //Check for validation errors
        if (errors) {
            res.status(HTTPStatus.BAD_REQUEST);
            res.json({
                message: errors
            });
        }else {
            var modelInfo = utilityHelper.sanitizeUserInput(req, next);
            var query = {};
            //matches anything that exactly matches the email template name, case  insensitive
            query.templateName = { $regex: new RegExp('^'+ modelInfo.templateName + '$', "i") };
            query.deleted = false;

            dataProviderHelper.checkForDuplicateEntry(EmailTemplate, query)
                .then(function(count){
                    if(count > 0){
                        throw new Promise.CancellationError('{ "statusCode":"' + HTTPStatus.CONFLICT + '", "message": "' + messageConfig.emailTemplate.alreadyExists + '"}');
                    }else{
                        var contentInfo = {};
                        contentInfo.templateBody = req.body.templateBody;
                        var modelHtmlInfo = utilityHelper.sanitizeUserHtmlBodyInput(contentInfo, next);

                        var emailTemplateInfo = EmailTemplateModule.createEmailTemplate(modelInfo, modelHtmlInfo.templateBody, req.decoded.user.username);
                        return dataProviderHelper.save(emailTemplateInfo);
                    }
                })
                .then(function(){
                    res.status(HTTPStatus.OK);
                    res.json({
                        message: messageConfig.emailTemplate.saveMessage
                    });
                })
                .catch(Promise.CancellationError, function (cancellationErr) {
                    errorHelper.customErrorResponse(res, cancellationErr, next);
                })
                .catch(function(err){
                    return next(err);
                });
        }
    };

    _p.updateEmailTemplateData = function(req, res, next){
        var errors = _p.checkValidationErrors(req);
        if (errors) {
            res.status(HTTPStatus.BAD_REQUEST);
            res.json({
                message: errors
            });
        }else {
            var modelInfo = utilityHelper.sanitizeUserInput(req, next);
            //Check if the email template title is same or not, if changed than the previously saved value, then check for title duplicacy
            if(req.emailTemplateInfo.templateName.toLowerCase() !== modelInfo.templateName.toLowerCase()) {
                var query = {};
                //matches anything that exactly matches the email template name, case  insensitive
                query.templateName = { $regex: new RegExp('^'+ modelInfo.templateName+ '$', "i") };
                query.deleted = false;
                dataProviderHelper.checkForDuplicateEntry(EmailTemplate, query)
                    .then(function(count){
                        if (count > 0) {
                            throw new Promise.CancellationError('{ "statusCode":"' + HTTPStatus.CONFLICT + '", "message": "' + messageConfig.emailTemplate.alreadyExists + '"}');
                        } else {
                            return _p.updateFunc(req, res, modelInfo, next);
                        }
                    })
                    .then(function () {
                        res.status(HTTPStatus.OK);
                        res.json({
                            message: messageConfig.emailTemplate.updateMessage
                        });
                    })
                    .catch(Promise.CancellationError, function (cancellationErr) {
                        errorHelper.customErrorResponse(res, cancellationErr, next);
                    })
                    .catch(function(err){
                        return next(err);
                    });
            }else{
                _p.updateFunc(req, res, modelInfo, next)
                    .then(function(){
                        res.status(HTTPStatus.OK);
                        res.json({
                            message: messageConfig.emailTemplate.updateMessage
                        });
                    })
                    .catch(function(err){
                        return next(err);
                    });
            }
        }
    };

    _p.updateFunc = function(req, res, modelInfo, next){
        var contentInfo = {};
        contentInfo.templateBody = req.body.templateBody;
        var modelHtmlInfo = utilityHelper.sanitizeUserHtmlBodyInput(contentInfo, next);

        req.emailTemplateInfo.templateName = modelInfo.templateName;
        req.emailTemplateInfo.emailSubject = modelInfo.emailSubject;
        req.emailTemplateInfo.emailFrom = modelInfo.emailFrom;
        req.emailTemplateInfo.templateBody = modelHtmlInfo.templateBody;
        req.emailTemplateInfo.attachmentAvailabilityStatus = modelInfo.attachmentAvailabilityStatus;
        req.emailTemplateInfo.active = modelInfo.active;
        req.emailTemplateInfo.updatedBy = req.decoded.user.username;
        req.emailTemplateInfo.updatedOn = new Date();
        return dataProviderHelper.save(req.emailTemplateInfo);
    };

    return{
        getEmailTemplate: _p.getEmailTemplate,
        getEmailTemplateByTemplateName: _p.getEmailTemplateByTemplateName,
        getEmailTemplateDataByID: _p.getEmailTemplateDataByID,
        patchEmailTemplateData: _p.patchEmailTemplateData,
        postEmailTemplate: _p.postEmailTemplate,
        updateEmailTemplateData: _p.updateEmailTemplateData
    };

})();

module.exports = emailTemplateController;