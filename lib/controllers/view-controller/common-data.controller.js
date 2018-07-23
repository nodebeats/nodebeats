(function (commonDataController) {
    'use strict';

    var Promise = require('bluebird'),
        join = Promise.join,
        organizationInfoController = require('../organization.information.server.controller'),
        googleAnalyticsController = require('../google.analytics.server.controller'),
        navController = require("./page-navigation-menus.controller");

    commonDataController.init = function (app) {
        navController.init(app);

        commonDataController.getCommonData = function (req) {
            var staticDataObj = require('../../configs/static-data.config')(req);

            return join(
                navController.getNavigationMenus(),
                organizationInfoController.getOrganizationInfo(),
                googleAnalyticsController.getGoogleAnalyticsConfig(),
                function (pageMenuData, organizationInfoData, googleAnalyticsData) {
                    return {
                        pageMenuData: pageMenuData,
                        organizationInfoData: organizationInfoData,
                        googleAnalyticsData: (googleAnalyticsData === null ? {} : googleAnalyticsData.trackingId),
                        staticDataObj: staticDataObj,
                        currentYear: (new Date()).getFullYear()
                    };
                });
        };
    };

})(module.exports);