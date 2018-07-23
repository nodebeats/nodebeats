var passportAuth = (function () {

    "use strict";

    var hasher = require('./hasher'),
        passport = require('passport'),
        requestIp = require('request-ip'),
        geoIp = require('geoip-lite'),
        jwtTokenGeneratorHelper = require('../helpers/jwt.token.generator.helper'),
        userAgent = require('useragent'),
        LocalStrategy = require('passport-local').Strategy,
        HTTPStatus = require('http-status'),
        messageConfig = require('../configs/api.message.config'),
        errorHelper = require('../helpers/error.helper'),
        loggedInController = require('../controllers/login.attempt.server.controller'),
        Promise = require("bluebird"),
        ipBlockerController = require('../controllers/ip.blocker.server.controller'),
        userController = require('../controllers/user.server.controller'),
        authorizationTokenController = require('../controllers/authorization.token.management.server.controller'),
        tokenConfigs = require('../configs/token.config'),
        appConfig = require('../configs/application.config'),
        utilityHelper = require('../helpers/utilities.helper'),
        userUnblockTokenController = require('../controllers/user.unblock.server.controller');

    var userAgentDetail= '';

    function LoginHandlerModule(){}

    var _p = LoginHandlerModule.prototype;
    var ipAddress = "";
    // use local strategy
    passport.use('local-login', new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true

        },
        function (req, username, password, done) {

            ipAddress = requestIp.getClientIp(req);

            userAgentDetail= userAgent.lookup(req.headers['user-agent']);

            if(username){
                //check to see if the user with the provided username exists in the collection or not
                userController.findUserInfoByUserName(username)
                    .then(function (user) {
                        //if user exists, do further operations
                        //if user do not exists, then send the login failure message
                        if (user) {

                            //check if user is confirmed i.e if user has clicked the registration verification link to complete the registration process
                            //if not confirmed, then send the account not confirmed message
                            if(user.userConfirmed) {
                                var userID = user._id;
                                var userEmail = user.email;

                                //check if the user is blocked
                                //if user is not blocked , check for password match
                                //if user is already blocked, show the user blocked message

                                if (!user.blocked) {
                                    var query = {};
                                    if (userID) {
                                        query.userID = userID;
                                        query.expired = false;
                                    }
                                    return _p.handleLoginOperation(req, userID, userEmail, password, user, done);
                                } else {
                                    //operations if user is blocked, send the block message
                                    throw new Promise.CancellationError('{ "statusCode":"' + HTTPStatus.FORBIDDEN + '", "message": "' + messageConfig.login.blockMessage + '"}');
                                }
                            }else{
                                throw new Promise.CancellationError('{ "statusCode":"' + HTTPStatus.UNAUTHORIZED + '", "message": "' + messageConfig.login.accountNotConfirmed + '"}');
                            }
                        } else {
                            throw new Promise.CancellationError('{ "statusCode":"' + HTTPStatus.UNAUTHORIZED + '", "message": "' + messageConfig.login.invalidMessage + '"}');
                        }
                    })
                    .then(function (statusMessage) {
                        if(statusMessage.blocked){
                            _p.customErrorResponse(req, req.res, statusMessage.message, done);
                        }else{
                            if (statusMessage && statusMessage.message.success) {
                                done(null, statusMessage.message);
                            } else {
                                _p.customErrorResponse(req, req.res, statusMessage.message, done);

                            }
                        }
                        return null;

                    })
                    .catch(Promise.CancellationError, function (cancellationErr) {
                        var errorMessage = errorHelper.outputJSONErrorMessage(cancellationErr, done);
                        _p.customErrorResponse(req, req.res, errorMessage, done);
                        return null;
                    })
                    .catch(function (err) {
                        done(err, null);
                        return null;
                    });
            }else{
                return done(null, {
                    status:HTTPStatus.NOT_FOUND,
                    message: messageConfig.login.fieldRequired
                });
            }
        }
    ));

    _p.handleLoginOperation = function (req, userID, userEmail, password, user, done) {

        var loginResponseMessage = {};

        return new Promise(function (resolve, reject) {
            loggedInController.getLoggedInInfo(req, req.res, userID)
                .then(function (failedLoggedInInfo) {
                    var loginAttempt = 0;
                    //outputs the value in array
                    //check to see if the user had previously continuously inputted the wrong combination of username and password more than five times
                    //if true, then show the block message
                    if (failedLoggedInInfo.length > 0) {
                        loginAttempt = failedLoggedInInfo.length;
                    }
                    if (loginAttempt <= appConfig.login.maxFailedLoginAttempt) {
                        return [loginAttempt, hasher.comparePassword(password, user.password)];
                    } else {
                        throw new Promise.CancellationError('{ "statusCode":"' + HTTPStatus.FORBIDDEN + '", "message": "' + messageConfig.login.blockMessage + '"}');
                    }
                })
                .spread(function (loginAttempt, isMatch) {
                    //check to see if the password matches and password cannot be empty string
                    //if mismatch, post the record to the database
                    var failedLogin = true;
                    if (isMatch) {
                        // if user is found and password is right
                        //log the user login details to the collection and after that if wrong  login Attempt is previously  more then zero, expired those records.

                        failedLogin = false;
                        return _p.handleValidCredentials(req, user, userID, loginAttempt, failedLogin, done);

                    } else {
                        // if password doesn't match then
                        return _p.handleWrongCredentialAction(req, userID, loginAttempt, userEmail, failedLogin, done);
                    }
                })
                .then(function (statusMessage) {
                    loginResponseMessage = {
                        message: statusMessage,
                        blocked : false
                    };
                    resolve(loginResponseMessage);

                })
                .catch(Promise.CancellationError, function (cancellationErr) {
                    var errorMessage = errorHelper.outputJSONErrorMessage(cancellationErr, done);
                    loginResponseMessage = {
                        message: errorMessage,
                        blocked : true
                    };
                    resolve(loginResponseMessage);
                })
                .catch(function (err) {
                    reject(err);
                });
        });
    };

    _p.handleValidCredentials = function (req, user, userID, loginAttempt, failedLogin, done) {

        return new Promise(function (resolve, reject) {
            _p.handleUserLoginLog(req, userID, loginAttempt, failedLogin, done)
                .then(function () {
                    if (loginAttempt > 0) {
                        return loggedInController.updateLoggedInInfo(req, req.res, userID);
                    } else {
                        return Promise.resolve();
                    }
                })
                .then(function () {
                    if (!user.twoFactorAuthEnabled) {
                        req.loginStatusMessage = jwtTokenGeneratorHelper.generateJWTToken(req, user);

                        var _hours = utilityHelper.removeCharFromString(tokenConfigs.expires, 'h');
                        var tokenExpiryDate = new Date(new Date().getTime() + (parseInt(_hours) * 60 * 60 * 1000));

                        req.loginStatusMessage.tokenExpiryDate = tokenExpiryDate;
                        
                        return [req.loginStatusMessage, authorizationTokenController.postAuthorizationTokenInfo(req.loginStatusMessage.token, userAgentDetail, userAgentDetail.family, ipAddress, tokenExpiryDate, req.loginStatusMessage.userInfo._id)]
                    } else {
                        req.loginStatusMessage = {
                            twoFactorAuthEnabled: true,
                            success : true,
                            userId: user._id
                        };
                        return resolve(req.loginStatusMessage);
                    }
                })
                .spread(function (loginStatusMessage) {
                    resolve(loginStatusMessage);
                })
                .catch(function (err) {
                    reject(err);
                });
        });
    };

    _p.handleWrongCredentialAction = function (req, userID, loginAttempt, userEmail, failedLogin, done) {

        var message = '';
        var failedLoginAttempt = 0;
        failedLoginAttempt = loginAttempt + 1;
        return new Promise(function (resolve, reject) {
            //first log the failed login attempt to the collection
            _p.handleUserLoginLog(req, userID, loginAttempt, failedLogin, done)
                .then(function () {
                    //check to see if the failed login attempt is more than  max login attempt times,
                    //if so, block the user and send the unblock token to the user's associated email address
                    if (failedLoginAttempt > appConfig.login.maxFailedLoginAttempt) {
                        message = messageConfig.login.blockMessage;
                        return [message, userController.blockUser(userID)];
                    } else {
                        var expiryDate = new Date();
                        if (failedLoginAttempt >= appConfig.login.initialBlockLoginAttemptForCertainTime) {
                            switch (failedLoginAttempt) {
                                case (parseInt(appConfig.login.initialBlockLoginAttemptForCertainTime) + 1):
                                    expiryDate.setMinutes(expiryDate.getMinutes() + 10);//block for ten minutes
                                    break;
                                case (parseInt(appConfig.login.initialBlockLoginAttemptForCertainTime) + 2):
                                    expiryDate.setMinutes(expiryDate.getMinutes() + 30);//block for half hour
                                    break;
                                case (parseInt(appConfig.login.initialBlockLoginAttemptForCertainTime) + 3):
                                    expiryDate.setMinutes(expiryDate.getMinutes() + 60);//block for one hour
                                    break;
                                case (parseInt(appConfig.login.initialBlockLoginAttemptForCertainTime) + 4):
                                    expiryDate.setMinutes(expiryDate.getMinutes() + appConfig.login.maxBlockedTime);//block for one day
                                    break;
                                default:
                                    expiryDate.setMinutes(expiryDate.getMinutes() + appConfig.login.maxBlockedTime);//block for one day
                                    break;

                            }
                            message = messageConfig.login.ipBlocked;
                            return [message, ipBlockerController.blockLoginIpAddress(ipAddress, expiryDate)];

                        } else {
                            return ["", ""];
                        }
                    }
                })
                .spread(function (message) {
                    if(message === messageConfig.login.blockMessage){
                        return userUnblockTokenController.sendEmailToUser(req, userEmail, userID);
                    }
                    else if(message === messageConfig.login.ipBlocked){
                        throw new Promise.CancellationError('{ "statusCode":"' + HTTPStatus.UNAUTHORIZED + '", "message": "' + messageConfig.login.ipBlocked + '"}');
                    }
                    else{
                        throw new Promise.CancellationError('{ "statusCode":"' + HTTPStatus.UNAUTHORIZED + '", "message": "' + messageConfig.login.invalidMessage + '"}');
                    }
                })
                .then(function () {
                    var loginStatusMessage = {
                        success: false,
                        statusCode: HTTPStatus.FORBIDDEN,
                        message: messageConfig.login.blockMessage
                    };
                    req.loginStatusMessage = loginStatusMessage;
                    resolve(loginStatusMessage);
                })
                .catch(Promise.CancellationError, function (cancellationErr) {
                    var errorMessage = errorHelper.outputJSONErrorMessage(cancellationErr, done);
                    var loginStatusMessage = {
                        success: false,
                        statusCode: errorMessage.statusCode,
                        message: errorMessage.message
                    };
                    req.loginStatusMessage = loginStatusMessage;

                    resolve(loginStatusMessage);
                })
                .catch(function (err) {
                    reject(err);
                });

        });
    };

    _p.handleUserLoginLog = function (req, userID, loginAttempt, failedLogin, next) {
        req.userAgentDetail = userAgentDetail;
        var geo = geoIp.lookup(ipAddress);
        req.userAgentDetail.ipAddress = ipAddress;
        req.userAgentDetail.geoLocationInfo = geo;

        return loggedInController.postLoggedInData(req, req.res, userID, loginAttempt, failedLogin, next);
    };

    _p.customErrorResponse = function (req, res, errorMessage, done) {
        var loginStatusMessage = {
            success: false,
            status: errorMessage.statusCode,
            message: errorMessage.message
        };
        req.loginStatusMessage = loginStatusMessage;
        return  done(null, loginStatusMessage);
    };

})();

module.exports = passportAuth;
