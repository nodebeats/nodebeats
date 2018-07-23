
var dashboardController = (function () {
    'use strict';

    var Promise = require('bluebird'),
        {google} = require('googleapis'),
        HTTPStatus = require('http-status'),
        messageConfig = require('../configs/api.message.config'),
        errorHelper = require('../helpers/error.helper'),
        fs= Promise.promisifyAll(require('fs')),
        analyticsController = require('../controllers/google.analytics.server.controller');

    function DashboardModule(){}
    var _p = DashboardModule.prototype;

    _p.showDashboardAnalytics = function(req, res, next){
        var keyPath = '';
        var googleAnalyticsDataObj = {};
        analyticsController.getGoogleAnalyticsConfig()
            .then(function (googleAnalyticsObj) {
                if (googleAnalyticsObj && googleAnalyticsObj.docProperties && googleAnalyticsObj.docProperties.docPath) {
                    googleAnalyticsDataObj = googleAnalyticsObj;
                    keyPath = process.cwd() + "/" + googleAnalyticsObj.docProperties.docPath;
                    return _p.checkCheckFileExists(keyPath);
                }
                else {
                    throw new Promise.CancellationError('{ "statusCode":"' + HTTPStatus.NOT_FOUND + '", "message": "' + messageConfig.googleAnalytics.notFound + '"}');
                }
            })
            .then(function (exists) {
                if(exists) {
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
                                analyticsData: googleAnalyticsDataObj
                            });
                        }
                    });
                } else {
                    throw new Promise.CancellationError('{ "statusCode":"' + HTTPStatus.NOT_FOUND + '", "message": "' + messageConfig.googleAnalytics.notFoundConfigFile + '"}');
                }
            })
            .catch(Promise.CancellationError, function (cancellationErr) {
                errorHelper.customErrorResponse(res, cancellationErr, next);
            })
            .catch(function (err) {
                next(err);
            });
    };
    
    _p.checkCheckFileExists = function (filePath) {
        return new Promise(function (resolve, reject) {
            fs.access(filePath, fs.R_OK, function (err) {
                if(err){
                    resolve(false);
                }else{
                    resolve(true);
                }
            });
        });
    };

    return{
        showDashboardAnalytics : _p.showDashboardAnalytics
    };

})();

module.exports = dashboardController;