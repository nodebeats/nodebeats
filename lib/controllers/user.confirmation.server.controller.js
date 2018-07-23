var userConfirmationTokenController = (function () {

    'use strict';

    var dataProviderHelper = require('../data/mongo.provider.helper'),
        HTTPStatus = require('http-status'),
        messageConfig = require('../configs/api.message.config'),
        emailTemplateController = require('./email.template.server.controller'),
        hasher = require('../auth/hasher'),
        User = require('../models/user.server.model'),
        mailHelper = require('../helpers/mail.helper'),
        utilityHelper = require('../helpers/utilities.helper'),
        emailTemplateConfigs = require('../configs/email.template.config'),
        UserRegistrationConfirmToken = require('../models/user.confirm.registration.server.model'),
        errorHelper = require('../helpers/error.helper'),
        Promise = require("bluebird");

    var confirmTokenExpiryDate = 7;
    var documentFields = '_id userID token addedOn expires confirmed';

    function UserConfirmModule () {}

    UserConfirmModule.CreateUserConfirmationToken = function (userID, expiryDate, token) {
        var newUserConfirmationTokenInfo = new UserRegistrationConfirmToken();
        newUserConfirmationTokenInfo.userID = userID;
        newUserConfirmationTokenInfo.token = token;
        newUserConfirmationTokenInfo.expires = expiryDate;
        newUserConfirmationTokenInfo.addedOn = new Date();
        return newUserConfirmationTokenInfo;
    };

    var _p = UserConfirmModule.prototype;

    _p.checkTokenExpiryStatus = function (req) {
        var query = {};

        return new Promise(function (resolve, reject) {
            //check to see if confirmation token is in the url or not
            if(req.params.userConfirmationToken){
                query.token = req.params.userConfirmationToken;

                //check to see if the confirmation token exists in the collection
                dataProviderHelper.findOne(UserRegistrationConfirmToken, query, documentFields)
                    .then(function (tokenInfo) {
                        if(tokenInfo){
                            //check to see if the confirmation token provided is already confirmed,
                            // if not then do further processing
                            if(!tokenInfo.confirmed){

                                //check to see if the confirmation token is already expired or not.
                                // Expiration time is 7 days from the creation of token
                                var tokenExpiryDate = new Date(tokenInfo.expires);
                                var currentDate = new Date();
                                var userID = '';
                                if(tokenInfo.userID){
                                    userID = tokenInfo.userID;
                                }
                                //if the token expiry date is less or equal than current date, then token is expired
                                //if token is not expired, then find the user associated with the token
                                if(tokenExpiryDate <= currentDate){

                                    //userID is needed here to send email later for obtaining user information
                                    resolve({
                                        expired:true,
                                        userID : userID
                                    });
                                }else{
                                    return dataProviderHelper.findById(User, userID);
                                }
                            } else{
                                resolve({
                                    confirmed : true
                                });
                            }
                        }else{
                            resolve(null);
                        }
                    })
                    .then(function (user) {
                        //check to see if the user exists with the provided confirmation token
                        //if exists do further processing
                        if(user){

                            //check to see if the user associated with the token is already confirmed or not
                            //if not, then remove the previous tokens associated with the user from the collection and do further processing
                            if(!user.userConfirmed){
                                return [ user.email, user._id, _p.removeConfirmationTokens(user._id) ];
                            }else{
                                resolve({
                                    confirmed:true
                                });
                            }
                        }else{
                            resolve(null);
                        }
                    })
                    .spread(function (userEmail, userID) {
                        resolve({
                            userID: userID,
                            userEmail : userEmail
                        });
                    })
                    .catch(function (err) {
                        reject(err);
                    });
            }else{
                resolve(null);
            }
        });
    };

    _p.confirmUserRegistration = function (req, res, next) {
        var userID = '';

        return _p.checkTokenExpiryStatus(req)
            .then(function (tokenInfo) {
                //if we get token info object, then do further processing, else respond with confirmation token not found message
                if(tokenInfo && tokenInfo.userID){
                    var returnObj = {};
                    userID = tokenInfo.userID;

                    //if the confirmation token is not expired and is not already confirmed, then update the User Registration Confirmation Token collection
                    if(!tokenInfo.expired && !tokenInfo.confirmed){

                        returnObj = {
                            expired : false
                        };
                        return [ returnObj, _p.updateUserRegistrationConfirmation(User, userID) ];
                    }
                    else if(tokenInfo.confirmed){
                        throw new Promise.CancellationError('{ "statusCode":"' + HTTPStatus.CONFLICT + '", "message": "' + messageConfig.userConfirm.alreadyExists + '"}');
                    }
                    else if(tokenInfo.expired){
                        returnObj = {
                            expired : true
                        };

                        // if token is expired then, return the json object having expired property to true and then resend the confirmation email
                        return [returnObj, dataProviderHelper.findById(User, userID)];

                    }
                }else{
                    throw new Promise.CancellationError('{ "statusCode":"' + HTTPStatus.NOT_FOUND + '", "message": "' + messageConfig.userConfirm.notFound + '"}');
                }
            })
            .spread(function (returnVal, dataObj) {
                var tokenConfirmed = false;
                if(utilityHelper.isObject(returnVal) && returnVal.expired){
                    var userObj = dataObj;
                    if(userObj) {
                        var userEmail = userObj.email;
                        //it the token is already expired, then resend the new confirmation email to the user
                        return [tokenConfirmed, _p.sendEmailToUser(req, userEmail, userID, next)];
                    }else{
                        return[null, ""];
                    }
                }else{
                    tokenConfirmed = true;
                    return [tokenConfirmed, _p.updateRegistrationConfirmationToken(UserRegistrationConfirmToken, userID)];
                }
            })
            .spread(function (tokenConfirmed) {
                if(tokenConfirmed){
                    return Promise.resolve(HTTPStatus.OK);
                }else{
                    return Promise.resolve(HTTPStatus.GONE);
                }
            })
            .catch(Promise.CancellationError, function (cancellationErr) {
                var errorMessage = errorHelper.outputJSONErrorMessage(cancellationErr, next);
                if (errorMessage.statusCode==='404') {
                    return Promise.resolve(HTTPStatus.NOT_FOUND);
                }
                else {
                    return Promise.resolve(HTTPStatus.OK);
                }
            })
            .catch(function (err) {
                return next(err);
            });
    };

    _p.postUserConfirmationTokenData = function (token, userID) {
        var currentDate = new Date();
        var expiryDate = new Date(currentDate.getTime() + (1000 * 60 * 60 * 24 * confirmTokenExpiryDate));
        var newUserConfirmationTokens = UserConfirmModule.CreateUserConfirmationToken(userID, expiryDate, token);
        return dataProviderHelper.save(newUserConfirmationTokens);
    };

    _p.removeConfirmationTokens = function (_userID) {
        var query = {
            userID: _userID
        };
        return dataProviderHelper.removeModelData(UserRegistrationConfirmToken, query);
    };

    _p.sendEmailToUser = function (req, userEmail, userID, next) {
        return new Promise(function (resolve, reject) {
            hasher.generateRandomBytes(36)
                .then(function (tokenBytes) {
                    return [tokenBytes, _p.postUserConfirmationTokenData(tokenBytes, userID)];
                })
                .spread(function (tokenBytes) {
                    req.params.templateId = emailTemplateConfigs.userConfirmRegistration;
                    return [tokenBytes, emailTemplateController.getEmailTemplateDataByID(req)];
                })
                .spread(function (tokenBytes, emailTemplate) {
                    var url = utilityHelper.getApplicationDeploymentPortNumberForEmail(req) + '/verify/' + tokenBytes;
                    var messageBody = '';

                    if (emailTemplate && emailTemplate.templateBody) {
                        messageBody = emailTemplate.templateBody;
                        if (messageBody.indexOf("{{ userRegistrationConfirm.message }}") > -1) {
                            messageBody = messageBody.replace('{{ userRegistrationConfirm.message }}', '<a href=\'' + url + '\'>' + url + '</a>');

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
                .then(function () {
                    resolve();
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

    _p.updateRegistrationConfirmationToken = function (UserRegistrationConfirmToken, _userID) {
        var queryOpts = {
            userID: _userID
        };
        var updateOpts = {
            confirmed: true
        };
        var multiOpts = false;
        return dataProviderHelper.updateModelData(UserRegistrationConfirmToken, queryOpts, updateOpts, multiOpts);
    };

    _p.updateUserRegistrationConfirmation = function (User, _userID) {
        var queryOpts = {
            _id: _userID
        };
        var updateOpts = {
            userConfirmed: true,
            active: true
        };
        var multiOpts = false;
        return dataProviderHelper.updateModelData(User, queryOpts, updateOpts, multiOpts);
    };

    return {
        confirmUserRegistration: _p.confirmUserRegistration,
        sendEmailToUser: _p.sendEmailToUser
    };

})();

module.exports = userConfirmationTokenController;