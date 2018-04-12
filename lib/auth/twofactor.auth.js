(function (twoFactorAuthenticator) {

    'use strict';

    var HTTPStatus = require('http-status'),
        messageConfig = require('../configs/api.message.config'),
        Promise = require("bluebird"),
        twoFactorAuthHelper = require('../helpers/two.factor.authentication.helper'),
        errorHelper = require('../helpers/error.helper'),
        userController = require('../controllers/user.server.controller'),
        requestIp = require('request-ip'),
        userAgent = require('useragent'),
        utilityHelper = require('../helpers/utilities.helper'),
        authorizationTokenController = require('../controllers/authorization.token.management.server.controller'),
        tokenConfigs = require('../configs/token.config'),
        jwtTokenGeneratorHelper = require('../helpers/jwt.token.generator.helper');

    twoFactorAuthenticator.validateTOTPToken = function (req, res, next) {
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
                        req.loginStatusMessage = jwtTokenGeneratorHelper.generateJWTToken(req, userInfo);

                        var userAgentDetail= userAgent.lookup(req.headers['user-agent']);
                        var ipAddress = requestIp.getClientIp(req);
                        var _hours = utilityHelper.removeCharFromString(tokenConfigs.expires, 'h');
                        var tokenExpiryDate = new Date(new Date().getTime() + (parseInt(_hours) * 60 * 60 * 1000));
                        req.loginStatusMessage.tokenExpiryDate = tokenExpiryDate;

                        return [req.loginStatusMessage, authorizationTokenController.postAuthorizationTokenInfo(req.loginStatusMessage.token, userAgentDetail, userAgentDetail.family, ipAddress, tokenExpiryDate, req.loginStatusMessage.userInfo._id)];

                    } else {
                        throw new Promise.CancellationError('{ "statusCode":"' + HTTPStatus.UNAUTHORIZED + '", "message": "' + messageConfig.twoFactorAuthentication.notVerified + '"}');
                    }
                })
                .spread(function (loginStatusMessage) {
                    res.status(HTTPStatus.OK);
                    res.json(loginStatusMessage);
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
                status: HTTPStatus.UNAUTHORIZED,
                message: messageConfig.twoFactorAuthentication.notVerified
            });
        }
    };

})(module.exports);