/*
 * These are globally available services in any component or any other service
 */
"use strict";
// Angular 2
// import {HashLocationStrategy, LocationStrategy} from '@angular/common';
// Angular 2 Http
var http_1 = require('@angular/http');
// Angular 2 Router
// import {provideRouter} from '@angular/router';
// Angular 2 forms
var forms_1 = require('@angular/forms');
// AngularClass
// import { provideWebpack } from '@angularclass/webpack-toolkit';
// import { providePrefetchIdleCallbacks } from '@angularclass/request-idle-callback';
var main_route_1 = require('../../main.route');
// import { routes, asyncRoutes, prefetchRouteCallbacks } from '../app/app.routes';
var app_resolver_1 = require('../../app/app.resolver');
var interceptHttp_service_1 = require('../../app/shared/services/interceptHttp.service');
var fileOperation_service_1 = require('../../app/shared/services/fileOperation.service');
var router_1 = require("@angular/router");
/*
 * Application Providers/Directives/Pipes
 * providers/directives/pipes that only live in our browser environment
 */
exports.APPLICATION_PROVIDERS = [
    // new Angular 2 forms
    forms_1.disableDeprecatedForms(),
    forms_1.provideForms()
].concat(app_resolver_1.APP_RESOLVER_PROVIDERS, http_1.HTTP_PROVIDERS, [
    {
        provide: http_1.Http,
        useFactory: function (xhrBackend, requestOptions, router) { return new interceptHttp_service_1.HttpInterceptor(xhrBackend, requestOptions, router); },
        deps: [http_1.XHRBackend, http_1.RequestOptions, router_1.Router]
    }
], main_route_1.APP_ROUTER_PROVIDERS, [
    fileOperation_service_1.FileOperrationService
]);
exports.PROVIDERS = exports.APPLICATION_PROVIDERS.slice();
//# sourceMappingURL=browser-providers.js.map