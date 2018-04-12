var passwordChangeVerifyTokenController  = (function () {

    'use strict';

    var dataProviderHelper = require('../data/mongo.provider.helper'),
        HTTPStatus = require('http-status'),
        messageConfig = require('../configs/api.message.config'),
        emailTemplateController = require('./email.template.server.controller'),
        hasher = require('../auth/hasher'),
        mailHelper = require('../helpers/mail.helper'),
        emailTemplateConfigs = require('../configs/email.template.config'),
        PasswordChangeVerifyToken = require('../models/password.change.verify.server.model'),
        errorHelper = require('../helpers/error.helper'),
        User = require('../models/user.server.model'),
        utilityHelper = require('../helpers/utilities.helper'),
        Promise = require("bluebird");

    var confirmTokenExpiryDate = 7;
    var documentFields = '_id userID token validUpto expired addedOn';

    function PasswordChangeModule(){}

    PasswordChangeModule.CreatePasswordChangeVerifyToken = function(userID, expiryDate, token){
        var newPasswordChangeVerifyTokenInfo = new PasswordChangeVerifyToken();
        newPasswordChangeVerifyTokenInfo.userID = userID;
        newPasswordChangeVerifyTokenInfo.token = token;
        newPasswordChangeVerifyTokenInfo.validUpto = expiryDate;
        newPasswordChangeVerifyTokenInfo.addedOn = new Date();
        return newPasswordChangeVerifyTokenInfo;
    };

    var _p = PasswordChangeModule.prototype;

    _p.checkTokenExpiryStatus = function(req){
        var query = {};

        return new Promise(function(resolve, reject) {
            //check to see if password change confirmation token is in the url or not
            if(req.params.passwordChangeToken){
                query.token = req.params.passwordChangeToken;

                //check to see if the password change confirmation token exists in the collection
                dataProviderHelper.findOne(PasswordChangeVerifyToken, query, documentFields)
                    .then(function(tokenInfo){
                        if(tokenInfo){
                            //check to see if the password change verify token provided is already used or not,
                            //token can be used only once to change password and if used once , then token is expired
                            // if not then do further processing
                            if(!tokenInfo.expired){

                                //check to see if the password change verify token is already expired or not in terms of expiry date.
                                // Expiration time is 7 days from the creation of token
                                var tokenExpiryDate = new Date(tokenInfo.validUpto);
                                var currentDate = new Date();

                                //if the token expiry date is less or equal than current date, then token is expired
                                if(tokenExpiryDate <= currentDate){
                                    resolve({
                                        expired:true,
                                        userID : tokenInfo.userID
                                    });
                                }else{
                                    resolve({
                                        expired:false,
                                        token : tokenInfo.token,
                                        userID : tokenInfo.userID
                                    });
                                }
                            } else{
                                resolve({
                                    expired : true,
                                    userID : tokenInfo.userID
                                });
                            }
                        }else{
                            resolve(null);
                        }
                    })
                    .catch(function (err) {
                        reject(err);
                    });
            }else{
                resolve(null);
            }
        });
    };

    _p.verifyPasswordChangeToken = function(req, res, next){
        return _p.checkTokenExpiryStatus(req, next)
            .then(function(tokenInfo){
                if(tokenInfo){
                    var returnObj = {};

                    if(!tokenInfo.expired){
                        returnObj = {
                            expired : false,
                            userId: tokenInfo.userID
                        };

                        return  [returnObj, null];
                    }
                    else{
                        returnObj = {
                            expired : true
                        };
                        return  [returnObj, dataProviderHelper.findById(User, tokenInfo.userID)];
                    }
                }else{
                    throw new Promise.CancellationError('{ "statusCode":"' + HTTPStatus.NOT_FOUND + '", "message": "' + messageConfig.passwordChangeVerify.notFound + '"}');
                }
            })
            .spread(function (returnVal, dataObj) {
                if(returnVal.expired) {
                    _p.sendEmailToConfirmPasswordChangeAction(req, dataObj.email, dataObj._id, next);
                    throw new Promise.CancellationError('{ "statusCode":"' + HTTPStatus.GONE + '", "message": "' + messageConfig.passwordChangeVerify.expired + '"}');
                }else{
                    return Promise.resolve({
                        data : returnVal.userId,
                        status: HTTPStatus.OK
                    });
                }

            })
            .catch(Promise.CancellationError, function (cancellationErr) {
                var errorMessage = errorHelper.outputJSONErrorMessage(cancellationErr, next);
                if(errorMessage.statusCode==='404'){
                    return Promise.resolve({
                        data : null,
                        status: HTTPStatus.NOT_FOUND
                    });
                }else{
                    return Promise.resolve({
                        data : null,
                        status: HTTPStatus.GONE
                    });
                }
            })
            .catch(function (err) {
                return next(err);
            });
    };

    _p.postPasswordChangeVerifyTokenData = function(token, userID){
        var currentDate = new Date();
        var expiryDate = new Date(currentDate.getTime() + (1000 * 60 * 60 * 24 * confirmTokenExpiryDate));
        var newPasswordChangeVerifyToken = PasswordChangeModule.CreatePasswordChangeVerifyToken(userID, expiryDate, token);
        return dataProviderHelper.save(newPasswordChangeVerifyToken);
    };

    _p.sendEmailToConfirmPasswordChangeAction = function(req, userEmail, userID, next){
        return new Promise(function(resolve, reject) {
            hasher.generateRandomBytes(36)
                .then(function (tokenBytes) {
                    return [tokenBytes, _p.postPasswordChangeVerifyTokenData(tokenBytes, userID)];
                })
                .spread(function (tokenBytes) {
                    req.params.templateId = emailTemplateConfigs.passwordChangeConfirmation;
                    return [tokenBytes, emailTemplateController.getEmailTemplateDataByID(req)];
                })
                .spread(function (tokenBytes, emailTemplate) {
                    var url = utilityHelper.getApplicationDeploymentPortNumberForEmail(req) + '/change-password/' + tokenBytes;
                    var messageBody = '';
                    if (emailTemplate && emailTemplate.templateBody) {

                        messageBody = emailTemplate.templateBody;
                        if (messageBody.indexOf("{{ passwordChange.message }}") > -1) {
                            messageBody = messageBody.replace('{{ passwordChange.message }}', '<a href=\'' + url + '\'>' + url + '</a>');

                        }

                        var mailOptions = {
                            fromEmail: emailTemplate.emailFrom, // sender address
                            toEmail: userEmail, // list of receivers
                            subject: emailTemplate.emailSubject, // Subject line
                            textMessage: messageBody, // plaintext body
                            htmlTemplateMessage: messageBody
                        };
                        return mailHelper.sendEmailWithNoAttachment(req, mailOptions, next);
                    }else {
                        throw new Promise.CancellationError('{ "statusCode":"' + HTTPStatus.NOT_FOUND + '", "message": "' + messageConfig.emailTemplate.notFound + '"}');
                    }
                })
                .then(function (data) {
                    resolve(data);
                })
                .catch(Promise.CancellationError, function (cancellationErr) {
                    // reject(cancellationErr);
                    resolve(cancellationErr);
                })
                .catch(function (err) {
                    reject(err);
                });
        });

    };

    _p.updateRegistrationConfirmationToken = function(_token, _userID){
        var queryOpts = {
            userID: _userID,
            token : _token
        };
        var updateOpts = {
            expired: true
        };
        var multiOpts = false;
        return dataProviderHelper.updateModelData(PasswordChangeVerifyToken, queryOpts, updateOpts, multiOpts);
    };

    _p.getPasswordChangeVerifyTokenDetailInfo = function(_token){
        var query = {};
        query.token = _token;
        query.validUpto = {
            "$gte": new Date()
        };
        return dataProviderHelper.findOne(PasswordChangeVerifyToken, query, documentFields);
    }

    return {
        verifyPasswordChangeToken: _p.verifyPasswordChangeToken,
        sendEmailToConfirmPasswordChangeAction: _p.sendEmailToConfirmPasswordChangeAction,
        updateRegistrationConfirmationToken: _p.updateRegistrationConfirmationToken,
        getPasswordChangeVerifyTokenDetailInfo : _p.getPasswordChangeVerifyTokenDetailInfo
    };

})();

module.exports = passwordChangeVerifyTokenController;