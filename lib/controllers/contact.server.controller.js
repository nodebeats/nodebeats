var contactInfoController = (function () {

    'use strict';

    var Contact = require('../models/contact.server.model'),
        HTTPStatus = require('http-status'),
        messageConfig = require('../configs/api.message.config'),
        dataProviderHelper = require('../data/mongo.provider.helper'),
        emailTemplateConfigs = require('../configs/email.template.config'),
        mailHelper = require('../helpers/mail.helper'),
        emailTemplateController = require('./email.template.server.controller'),
        utilityHelper = require('../helpers/utilities.helper'),
        Promise = require("bluebird"),
        join = Promise.join;

    var documentFields='_id fullName email contactNumber organizationName informationSource message addedOn';

    function ContactModule(){}

    ContactModule.CreateContact = function(contactObj){
        var contactInfo = new Contact();
        contactInfo.fullName = contactObj.fullName;
        contactInfo.email = contactObj.email;
        contactInfo.contactNumber = contactObj.contactNumber;
        contactInfo.organizationName = contactObj.organizationName;
        contactInfo.informationSource = (contactObj.informationSource === "" ? "none" : contactObj.informationSource);
        contactInfo.message = contactObj.message;
        contactInfo.addedOn = new Date();
        return contactInfo;
    };

    var _p = ContactModule.prototype;

    _p.checkValidationErrors = function(req){
        req.checkBody('fullName', messageConfig.contact.validationErrMessage.fullName).notEmpty();
        req.checkBody('email', messageConfig.contact.validationErrMessage.email).notEmpty();
        req.checkBody('email', messageConfig.contact.validationErrMessage.emailValid).isEmail();
        req.checkBody('message', messageConfig.contact.validationErrMessage.message).notEmpty();

        return req.validationErrors();
    };

    _p.getContactInfo = function(req, next){
        var pagerOpts = utilityHelper.getPaginationOpts(req, next);

        var query={};
        // matches anything that  starts with the inputted person's fullName, case insensitive
        if (req.query.fullName) {
            query.fullName = { $regex: new RegExp('.*'+ req.query.fullName, "i") };
        }
        query.deleted=false;

        var sortOpts = { addedOn: -1 };

        return dataProviderHelper.getAllWithDocumentFieldsPagination(Contact, query, pagerOpts, documentFields, sortOpts);
    };

    _p.getContactInfoByID = function(req){
        return dataProviderHelper.findById(Contact, req.params.contactId, documentFields);
    };

    _p.patchContactInfo = function(req, res, next){
        req.contactInfo.deleted = true;
        req.contactInfo.deletedOn = new Date();
        req.contactInfo.deletedBy = req.decoded.user.username;

        dataProviderHelper.save(req.contactInfo)
            .then(function () {
                res.status(HTTPStatus.OK);
                res.json({
                    message: messageConfig.contact.deleteMessage
                });
            })
            .catch(function (err) {
                return next(err);
            });
    };

    _p.postContactInfo = function(req, res, next){
        var errors = _p.checkValidationErrors(req);
        if (errors) {
            res.status(HTTPStatus.BAD_REQUEST);
            res.json({
                message: errors
            });
        }else {
            var modelInfo = utilityHelper.sanitizeUserInput(req, next);
            var contactInfo = ContactModule.CreateContact(modelInfo);

            dataProviderHelper.save(contactInfo)
                .then(function(){
                    res.status(HTTPStatus.OK);
                    res.json({
                        message: messageConfig.contact.saveMessage
                    });
                    return join(
                        _p.sendEmailToUser(req, contactInfo.email, next),
                        _p.sendEmailToSiteAdmin(req, contactInfo, next),
                        function () {
                            console.log('email sent');
                        }
                    );
                })
                .then(function () {
                    console.log('saved successfully....');
                })
                .catch(function(err){
                    return next(err);
                });
        }
    };

    _p.sendEmailToSiteAdmin = function(req, userInfo, next){
        req.params.templateId = emailTemplateConfigs.emailResponseToSiteAdmin;
        return new Promise(function(resolve, reject) {
            emailTemplateController.getEmailTemplateDataByID(req)
                .then(function(emailTemplate){
                    var messageBody = '';
                    if(emailTemplate){
                        if(emailTemplate.templateBody){
                            messageBody = emailTemplate.templateBody;
                            if(messageBody.indexOf("{{ interestedPeople.name }}") > -1) {
                                messageBody = messageBody.replace('{{ interestedPeople.name }}', userInfo.fullName);
                            }
                            if(messageBody.indexOf("{{ interestedPeople.email }}") > -1) {
                                messageBody = messageBody.replace('{{ interestedPeople.email }}', userInfo.email);
                            }
                            if(messageBody.indexOf("{{ interestedPeople.message }}") > -1) {
                                messageBody = messageBody.replace('{{ interestedPeople.message }}', userInfo.message);
                            }
                        }

                        var mailOptions = {
                            fromEmail: userInfo.email, // sender address
                            toEmail: emailTemplate.emailFrom, // list of receivers
                            subject: emailTemplate.emailSubject, // Subject line
                            textMessage: messageBody, // plaintext body
                            htmlTemplateMessage: messageBody
                        };

                        return mailHelper.sendEmailWithNoAttachment(req, mailOptions, next);
                    }else{
                        return;
                    }
                })
                .then(function (data) {
                    resolve(data);
                })
                .catch(function(err){
                    reject(err);
                });
        });
    };

    _p.sendEmailToUser = function(req, userEmail, next){
        req.params.templateId = emailTemplateConfigs.emailResponseToInterestedParties;

        return new Promise(function(resolve, reject) {
            emailTemplateController.getEmailTemplateDataByID(req)
                .then(function(emailTemplate){
                    var messageBody = '';
                    if(emailTemplate){
                        messageBody =  emailTemplate.templateBody;
                        var mailOptions = {
                            fromEmail: emailTemplate.emailFrom, // sender address
                            toEmail: userEmail, // list of receivers
                            subject: emailTemplate.emailSubject, // Subject line
                            textMessage: messageBody, // plaintext body
                            htmlTemplateMessage: messageBody
                        };
                        return mailHelper.sendEmailWithNoAttachment(req, mailOptions, next);
                    }else{
                        return;
                    }
                })
                .then(function (data) {
                    resolve(data);
                })
                .catch(function(err){
                    reject(err);
                });
        });
    };

    return{
        getContactInfo : _p.getContactInfo,
        getContactInfoByID : _p.getContactInfoByID,
        patchContactInfo : _p.patchContactInfo,
        postContactInfo : _p.postContactInfo
    };

})();

module.exports = contactInfoController;