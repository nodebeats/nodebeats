var loginParallelCheckerController = (function () {

    'use strict';

    var dataProviderHelper = require('../data/mongo.provider.helper'),
        LoginParallelCheck = require('../models/parallel.login.server.model'),
        Promise = require("bluebird");

    function LoginParallelCheckerModule(){}

    LoginParallelCheckerModule.CreateLoginParallelChecker = function(ipAddress, username){
        var loginParallelCheckerInfo = new LoginParallelCheck();
        loginParallelCheckerInfo.ipAddress = ipAddress;
        loginParallelCheckerInfo.username = username;
        loginParallelCheckerInfo.addedOn = new Date();
        return loginParallelCheckerInfo;
    };

    var _p = LoginParallelCheckerModule.prototype;

    _p.checkParallizeLoginStatus = function(ipAddress, username){
        var query = {};
        query.ipAddress = ipAddress;
        query.username = username;
        query.expiryDate = { $gte: new Date() };

        return new Promise(function(resolve, reject) {
            dataProviderHelper.find(LoginParallelCheck, query)
                .then(function (resultData) {
                    if (resultData && resultData.length > 0) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                })
                .catch(function (err) {
                    reject(err);
                });
        });
    };

    _p.postParallizeLoginStatus=function(ipAddress, username){
        var loginParallelCheckerInfo = LoginParallelCheckerModule.CreateLoginParallelChecker(ipAddress, username);
        return dataProviderHelper.save(loginParallelCheckerInfo);

    };

    _p.removeParallizeLoginData=function(ipAddress, username){
        var query = {};
        query.ipAddress = ipAddress;
        query.username = username;

        return dataProviderHelper.removeModelData(LoginParallelCheck, query);
    };

    return{
        checkParallizeLoginStatus : _p.checkParallizeLoginStatus,
        postParallizeLoginStatus: _p.postParallizeLoginStatus,
        removeParallizeLoginData : _p.removeParallizeLoginData
    };

})();

module.exports = loginParallelCheckerController;