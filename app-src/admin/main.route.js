"use strict";
var router_1 = require('@angular/router');
var admin_app_route_1 = require('./app/admin-app/admin-app.route');
var page_not_found_1 = require('./app/shared/components/page-not-found/page-not-found');
var login_app_route_1 = require('./app/login-app/login-app.route');
var login_app_component_1 = require('./app/login-app/login-app.component');
var admin_app_component_1 = require('./app/admin-app/admin-app.component');
var auth_guard_service_1 = require('./app/login-app/auth.guard.service');
var forgot_password_component_1 = require('./app/login-app/components/forgot-password/forgot-password.component');
exports.MainRoute = [
    {
        path: 'login', component: login_app_component_1.LoginAppComponent, children: login_app_route_1.LoginAppRoute.slice()
    },
    {
        path: 'admin', component: admin_app_component_1.AdminAppComponent, canActivate: [auth_guard_service_1.AuthGuardService], children: admin_app_route_1.AdminAppRoute.slice()
    },
    { path: 'forgot-password', component: forgot_password_component_1.ForgotPasswordComponent },
    { path: '**', component: page_not_found_1.PageNotFoundComponent }
];
exports.APP_ROUTER_PROVIDERS = [
    router_1.provideRouter(exports.MainRoute),
    login_app_route_1.AuthGuardProvider
];
//# sourceMappingURL=main.route.js.map