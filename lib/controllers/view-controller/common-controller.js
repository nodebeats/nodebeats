(function (commonController) {
    'use strict';
    commonController.getData = function (req) {

        var HTTPStatus = require('http-status'),
            messageConfig = require('../../configs/api.message.config'),
            cloudinary = require('cloudinary'),
            cloudinaryController = require('../cloudinary.setting.server.controller'),
            ananlyticsController = require('../google.analytics.server.controller'),
            staticObj = require('./static.controller')(req),
            Promise = require('bluebird'),
            resData = {};

        resData.navs = require('./navs.controller');
        resData.hostUrl = staticObj.hostUrl;

        return new Promise(function (resolve, reject) {
                return cloudinaryController.getCloudinarySetting(req)
                    .then(function (data) {
                        if (data) {
                            resData.cloudinaryUrl = data.cloudinaryCloudName;
                        } else {
                            resData.cloudinaryUrl = {
                                message: messageConfig.cloudinary.notFound
                            };
                        }
                        return ananlyticsController.getGoogleAnalyticsConfig(req);
                    })
                    .then(function (data) {
                        if (data) {
                            resData.analyticsId = data.trackingId;
                        }
                        resolve(resData);
                    })
                    .catch(function (err) {
                        reject(err);
                    });
            }
        );


    }
})
(module.exports);