/**
 * Created by lakhe on 3/29/16.
 */
'use strict';
var defaultUserStatusController = function(){

    var HTTPStatus = require('http-status'),
        hasher = require('../auth/hasher'),
        dataProviderHelper = require('../data/mongo.provider.helper'),
        User = require('../models/user.server.model'),
        DefaultUserStatus = require('../models/app.default.user.status.server.model'),
        messageConfig = require('../configs/api.message.config'),
        Promise = require("bluebird");

    var defaultPassword = 'superadmin@123';

    function DefaultUserModule(){}

    DefaultUserModule.CreateDefaultUser = function(hashPasswordData, salt){
        var newUserInfo = new User();
        newUserInfo.firstName = "superadmin";
        newUserInfo.middleName = "";
        newUserInfo.lastName = "superadmin";
        newUserInfo.email = "help@nodebeats.com";
        newUserInfo.username = "superadmin";
        newUserInfo.password = hashPasswordData;
        newUserInfo.passwordSalt = salt;
        newUserInfo.phoneNumber = "";
        newUserInfo.mobileNumber = "";
        newUserInfo.securityQuestion = "";
        newUserInfo.securityAnswer = "";
        newUserInfo.securityAnswerSalt = "";
        newUserInfo.active = true;
        newUserInfo.userConfirmed = true;
        newUserInfo.userRole = "admin";
        newUserInfo.addedBy = "system";
        newUserInfo.addedOn = new Date();
        return newUserInfo;
    };

    DefaultUserModule.CreateDefaultUserStatus = function(){
        var defaultUserStatusInfo = new DefaultUserStatus();
        defaultUserStatusInfo.status = true;
        defaultUserStatusInfo.addedOn = new Date();
        return defaultUserStatusInfo;
    };

    var _p = DefaultUserModule.prototype;

    _p.getDefaultUserStatus = function(req, res){

        //passing DefaultUserStatus Model along with emtpy object for data filtering and empty string representing all the fields of DefaultUserStatus Model
        //Check if there is default user or not

        return new Promise(function (resolve, reject) {
            dataProviderHelper.findOne(DefaultUserStatus, {}, '')
                .then(function (defaultUserStatusInfo) {
                    if (!defaultUserStatusInfo) {
                        return hasher.createSalt();
                    } else {
                        throw new Promise.CancellationError('{ "statusCode":"' + HTTPStatus.CONFLICT + '", "message": "' + messageConfig.defaultApp.alreadyExists + '"}');
                    }
                })
                .then(function (salt) {
                    //create hashed password using salt for default password superadmin@123
                    return [salt, hasher.computeHash(req, res, defaultPassword, salt)];
                })
                .spread(function (salt, hashPasswordData) {
                    var newUser = DefaultUserModule.CreateDefaultUser(hashPasswordData, salt);
                    return dataProviderHelper.save(newUser);
                })
                .then(function () {
                    var newDefaultUserStatus = DefaultUserModule.CreateDefaultUserStatus();
                    return dataProviderHelper.save(newDefaultUserStatus);
                })
                .then(function () {
                    resolve(messageConfig.defaultApp.successMessage);
                })
                .catch(Promise.CancellationError, function () {
                    resolve(messageConfig.defaultApp.alreadyExists);
                })
                .catch(function (err) {
                    reject(err);
                });
        });
    };

    return{
        getDefaultUserStatus: _p.getDefaultUserStatus
    };

};

module.exports = defaultUserStatusController;