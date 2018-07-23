var loggedInController = (function () {

    'use strict';

    var dataProviderHelper = require('../data/mongo.provider.helper'),
        utilityHelper = require('../helpers/utilities.helper'),
        LoginAttempt = require('../models/login.attempt.server.model');

    function LoginHandlerModule(){}

    LoginHandlerModule.CreateLoginData = function(userID, locationObj, userAgentObj, loginAttempt, failedLogin, next){
        var loggedInInfo = new LoginAttempt();
        loggedInInfo.userID = userID;
        loggedInInfo.failedLoginAttempt = loginAttempt;
        loggedInInfo.ipAddress = userAgentObj.ipAddress;
        loggedInInfo.browser = userAgentObj.family;
        loggedInInfo.browserVersion = userAgentObj.major;
        loggedInInfo.operatingSystem = utilityHelper.getOperatingSystem(userAgentObj.source, next);
        loggedInInfo.userAgentSource = userAgentObj.source;
        loggedInInfo.device = '';
        loggedInInfo.country = locationObj.country;
        loggedInInfo.region = locationObj.region;
        loggedInInfo.city = locationObj.city;
        loggedInInfo.coordinates = locationObj.coordinates;
        loggedInInfo.range = locationObj.range;
        loggedInInfo.addedOn = new Date();
        loggedInInfo.failedLogin = failedLogin;
        return loggedInInfo;
    };

    var _p = LoginHandlerModule.prototype;

    _p.getLoggedInInfo = function(req, res, userID){
        var query = {};
        query.userID = userID;
        query.expired = false;
        query.failedLogin = true;
        return  dataProviderHelper.getAllWithoutDocumentFieldsNoPagination(LoginAttempt, query);
    };

    _p.postLoggedInData = function(req, res, userID, loginAttempt, failedLogin, next){
        var locationObj = {};
        var userAgentObj = {};

        if(req.userAgentDetail){

            userAgentObj.ipAddress = req.userAgentDetail.ipAddress;
            userAgentObj.browser = req.userAgentDetail.family;
            userAgentObj.browserVersion = req.userAgentDetail.major;
            userAgentObj.source = req.userAgentDetail.source;

            if(req.userAgentDetail.geoLocationInfo){
                locationObj.country = req.userAgentDetail.geoLocationInfo.country;
                locationObj.region = req.userAgentDetail.geoLocationInfo.region;
                locationObj.city = req.userAgentDetail.geoLocationInfo.city;
                locationObj.coordinates = req.userAgentDetail.geoLocationInfo.coordinates;
                locationObj.range = req.userAgentDetail.geoLocationInfo.range;
            }
        }
        if(failedLogin){
            loginAttempt = loginAttempt + 1;
        }
        var loggedInObj = LoginHandlerModule.CreateLoginData(userID, locationObj, userAgentObj, loginAttempt, failedLogin, next);
        return dataProviderHelper.save(loggedInObj);
    };

    _p.updateLoggedInInfo = function(req, res, _userID){
        var queryOpts = {
            userID: _userID,
            expired: false
        };
        var updateOpts = {
            expired: true,
            expiredOn: new Date(),
            failedLoginAttempt: 0
        };
        var multiOpts = true;
        return dataProviderHelper.updateModelData(LoginAttempt, queryOpts, updateOpts, multiOpts);
    };

    return{
        getLoggedInInfo: _p.getLoggedInInfo,
        postLoggedInData: _p.postLoggedInData,
        updateLoggedInInfo: _p.updateLoggedInInfo
    };

})();

module.exports = loggedInController;