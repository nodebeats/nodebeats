(function (commonDataController) {
    'use strict';

    var Promise = require('bluebird'),
        join = Promise.join,
        navController = require("./page-navigation-menus.controller"),
        organizationInfoController = require('../organization.information.server.controller'),
        googleAnalyticsController = require('../google.analytics.server.controller');

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

})(module.exports);