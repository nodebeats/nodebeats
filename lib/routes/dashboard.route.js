
var dashboardRoute = (function () {
    'use strict';

    var express = require('express'),
        dashboardRouter = express.Router(),
        dashboardController = require('../controllers/dashboard.server.controller');

    dashboardRouter.get('/google/accesstoken', dashboardController.showDashboardAnalytics);

    return dashboardRouter;

})();

module.exports = dashboardRoute;