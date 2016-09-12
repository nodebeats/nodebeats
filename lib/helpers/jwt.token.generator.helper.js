/**
 * Created by lakhe on 7/11/16.
 */


(function(){
    'use strict';

    var tokenConfigs = require('../configs/token.config'),
        jwt = require('jsonwebtoken');

    var jwtTokenGeneratorHelper = function(){

        function JWTTokenHelperModule(){}

        JWTTokenHelperModule.CreateUserInfo = function(userObj){
            var userInfo = {};
            userInfo._id = userObj._id;
            userInfo.active = userObj.active;
            userInfo.username = userObj.username;
            userInfo.email = userObj.email;
            userInfo.userRole = userObj.userRole;
            userInfo.addedOn = userObj.addedOn;
            userInfo.twoFactorAuthEnabled = userObj.twoFactorAuthEnabled;
            return userInfo;
        };

        return {
            generateJWTToken : function (req, userObj) {
                var claims = {
                    subject: userObj._id,
                    issuer: req.protocol + '://' + req.headers.host ,
                    permissions: ['save', 'update', 'read', 'delete']
                };

                var userInfo = JWTTokenHelperModule.CreateUserInfo(userObj);
                var token = jwt.sign(
                    {
                        user: userInfo,
                        claims: claims
                    }, process.env.TOKEN_SECRET, {
                        algorithm: tokenConfigs.hashAlgorithm,
                        expiresIn: tokenConfigs.expires,// expires in given hours
                        issuer: userInfo._id.toString()
                    });
                // return the information including token as JSON
                var loginStatusMessage = {
                        success: true,
                        token: token,
                        userInfo: userInfo
                    };
                return loginStatusMessage;
            }
        };
    };

    module.exports = jwtTokenGeneratorHelper;
})();