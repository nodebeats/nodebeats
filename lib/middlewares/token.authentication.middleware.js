/**
 * Created by lakhe on 3/28/16.
 */
(function(){
    'use strict';
    var jwt = require('jsonwebtoken'),
        apiMessageConfig = require('../configs/api.message.config'),
        HTTPStatus = require('http-status');

    var tokenAuthenticationMiddleware = function(){

        var authenticate = function(req, res, next){
            // check header or url parameters or post parameters for token
            var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers.authorization;
            // decode token
            if (token) {

                // verifies secret and checks exp
                jwt.verify(token, process.env.TOKEN_SECRET,
                    {  algorithm:'HS512' },
                    function(err, decoded) {
                        if (err) {
                            var message = '';
                            if(err.name==="TokenExpiredError"){
                                message = apiMessageConfig.authFail.tokenExpired;
                            }else{
                                message = apiMessageConfig.authFail.authFailMessage;
                            }
                            callbackFunc(res, true, message);
                        } else {
                            var currentDateTime=new Date();
                            //if token expires
                            if (decoded.exp <= (currentDateTime.getTime()/1000)) {
                                callbackFunc(res, true, apiMessageConfig.authFail.tokenExpired);
                            }else {
                                // if everything is good, save to request for use in other routes
                                req.decoded = decoded;
                                req.decoded.isAuthenticated = true;
                                next();
                            }
                        }
                    });
            } else {
                callbackFunc(res, false, apiMessageConfig.authFail.authFailMessage);
            }
        };

        return {
            authenticate : authenticate
        };
    };

    function callbackFunc(res, bitVal, message){
        res.status(HTTPStatus.UNAUTHORIZED);
        res.json({
            isToken: bitVal,
            success: false,
            message: message
        });
    }

    module.exports = tokenAuthenticationMiddleware;
})();