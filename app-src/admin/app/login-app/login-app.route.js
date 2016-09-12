"use strict";
var login_component_1 = require('./components/login/login.component');
var auth_guard_service_1 = require('./auth.guard.service');
var login_service_1 = require('./components/login/login.service');
exports.LoginAppRoute = [
    { path: '', component: login_component_1.LoginComponent }
];
exports.AuthGuardProvider = [auth_guard_service_1.AuthGuardService, login_service_1.LoginService];
//# sourceMappingURL=login-app.route.js.map