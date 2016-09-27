"use strict";
var login_component_1 = require('./components/login/login.component');
var auth_guard_service_1 = require('./auth.guard.service');
var login_service_1 = require('./components/login/login.service');
var forgot_password_component_1 = require('./components/forgot-password/forgot-password.component');
exports.loginAppRoute = [
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'forgot-password', component: forgot_password_component_1.ForgotPasswordComponent }
];
// export const loginAppRouting = RouterModule.forChild(loginAppRoute);
exports.authGuardProvider = [login_service_1.LoginService, auth_guard_service_1.AuthGuardService];
//# sourceMappingURL=login-app.route.js.map