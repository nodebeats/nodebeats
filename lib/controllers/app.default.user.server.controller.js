var defaultUserStatusController = (function () {

    'use strict';

    var HTTPStatus = require('http-status'),
        hasher = require('../auth/hasher'),
        applicationConfig = require('../configs/application.config'),
        dataProviderHelper = require('../data/mongo.provider.helper'),
        User = require('../models/user.server.model'),
        RoleManager = require('../models/role.management.server.model'),
        DefaultUserStatus = require('../models/app.default.user.status.server.model'),
        messageConfig = require('../configs/api.message.config'),
        Promise = require("bluebird");

    function DefaultUserModule(){}

    DefaultUserModule.CreateDefaultUserRole = function () {
        var roleInfo = new RoleManager();
        roleInfo.roleName = applicationConfig.user.defaultUserRole;
        roleInfo.read = true;
        roleInfo.write = true;
        roleInfo.delete = true;
        roleInfo.create = true;
        roleInfo.change = true;
        roleInfo.active = true;
        roleInfo.addedBy = "system";
        roleInfo.addedOn = new Date();
        return roleInfo;
    };

    DefaultUserModule.CreateDefaultUser = function (hashPasswordData, salt) {
        var newUserInfo = new User();
        newUserInfo.firstName = applicationConfig.user.defaultUserFirstName;
        newUserInfo.middleName = "";
        newUserInfo.lastName = applicationConfig.user.defaultUserLastName;
        newUserInfo.email = applicationConfig.user.defaultUserEmail;
        newUserInfo.username = applicationConfig.user.defaultUsername;
        newUserInfo.password = hashPasswordData;
        newUserInfo.passwordSalt = salt;
        newUserInfo.phoneNumber = "";
        newUserInfo.mobileNumber = "";
        newUserInfo.securityQuestion = "";
        newUserInfo.securityAnswer = "";
        newUserInfo.securityAnswerSalt = "";
        newUserInfo.active = true;
        newUserInfo.userConfirmed = true;
        newUserInfo.userRole = applicationConfig.user.defaultUserRole;
        newUserInfo.addedBy = "system";
        newUserInfo.addedOn = new Date();
        return newUserInfo;
    };

    DefaultUserModule.CreateDefaultUserStatus = function () {
        var defaultUserStatusInfo = new DefaultUserStatus();
        defaultUserStatusInfo.status = true;
        defaultUserStatusInfo.addedOn = new Date();
        return defaultUserStatusInfo;
    };

    var _p = DefaultUserModule.prototype;

    _p.getDefaultUserStatus = function (req, res) {

        //passing DefaultUserStatus Model along with emtpy object for data filtering and empty string representing all the fields of DefaultUserStatus Model
        //Check if there is default user or not

        return new Promise(function (resolve, reject) {
            dataProviderHelper.findOne(DefaultUserStatus, {}, '')
                .then(function (defaultUserStatusInfo) {
                    if (!defaultUserStatusInfo) {
                        var userRoleInfo = DefaultUserModule.CreateDefaultUserRole();
                        return dataProviderHelper.save(userRoleInfo);
                    } else {
                        throw new Promise.CancellationError('{ "statusCode":"' + HTTPStatus.CONFLICT + '", "message": "' + messageConfig.defaultApp.alreadyExists + '"}');
                    }
                })
                .then(function () {
                    return hasher.createSalt();
                })
                .then(function (salt) {
                    //create hashed password using salt for default password superadmin@123
                    return [salt, hasher.computeHash(req, res, applicationConfig.user.defaultPassword, salt)];
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
                    console.log('Default user with default role successfully created');
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

})();

module.exports = defaultUserStatusController;