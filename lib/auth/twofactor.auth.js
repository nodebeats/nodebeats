/**
 * Created by lakhe on 7/11/16.
 */

(function(){
    'use strict';

    var HTTPStatus = require('http-status'),
        messageConfig = require('../configs/api.message.config'),
        Promise = require("bluebird"),
        twoFactorAuthHelper = require('../helpers/two.factor.authentication.helper'),
        errorHelper = require('../helpers/error.helper'),
        userController = require('../controllers/user.server.controller')(),
        jwtTokenGeneratorHelper = require('../helpers/jwt.token.generator.helper')();

    var twoFactorAuthenticator = function(){
        return {
            validateTOTPToken : function (req, res, next) {
                if (req.body.totpToken && req.params) {
                    userController.getUserByID(req)
                        .then(function (userInfo) {
                            if (userInfo) {
                                return [userInfo, twoFactorAuthHelper.verifyMultiFactorAuthCode(req, userInfo.twoFactorAuthSharedSecret)];

                            } else {
                                throw new Promise.CancellationError('{ "statusCode":"' + HTTPStatus.UNAUTHORIZED + '", "message": "' + messageConfig.twoFactorAuthentication.notVerified + '"}');
                            }
                        })
                        .spread(function (userInfo, verified) {
                            if (verified) {
                                var loginStatusMessage = jwtTokenGeneratorHelper.generateJWTToken(req, userInfo);
                                req.loginStatusMessage = loginStatusMessage;
                                res.status(HTTPStatus.OK);
                                res.json(req.loginStatusMessage);
                            } else {
                                throw new Promise.CancellationError('{ "statusCode":"' + HTTPStatus.UNAUTHORIZED + '", "message": "' + messageConfig.twoFactorAuthentication.notVerified + '"}');
                            }
                        })
                        .catch(Promise.CancellationError, function (cancellationErr) {
                            errorHelper.customErrorResponse(res, cancellationErr, next);
                        })
                        .catch(function (err) {
                            return next(err);
                        });
                } else {
                    res.status(HTTPStatus.UNAUTHORIZED);
                    res.json({
                        success: false,
                        message: messageConfig.twoFactorAuthentication.notVerified
                    });
                }
            }
        };
    };

    module.exports = twoFactorAuthenticator;
})();