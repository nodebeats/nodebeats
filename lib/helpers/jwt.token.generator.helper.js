(function (jwtTokenGeneratorHelper) {

    'use strict';

    var tokenConfigs = require('../configs/token.config'),
        utilityHelper = require('../helpers/utilities.helper'),
        jwt = require('jsonwebtoken');

    function JWTTokenHelperModule(){}

    JWTTokenHelperModule.CreateUserInfo = function (userObj) {
        var userInfo = {};
        userInfo._id = userObj._id;
        userInfo.active = userObj.active;
        userInfo.username = userObj.username;
        userInfo.email = userObj.email;
        userInfo.userRole = userObj.userRole;
        userInfo.imageName  = userObj.imageName;
        userInfo.addedOn = userObj.addedOn;
        userInfo.twoFactorAuthEnabled = userObj.twoFactorAuthEnabled;
        return userInfo;
    };

    jwtTokenGeneratorHelper.generateJWTToken = function (req, userObj) {

        var claims = {
            subject: userObj._id,
            issuer: utilityHelper.getApplicationDeploymentPortNumber(req) ,
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
        return {
            success: true,
            token: token,
            userInfo: userInfo
        };
    };

})(module.exports);