"use strict";
var router_1 = require('@angular/router');
var page_not_found_1 = require('./shared/components/page-not-found/page-not-found');
var login_app_route_1 = require('./login-app/login-app.route');
exports.MainRoute = login_app_route_1.loginAppRoute.concat([
    { path: '**', component: page_not_found_1.PageNotFoundComponent }
]);
exports.appRoutingProviders = [
    login_app_route_1.authGuardProvider
];
exports.routing = router_1.RouterModule.forRoot(exports.MainRoute);
//# sourceMappingURL=app.route.js.map