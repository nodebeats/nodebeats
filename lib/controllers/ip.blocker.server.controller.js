var ipBlockerController = (function () {

    'use strict';

    var dataProviderHelper = require('../data/mongo.provider.helper'),
        IPBlocker = require('../models/ip.block.server.model'),
        Promise = require("bluebird");

    function IPBlockerModule(){}

    IPBlockerModule.CreateIPBlocker = function(ipAddress, expiryDate){
        var ipBlockerInfo = new IPBlocker();
        ipBlockerInfo.ipAddress = ipAddress;
        ipBlockerInfo.blockedUpto = new Date(expiryDate);
        ipBlockerInfo.addedOn = new Date();
        return ipBlockerInfo;
    };

    var _p = IPBlockerModule.prototype;

    _p.checkBlockedExpiryStatus = function(ipAddress){
        var query = {};
        query.ipAddress = ipAddress;
        query.blockedUpto = { $gte: new Date()};

        return new Promise(function(resolve, reject) {
            dataProviderHelper.find(IPBlocker, query)
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

    _p.blockLoginIpAddress=function(ipAddress, expiryDate){
        var ipBlockerInfo = IPBlockerModule.CreateIPBlocker(ipAddress, expiryDate);
        return dataProviderHelper.save(ipBlockerInfo);
    };

    return{
        checkBlockedExpiryStatus : _p.checkBlockedExpiryStatus,
        blockLoginIpAddress: _p.blockLoginIpAddress
    };

})();

module.exports = ipBlockerController;