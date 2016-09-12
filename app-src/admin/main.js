"use strict";
/*
 * Providers provided by Angular
 */
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
// /*
//  * Platform and Environment
//  * our providers/directives/pipes
//  */
var browser_1 = require('./app-config/platform/browser');
/*
 * App Component
 * our top level component that holds all of our components
 */
var app_component_1 = require('./app/app.component');
//
// /*
//  * Bootstrap our Angular app with a top level component `App` and inject
//  * our Services and Providers into Angular's dependency injection
//  */
//
//
// //Vendor js
require('./app-config/helperscript');
var login_service_1 = require("./app/login-app/components/login/login.service");
var core_1 = require("@angular/core");
core_1.enableProdMode();
platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent, browser_1.PLATFORM_PROVIDERS.concat([
    login_service_1.LoginService
]));
//# sourceMappingURL=main.js.map