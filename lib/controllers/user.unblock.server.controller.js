var userUnblockTokenController = (function () {

    'use strict';

    var dataProviderHelper = require('../data/mongo.provider.helper'),
        HTTPStatus = require('http-status'),
        messageConfig = require('../configs/api.message.config'),
        emailTemplateController = require('./email.template.server.controller'),
        User = require('../models/user.server.model'),
        hasher = require('../auth/hasher'),
        loggedInController = require('./login.attempt.server.controller'),
        emailTemplateConfigs = require('../configs/email.template.config'),
        mailHelper = require('../helpers/mail.helper'),
        utilityHelper = require('../helpers/utilities.helper'),
        UserUnBlockTokens = require('../models/user.unblock.server.model'),
        errorHelper = require('../helpers/error.helper'),
        Promise = require("bluebird");

    var documentFields = '_id userID token addedOn expires unblocked';

    var unblockTokenExpiryDate = 7;

    function UserUnblockModule () {}

    UserUnblockModule.CreateUserUnblockToken = function (userID, expiryDate, token) {
        var newUserUnBlockTokens = new UserUnBlockTokens();
        newUserUnBlockTokens.userID = userID;
        newUserUnBlockTokens.token = token;
        newUserUnBlockTokens.expires = expiryDate;
        newUserUnBlockTokens.addedOn = new Date();
        return newUserUnBlockTokens;
    };

    var _p = UserUnblockModule.prototype;

    _p.checkUnBlockTokenExpiryStatus = function (req) {
        var query = {};

        return new Promise(function (resolve, reject) {
            //check to see if unblock token is in the url or not
            if (req.params.userUnBlockToken) {
                query.token = req.params.userUnBlockToken;
                query.unblocked = false;

                //check to see if the unblock token exists in the collection with specified query parameters
                dataProviderHelper.findOne(UserUnBlockTokens, query, documentFields)
                    .then(function (tokenInfo) {
                        if (tokenInfo) {
                            //check to see if the unblock token provided is already unblocked,
                            // if not then do further processing

                            if (!tokenInfo.unblocked) {

                                //check to see if the unblock token is already expired or not.
                                // Expiration time is 7 days from the creation of token

                                var tokenExpiryDate = new Date(tokenInfo.expires);
                                var currentDate = new Date();
                                var userID = '';
                                if (tokenInfo.userID) {
                                    userID = tokenInfo.userID;
                                }
                                //if the token expiry date is less or equal than current date, then token is expired
                                //if token is not expired, then find the user associated with the token
                                if (tokenExpiryDate <= currentDate) {
                                    //userID is needed here to send email later for obtaining user information
                                    resolve({
                                        expired:true,
                                        userID : userID
                                    });

                                } else {

                                    return dataProviderHelper.findById(User, userID);
                                }
                            } else {
                                resolve({
                                    unBlocked: true
                                });
                            }
                        } else {
                            resolve(null);
                        }
                    })
                    .then(function (user) {
                        //check to see if the user exists with the provided unblocked token
                        //if exists do further processing
                        if (user) {
                            //if user is blocked and everything is right,
                            // then remove the old tokens associated to the user from the UserUnblockToken collection
                            if (user.blocked) {
                                return [ user.email, user._id, _p.removeUnBlockTokens(user._id) ];
                            } else {
                                resolve({
                                    unBlocked: true
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
            } else {
                resolve(null);
            }
        });
    };

    _p.unBlockUserAccount = function (req, res, next) {
        var userID = '';

        return _p.checkUnBlockTokenExpiryStatus(req)
            .then(function (tokenInfo) {
                //if we get token info object, then do further processing, else respond with unblock token not found message
                if(tokenInfo && tokenInfo.userID){
                    var returnObj = {};
                    userID = tokenInfo.userID;

                    //if the token is not expired and is not already unblocked, then update the User block status
                    if(!tokenInfo.expired && !tokenInfo.unBlocked){
                        returnObj = {
                            expired : false
                        };

                        return [ returnObj, _p.updateUserBlockStatus(User, userID) ];
                    }
                    else if(tokenInfo.unBlocked){
                        throw new Promise.CancellationError('{ "statusCode":"' + HTTPStatus.CONFLICT + '", "message": "' + messageConfig.userUnBlock.alreadyExists + '"}');
                    }
                    else if(tokenInfo.expired){
                        returnObj = {
                            expired : true
                        };

                        // if token is expired then, return the json object having expired property to true and then resend the unblock email
                        return [ returnObj, dataProviderHelper.findById(User, userID)];
                    }
                }else{
                    throw new Promise.CancellationError('{ "statusCode":"' + HTTPStatus.NOT_FOUND + '", "message": "' + messageConfig.userUnBlock.notFound + '"}');
                }
            })
            .spread(function (returnVal, dataObj) {

                var tokenUnblocked = false;
                if(utilityHelper.isObject(returnVal) && returnVal.expired){
                    var userObj = dataObj;
                    if(userObj) {
                        var userEmail = userObj.email;
                        //it the token is already expired, then resend the new unblock email to the user
                        return [tokenUnblocked, _p.sendEmailToUser(req,userEmail, userID, next)];

                    }else{
                        return [null, ""];
                    }
                }else{
                    tokenUnblocked = true;
                    return [tokenUnblocked, loggedInController.updateLoggedInInfo(req, req.res, userID)];
                }
            })
            .spread(function (tokenUnblocked) {
                if(tokenUnblocked){
                    return Promise.resolve(HTTPStatus.OK);
                }else{
                    return Promise.resolve(HTTPStatus.GONE);
                }
            })
            .catch(Promise.CancellationError, function (cancellationErr) {
                var errorMessage = errorHelper.outputJSONErrorMessage(cancellationErr, next);
                if(errorMessage.statusCode==='404'){
                    return Promise.resolve(HTTPStatus.NOT_FOUND);
                }else{
                    return Promise.resolve(HTTPStatus.OK);
                }

            })
            .catch(function (err) {
                return next(err);
            });
    };

    _p.getUserUnBlockTokenStatus = function (userID) {
        var query = {};
        query.userID = userID;

        return dataProviderHelper.findOne(UserUnBlockTokens, query, documentFields);
    };

    _p.postUserUnblockTokenData = function (token, userID) {
        var currentDate = new Date();
        var expiryDate = new Date(currentDate.getTime() + (1000 * 60 * 60 * 24 * unblockTokenExpiryDate));//7 days expiration

        var newUserUnBlockTokens = UserUnblockModule.CreateUserUnblockToken(userID, expiryDate, token);
        return dataProviderHelper.save(newUserUnBlockTokens);
    };

    _p.removeUnBlockTokens = function (_userID) {
        var query = {
            userID: _userID
        };
        return dataProviderHelper.removeModelData(UserUnBlockTokens, query);
    };

    _p.sendEmailToUser = function (req, userEmail, userID, next) {
        return new Promise(function (resolve, reject) {
            hasher.generateRandomBytes(36)
                .then(function (tokenBytes) {
                    return [ tokenBytes, _p.postUserUnblockTokenData(tokenBytes, userID) ];
                })
                .spread(function (tokenBytes) {
                    req.params.templateId = emailTemplateConfigs.userUnBlock;
                    return [ tokenBytes, emailTemplateController.getEmailTemplateDataByID(req)];
                })
                .spread(function (tokenBytes, emailTemplate) {
                    var url = utilityHelper.getApplicationDeploymentPortNumber(req) + '/api/unblock/user/' + tokenBytes;
                    var messageBody = '';

                    if (emailTemplate && emailTemplate.templateBody) {
                        messageBody = emailTemplate.templateBody;
                        if (messageBody.indexOf("{{ userUnBlock.message }}") > -1) {
                            messageBody = messageBody.replace('{{ userUnBlock.message }}', '<a href=\'' + url + '\'>' + url + '</a>');

                        }
                        var mailOptions = {
                            fromEmail: emailTemplate.emailFrom, // sender address
                            toEmail: userEmail, // list of receivers
                            subject: emailTemplate.emailSubject, // Subject line
                            textMessage: messageBody, // plaintext body
                            htmlTemplateMessage: messageBody
                        };
                        return mailHelper.sendEmailWithNoAttachment(req, mailOptions, next);
                    } else {
                        throw new Promise.CancellationError('{ "statusCode":"' + HTTPStatus.NOT_FOUND + '", "message": "' + messageConfig.userUnBlock.notFound + '"}');
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

    _p.updateUserBlockStatus = function (User, _userID) {
        var queryOpts = {
            _id: _userID
        };
        var updateOpts = {
            blocked: false
        };
        return dataProviderHelper.updateModelData(User, queryOpts, updateOpts, false);
    };

    _p.updateUnBlockUserToken = function (UserUnBlockTokens, _userID) {
        var queryOpts = {
            userID: _userID,
            unblocked: false
        };
        var updateOpts = {
            unblocked: true
        };
        return dataProviderHelper.updateModelData(UserUnBlockTokens, queryOpts, updateOpts, false);
    };

    return {
        checkUnBlockTokenExpiryStatus: _p.checkUnBlockTokenExpiryStatus,
        getUserUnBlockTokenStatus: _p.getUserUnBlockTokenStatus,
        sendEmailToUser: _p.sendEmailToUser,
        unBlockUserAccount: _p.unBlockUserAccount
    };

})();

module.exports = userUnblockTokenController;