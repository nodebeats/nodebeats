
var dashboardRoute = (function () {

    'use strict';

    var express = require('express'),
        dashboardRouter = express.Router(),
        google = require('googleapis'),
        HTTPStatus = require('http-status'),
        messageConfig = require('../configs/api.message.config'),
        analyticsController = require('../controllers/google.analytics.server.controller');

    dashboardRouter.get('/google/accesstoken', function (req, res, next) {
        analyticsController.getGoogleAnalyticsConfig()
            .then(function (googleAnalyticsObj) {
                if (googleAnalyticsObj) {
                    //  var key = require('../securityconfigs/bitsbeat-902f2983ff85.json');
                    var keyPath = process.cwd() + "/" + googleAnalyticsObj.docProperties.docPath;
                    var key = require(keyPath);
                    var scope = 'https://www.googleapis.com/auth/analytics.readonly';
                    var jwtClient = new google.auth.JWT(key.client_email, null, key.private_key, scope, null);
                    jwtClient.authorize(function (err, tokens) {
                        if (err) {
                            next(err);
                        }
                        else {
                            res.status(HTTPStatus.OK);
                            res.json({
                                token: tokens,
                                analyticsData: googleAnalyticsObj
                            });
                        }
                    });
                }
                else {
                    res.status(HTTPStatus.NOT_FOUND);
                    res.json({
                        message : messageConfig.googleAnalytics.notFound
                    });
                }
            })
            .catch(function (err) {
                next(err);
            });
    });

    return dashboardRouter;

})();

module.exports = dashboardRoute;