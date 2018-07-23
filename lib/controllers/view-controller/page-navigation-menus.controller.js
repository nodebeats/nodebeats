(function (pageMenuController) {
    'use strict';

    var Promise = require('bluebird'),
        navigationMenuConfigs = require("../../configs/page-menu.config");

    pageMenuController.init = function (app) {
        pageMenuController.getNavigationMenus = function () {
            return Promise.resolve(navigationMenuConfigs.getNavigationMenus(app));
        };
    };
})(module.exports);