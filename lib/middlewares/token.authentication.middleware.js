(function (tokenAuthenticationMiddleware) {

    'use strict';

    var jwt = require('jsonwebtoken'),
        apiMessageConfig = require('../configs/api.message.config'),
        authorizationTokenController = require('../controllers/authorization.token.management.server.controller'),
        HTTPStatus = require('http-status');

    function callbackFunc (res, bitVal, message) {
        res.status(HTTPStatus.UNAUTHORIZED);
        res.json({
            isToken: bitVal,
            success: false,
            message: message
        });
    }

    tokenAuthenticationMiddleware.authenticate = function (req, res, next) {
        // check header or url parameters or post parameters for token
        var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers.authorization;
        // decode token
        if (token) {
            // verifies secret and checks exp
            jwt.verify(token, process.env.TOKEN_SECRET,
                {  algorithm:'HS512' },
                function (err, decoded) {
                    if (err) {
                        var message = '';
                        if(err.name==="TokenExpiredError"){
                            message = apiMessageConfig.authFail.tokenExpired;
                        }else{
                            message = apiMessageConfig.authFail.authFailMessage;
                        }
                        callbackFunc(res, true, message);
                    } else {
                        authorizationTokenController.checkAuthorizationTokenStatus(token, decoded.user._id)
                            .then(function(tokenObj){
                                if(tokenObj !== null){
                                    // if everything is good, save to request for use in other routes
                                    req.decoded = decoded;
                                    req.decoded.isAuthenticated = true;
                                    next();
                                    return null;// return a non-undefined value to signal that we didn't forget to return promise
                                }else{
                                    callbackFunc(res, false, apiMessageConfig.authFail.authFailMessage);
                                }
                            })
                            .catch(function (err) {
                                callbackFunc(res, false, apiMessageConfig.authFail.authFailMessage);
                            });
                    }
                });
        } else {
            callbackFunc(res, false, apiMessageConfig.authFail.authFailMessage);
        }
    };

})(module.exports);