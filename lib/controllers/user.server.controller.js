var userController = (function () {

    'use strict';

    var dataProviderHelper = require('../data/mongo.provider.helper'),
        HTTPStatus = require('http-status'),
        messageConfig = require('../configs/api.message.config'),
        hasher = require('../auth/hasher'),
        applicationConfig = require('../configs/application.config'),
        User = require('../models/user.server.model'),
        userConfirmationTokenController = require('./user.confirmation.server.controller'),
        passwordChangeVerifyController = require('./password.change.verify.server.controller'),
        PasswordChangeVerifyToken = require('../models/password.change.verify.server.model'),
        emailServiceController = require('./email.service.server.controller'),
        utilityHelper = require('../helpers/utilities.helper'),
        errorHelper = require('../helpers/error.helper'),
        Promise = require("bluebird"),
        fs= Promise.promisifyAll(require('fs'));

    var documentFields = '_id firstName middleName lastName email username phoneNumber mobileNumber active userRole imageName twoFactorAuthEnabled  blocked userConfirmed  addedOn imageProperties securityQuestion';

    function UserModule () {}

    UserModule.CreateUser = function (userObj, loggedInUser, imageInfo, password, saltPassword, securityAnswer, saltSecurityAnswer) {
        var newUserInfo = new User();
        newUserInfo.firstName = userObj.firstName;
        newUserInfo.middleName = userObj.middleName;
        newUserInfo.lastName = userObj.lastName;
        newUserInfo.email = userObj.email;
        newUserInfo.username = userObj.email;
        newUserInfo.password = password;
        newUserInfo.passwordSalt = saltPassword;
        newUserInfo.phoneNumber = userObj.phoneNumber;
        newUserInfo.mobileNumber = userObj.mobileNumber;
        newUserInfo.securityQuestion = userObj.securityQuestion;
        newUserInfo.securityAnswer = securityAnswer;
        newUserInfo.securityAnswerSalt = saltSecurityAnswer;
        newUserInfo.active = userObj.active;
        newUserInfo.userRole = userObj.userRole;
        newUserInfo.imageName = imageInfo._imageName;
        newUserInfo.imageProperties = {
            imageExtension : imageInfo._imageExtension,
            imagePath : imageInfo._imagePath
        };
        newUserInfo.addedBy = loggedInUser;
        newUserInfo.addedOn = new Date();
        newUserInfo.blocked = false;
        return newUserInfo;
    };

    var _p = UserModule.prototype;

    _p.checkValidationErrors = function (req) {
        req.checkBody('firstName', messageConfig.user.validationErrMessage.firstName).notEmpty();
        req.checkBody('lastName', messageConfig.user.validationErrMessage.lastName).notEmpty();
        req.checkBody('email', messageConfig.user.validationErrMessage.email).notEmpty();
        if(req.body.email){
            req.checkBody('email', messageConfig.user.validationErrMessage.emailValid).isEmail();
        }
        req.checkBody('userRole', messageConfig.user.validationErrMessage.userRole).notEmpty();
        return req.validationErrors();
    };

    _p.getUsers = function (req, next) {
        var pagerOpts = utilityHelper.getPaginationOpts(req, next);
        var query = {};
        if (req.query.username) {

        }
        if(req.decoded.user.username !== applicationConfig.user.defaultUsername){
            query.username = req.decoded.user.username;
        }

        if(req.query.role){
            query.userRole = req.query.role;
        }

        query.deleted = false;
        var sortOpts = { addedOn: -1 };
        return dataProviderHelper.getAllWithDocumentFieldsPagination(User, query, pagerOpts, documentFields, sortOpts);
    };

    _p.getUserByID = function (req) {
        documentFields = documentFields + ' twoFactorAuthSharedSecret';
        return dataProviderHelper.findById(User, req.params.userId, documentFields);
    };

    _p.patchUserInformation = function (req, res, next) {
        if (!req.body.deleted) {
            if(req.body.password){
                if(req.body.password.trim().toLowerCase().indexOf(req.user.username) === -1) {
                    _p.changePassword(req, res, next);
                }else{
                    res.status(HTTPStatus.BAD_REQUEST);
                    res.json({
                        message: messageConfig.user.passwordEqUsername
                    });
                }
            }
            else if(req.body.securityQuestion && req.body.securityAnswer){
                _p.chageSecurityAnswer(req, res, next);
            }
            else{
                res.status(HTTPStatus.NOT_MODIFIED);
                res.end();
            }
        } else {
            if (req.user.username !== applicationConfig.user.defaultUsername) {
                req.user.deleted = true;
                req.user.deletedBy = req.decoded.user.username;
                req.user.deletedOn = new Date();
                _p.saveMiddleFunc(req, res, req.user, next, messageConfig.user.deleteMessage);
            } else {
                res.status(HTTPStatus.METHOD_NOT_ALLOWED);
                res.json({
                    message: messageConfig.user.superAdminDeleteMessage
                });
            }
        }
    };

    _p.changePassword = function (req, res, next) {
        //Only superadmin user can change the password of all the other users
        //Other users cannot change the passowrd of superadmin user
        //User can change own passwords only.
        if(req.user.username === applicationConfig.user.defaultUsername && req.decoded.user.username !== applicationConfig.user.defaultUsername){
            res.status(HTTPStatus.FORBIDDEN);
            res.json({
                message: messageConfig.user.notAllowedToChangeSuperAdminPassword
            });
        }else if(req.decoded.user.username !== req.user.username && req.decoded.user.username !== applicationConfig.user.defaultUsername){
            res.status(HTTPStatus.FORBIDDEN);
            res.json({
                message: messageConfig.user.notAllowedToChangeOthersPassword
            });
        }
        else{
            _p.modifyPassword(req, res, next)
                .then(function (resultObj) {
                    if(resultObj.error){
                        res.status(HTTPStatus.BAD_REQUEST);
                        res.json({
                            message: resultObj.message
                        });
                    }else{
                        res.status(HTTPStatus.OK);
                        res.json({
                            message: messageConfig.user.passwordUpdateMessage
                        });
                    }
                })
                .catch(function (err) {
                    return next(err);
                });
        }
    };

    _p.modifyPassword = function (req, res, next) {
        var password = req.body.password.toString();
        return new Promise(function (resolve, reject) {
            _p.checkForCommonPassword(req, password)
                .then(function (weakPassword) {
                    if (weakPassword) {
                        throw new Promise.CancellationError('{ "statusCode":"' + HTTPStatus.BAD_REQUEST + '", "message": "' + messageConfig.user.weakPassword + '"}');

                    } else {
                        return hasher.createSalt();
                    }
                })
                .then(function (salt) {
                    return [salt, hasher.computeHash(req, res, password, salt)];
                })
                .spread(function (salt, hashPasswordData) {
                    req.user.password = hashPasswordData;
                    req.user.passwordSalt = salt;

                    return dataProviderHelper.save(req.user);
                })
                .then(function () {
                    resolve({
                        error : false
                    });
                })
                .catch(Promise.CancellationError, function (cancellationErr) {
                    var errorMessage = errorHelper.outputJSONErrorMessage(cancellationErr, next);
                    resolve({
                        error : true,
                        message: errorMessage.message
                    });
                })
                .catch(function (err) {
                    reject(err);
                });
        });
    };

    _p.implementForgotPasswordAction = function (req, res, next) {
        if(req.params.accessToken){
            var queryOpts = {
                expired: false,
                validUpto : {
                    "$gte": new Date()
                },
                token: req.params.accessToken
            };

            dataProviderHelper.find(PasswordChangeVerifyToken, queryOpts, '')
                .then(function (tokenStatus) {
                    if(tokenStatus && tokenStatus.length > 0){

                        var _userId = tokenStatus[0].userID;
                        req.params.userId = _userId;
                        passwordChangeVerifyController.updateRegistrationConfirmationToken(req.params.accessToken, _userId)
                            .then(function () {
                                _p.getUserByID(req)
                                    .then(function (userObj) {
                                        if(userObj) {
                                            if(req.body.password.trim().toLowerCase().indexOf(userObj.username) === -1) {
                                                req.user = userObj;
                                                return _p.modifyPassword(req, res, next);
                                            }else{
                                                res.status(HTTPStatus.BAD_REQUEST);
                                                res.json({
                                                    message: messageConfig.user.passwordEqUsername
                                                });
                                            }
                                        }else{
                                            res.status(HTTPStatus.FORBIDDEN);
                                            res.json({
                                                message: messageConfig.user.notAllowedToChangePassword
                                            });
                                        }
                                    })
                                    .then(function (returnObj) {
                                        if(returnObj.error){
                                            errorHelper.customErrorResponse(res, returnObj.message, next);
                                        }else{
                                            res.status(HTTPStatus.OK);
                                            res.json({
                                                message: messageConfig.user.passwordUpdateMessage
                                            });
                                        }
                                    })
                                    .catch(function (err) {
                                        return next(err);
                                    });
                            })

                    }else{
                        res.status(HTTPStatus.UNAUTHORIZED);
                        res.json({
                            message: messageConfig.user.notAllowedToChangePassword
                        });
                    }
                })


        }else{
            res.status(HTTPStatus.UNAUTHORIZED);
            res.end();
        }
    };

    _p.chageSecurityAnswer = function (req, res, next) {
        var _securityQuestion = req.body.securityQuestion;
        var _securityAnswer = req.body.securityAnswer;

        hasher.createSalt()
            .then(function (salt) {
                return [salt, hasher.computeHash(req, res, _securityAnswer, salt)];
            })
            .spread(function (salt, hashSecurityAnswerData) {
                req.user.securityQuestion = _securityQuestion;
                req.user.securityAnswer = hashSecurityAnswerData;
                req.user.securityAnswerSalt = salt;

                return dataProviderHelper.save(req.user);
            })
            .then(function () {
                res.status(HTTPStatus.OK);
                res.json({
                    message: messageConfig.user.securityAnswerMessage
                });
            })
            .catch(function (err) {
                return next(err);

            });
    };

    _p.saveMiddleFunc = function (req, res, newUser, next, msg) {
        dataProviderHelper.save(newUser)
            .then(function () {
                res.status(HTTPStatus.OK);
                res.json({
                    message: msg
                });
            })
            .catch(function (err) {
                return next(err);
            });
    };


    _p.saveUsers = function (req, res, next) {
        req.body = JSON.parse(req.body.data);

        req.checkBody('password', messageConfig.user.validationErrMessage.password).notEmpty();
        req.checkBody('securityQuestion', messageConfig.user.validationErrMessage.securityQuestion).notEmpty();
        req.checkBody('securityAnswer', messageConfig.user.validationErrMessage.securityAnswer).notEmpty();

        var errors = _p.checkValidationErrors(req);
        if (errors) {
            res.status(HTTPStatus.BAD_REQUEST);
            var _errorsRes = (errors.length === 1) ? errors[0].msg : errors;
            res.json({
                message: _errorsRes
            });
        } else {
            var query = {};
            var modelInfo = utilityHelper.sanitizeUserInput(req, next);

            // About 3 percent of users derive the password from the username
            // This is not very secure and should be disallowed
            if(modelInfo.password.trim().toLowerCase().indexOf(modelInfo.email) === -1) {

                emailServiceController.getMailServiceConfig()
                    .then(function (resData) {
                        if(resData){
                           return _p.checkForCommonPassword(req, modelInfo.password);
                        }else{
                            throw new Promise.CancellationError('{ "statusCode":"' + HTTPStatus.BAD_REQUEST + '", "message": "' + messageConfig.emailService.notFound + '"}');
                        }
                    })
                    .then(function (weakPassword) {
                        if(weakPassword){
                            throw new Promise.CancellationError('{ "statusCode":"' + HTTPStatus.BAD_REQUEST + '", "message": "' + messageConfig.user.weakPassword + '"}');

                        }else{
                            query.username = modelInfo.email.toLowerCase();
                            query.deleted = false;
                            return dataProviderHelper.checkForDuplicateEntry(User, query);
                        }
                    })
                    .then(function (count) {
                        if(count > 0){
                            throw new Promise.CancellationError('{ "statusCode":"' + HTTPStatus.CONFLICT + '", "message": "' + messageConfig.user.alreadyExists + '"}');
                        }else{
                            // one for password salt and another one for security answer salt
                            return [hasher.createSalt(), hasher.createSalt()];
                        }
                    })
                    .spread(function (saltPassword, saltSecurityAnswer) {
                        return [ saltPassword, saltSecurityAnswer, hasher.computeHash(req, res, modelInfo.password, saltPassword), hasher.computeHash(req, res, modelInfo.securityAnswer, saltSecurityAnswer) ];
                    })
                    .spread(function (saltPassword, saltSecurityAnswer, hashPasswordData, hashSecurityAnswer) {
                        var imageInfo = utilityHelper.getFileInfo(req, null, next);
                        var newUser = UserModule.CreateUser(modelInfo, req.decoded.user.username, imageInfo, hashPasswordData, saltPassword, hashSecurityAnswer, saltSecurityAnswer);

                        return [newUser, dataProviderHelper.save(newUser)];
                    })
                    .spread(function (newUser) {
                        return userConfirmationTokenController.sendEmailToUser(req, newUser.email, newUser._id);
                    })
                    .then(function () {
                        res.status(HTTPStatus.OK);
                        res.json({
                            message: messageConfig.user.saveMessage
                        });
                    })
                    .catch(Promise.CancellationError, function (cancellationErr) {
                        errorHelper.customErrorResponse(res, cancellationErr, next);
                    })
                    .catch(function (err) {
                        return next(err);
                    });
            }else{
                res.status(HTTPStatus.BAD_REQUEST);
                res.json({
                    message: messageConfig.user.passwordEqUsername
                });
            }

        }
    };


    _p.updateUser = function (req, res, next) {
        req.body = JSON.parse(req.body.data);

        var errors = _p.checkValidationErrors(req);
        if (errors) {
            res.status(HTTPStatus.BAD_REQUEST);
            res.json({
                message: errors
            });
        } else {
            var modelInfo = utilityHelper.sanitizeUserInput(req, next);

            if (req.user.username !== modelInfo.email.toLowerCase() && req.user.email!==modelInfo.email.toLowerCase()) {
                // For checking duplicate entry
                var query = {};
                query.username = modelInfo.email.toLowerCase();
                query.deleted = false;

                dataProviderHelper.checkForDuplicateEntry(User, query)
                    .then(function (count) {
                        if (count > 0) {
                            throw new Promise.CancellationError('{ "statusCode":"' + HTTPStatus.CONFLICT + '", "message": "' + messageConfig.user.alreadyExists + '"}');
                        } else {
                            return _p.updateUserMiddlewareFunc(req, res, modelInfo, next);
                        }
                    })
                    .then(function () {
                        res.status(HTTPStatus.OK);
                        res.json({
                            message: messageConfig.user.updateMessage
                        });
                    })
                    .catch(Promise.CancellationError, function (cancellationErr) {
                        errorHelper.customErrorResponse(res, cancellationErr, next);
                    })
                    .catch(function (err) {
                        return next(err);
                    });
            } else {
                _p.updateUserMiddlewareFunc(req, res, modelInfo, next)
                    .then(function () {
                        res.status(HTTPStatus.OK);
                        res.json({
                            message: messageConfig.user.updateMessage
                        });
                    })
                    .catch(function (err) {
                        return next(err);
                    });
            }

        }
    };

    _p.updateUserMiddlewareFunc = function (req, res, modelInfo, next) {
        var imageInfo = utilityHelper.getFileInfo(req, req.user, next);
        req.user.firstName = modelInfo.firstName;
        req.user.middleName = modelInfo.middleName;
        req.user.lastName = modelInfo.lastName;
        req.user.email = modelInfo.email;
        req.user.phoneNumber = modelInfo.phoneNumber;
        req.user.mobileNumber = modelInfo.mobileNumber;
        req.user.active = modelInfo.active;
        req.user.userRole = modelInfo.userRole;
        req.user.updatedBy = req.decoded.user.username;
        req.user.updatedOn = new Date();
        req.user.imageName = imageInfo._imageName;
        req.user.imageProperties.imageExtension = imageInfo._imageExtension;
        req.user.imageProperties.imagePath = imageInfo._imagePath;
        return dataProviderHelper.save(req.user);
    };

    _p.checkForCommonPassword = function (req, inputPwd) {
        var dictionaryList = {};
        var exists = true;
        var passwordConfigFilePath = req.app.get('rootDir') + '/lib/list/10k_most_common.txt';

        //Check for most common passwords
        return new Promise(function (resolve, reject) {
            fs.readFile(passwordConfigFilePath, 'utf8', function (err, data) {
                if(err){
                    reject(err);
                }else{
                    data = data.split('\n');
                    data.forEach(function (password) {
                        dictionaryList[password] = true;
                    });
                    //Check if the inputted password is marked as weak password in the file or not, if not then exists bit set to false
                    if(!dictionaryList[inputPwd]) {
                        exists = false;
                    }
                    resolve(exists);
                }
            });

        });
    };

    _p.verifySecurityAnswer = function (req, res, next) {
        req.checkBody('email', messageConfig.user.validationErrMessage.email).notEmpty();
        req.checkBody('securityQuestion', messageConfig.user.validationErrMessage.securityQuestion).notEmpty();
        req.checkBody('securityAnswer', messageConfig.user.validationErrMessage.securityAnswer).notEmpty();

        var errors = req.validationErrors();
        if (errors) {
            res.status(HTTPStatus.BAD_REQUEST);
            res.json({
                message: errors
            });
        } else {
            var query = {};
            query.email = req.body.email.trim().toLowerCase();
            query.securityQuestion = req.body.securityQuestion;
            query.deleted = false;
            var sensitiveUserFields = '_id email username userConfirmed securityQuestion securityAnswer securityAnswerSalt blocked';


            return new Promise(function (resolve, reject) {
                dataProviderHelper.findOne(User, query, sensitiveUserFields)
                    .then(function (userObj) {
                        if (userObj) {
                            if (userObj.userConfirmed) {
                                if (!userObj.blocked) {
                                    return [userObj, hasher.computeHash(req, res, req.body.securityAnswer, userObj.securityAnswerSalt)];
                                } else {
                                    throw new Promise.CancellationError('{ "statusCode":"' + HTTPStatus.UNAUTHORIZED + '", "message": "' + messageConfig.login.blockMessage + '"}');
                                }
                            } else {
                                throw new Promise.CancellationError('{ "statusCode":"' + HTTPStatus.UNAUTHORIZED + '", "message": "' + messageConfig.login.accountNotConfirmed + '"}');
                            }

                        } else {
                            throw new Promise.CancellationError('{ "statusCode":"' + HTTPStatus.UNAUTHORIZED + '", "message": "' + messageConfig.user.notAuthorizedForSecurityAnswerUpdate + '"}');
                        }
                    })
                    .spread(function (userObj, hashSecurityAnswer) {
                        if (hashSecurityAnswer === userObj.securityAnswer) {
                            return passwordChangeVerifyController.sendEmailToConfirmPasswordChangeAction(req, userObj.email, userObj._id, next);

                        } else {
                            throw new Promise.CancellationError('{ "statusCode":"' + HTTPStatus.UNAUTHORIZED + '", "message": "' + messageConfig.user.notAuthorizedForSecurityAnswerUpdate + '"}');
                        }
                    })
                    .then(function (data) {
                        resolve(data);
                    })
                    .catch(Promise.CancellationError, function (cancellationErr) {
                        errorHelper.customErrorResponse(res, cancellationErr, next);
                    })
                    .catch(function (err) {
                        reject(err);
                    });
            });
        }
    };
    
    _p.verifyTwoFactorAuthentication = function (dataObj, userId) {
        var updateOpts = {
            twoFactorAuthEnabled : dataObj.twoFactorAuthEnabled,
            twoFactorAuthSharedSecret : dataObj.twoFactorAuthSharedSecret
        };
        var queryOpts = { _id : userId };
        var multiOpts = false;

        return dataProviderHelper.updateModelData(User, queryOpts, updateOpts, multiOpts);
    };

    _p.disableTwoFactorAuthentication = function (req, res, next) {
        var _userId = '';
        if(req.params){
            _userId = req.params.userId;
        }
        var updateOpts = {
            twoFactorAuthEnabled : false,
            twoFactorAuthSharedSecret : ""
        };
        var queryOpts = { _id : _userId };
        var multiOpts = false;

        return dataProviderHelper.updateModelData(User, queryOpts, updateOpts, multiOpts)
            .then(function () {
                res.status(HTTPStatus.OK);
                res.json({
                    message: messageConfig.twoFactorAuthentication.disabled
                });
            })
            .catch(function (err) {
                return next(err);

            });
    };

    _p.blockUser = function (_userId) {
        var queryOpts = {
            _id: _userId
        };
        var updateOpts = {
            blocked: true,
            blockedOn: new Date()
        };
        var multiOpts = false;

        return dataProviderHelper.updateModelData(User, queryOpts, updateOpts, multiOpts);
    };

    _p.findUserInfoByUserName = function (username) {
        var query = {};
        query.username = username;

        return dataProviderHelper.findOne(User, query, '');
    };


    return {
        getUsers: _p.getUsers,
        getUserByID: _p.getUserByID,
        patchUserInformation: _p.patchUserInformation,
        saveUsers: _p.saveUsers,
        updateUser: _p.updateUser,
        verifySecurityAnswer : _p.verifySecurityAnswer,
        verifyTwoFactorAuthentication : _p.verifyTwoFactorAuthentication,
        disableTwoFactorAuthentication : _p.disableTwoFactorAuthentication,
        blockUser : _p.blockUser,
        findUserInfoByUserName : _p.findUserInfoByUserName,
        implementForgotPasswordAction : _p.implementForgotPasswordAction
    };

})();

module.exports = userController;