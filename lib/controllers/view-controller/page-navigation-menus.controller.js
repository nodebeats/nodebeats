(function (pageMenuController) {
    'use strict';

    var Promise = require('bluebird'),
        navigationMenuConfigs = require("../../configs/page-menu.config");

    pageMenuController.getNavigationMenus = function () {
        return Promise.resolve(navigationMenuConfigs);
    };

})(module.exports);