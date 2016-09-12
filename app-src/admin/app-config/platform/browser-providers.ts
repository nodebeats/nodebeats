/*
 * These are globally available services in any component or any other service
 */

// Angular 2
// import {HashLocationStrategy, LocationStrategy} from '@angular/common';
// Angular 2 Http
import {HTTP_PROVIDERS, RequestOptions, Http, XHRBackend} from '@angular/http';
// Angular 2 Router
// import {provideRouter} from '@angular/router';
// Angular 2 forms
import {disableDeprecatedForms, provideForms} from '@angular/forms';

// AngularClass
// import { provideWebpack } from '@angularclass/webpack-toolkit';
// import { providePrefetchIdleCallbacks } from '@angularclass/request-idle-callback';

import {APP_ROUTER_PROVIDERS} from '../../main.route';
// import { routes, asyncRoutes, prefetchRouteCallbacks } from '../app/app.routes';
import {APP_RESOLVER_PROVIDERS} from '../../app/app.resolver';
import {HeaderIntercept} from "../../app/shared/services/header-intercept";
import {HttpInterceptor} from '../../app/shared/services/interceptHttp.service';
import {FileOperrationService} from '../../app/shared/services/fileOperation.service';
import {Router} from "@angular/router";

/*
 * Application Providers/Directives/Pipes
 * providers/directives/pipes that only live in our browser environment
 */
export const APPLICATION_PROVIDERS = [
    // new Angular 2 forms
    disableDeprecatedForms(),
    provideForms(),
    ...APP_RESOLVER_PROVIDERS,
    // provideWebpack(asyncRoutes),
    // providePrefetchIdleCallbacks(prefetchRouteCallbacks),
    ...HTTP_PROVIDERS,
    {
        provide: Http,
        useFactory: (xhrBackend:XHRBackend, requestOptions:RequestOptions, router:Router) => new HttpInterceptor(xhrBackend, requestOptions, router),
        deps: [XHRBackend, RequestOptions, Router]
    },
    // {provide: RequestOptions, useClass: HeaderIntercept},
    ...APP_ROUTER_PROVIDERS,
    FileOperrationService

];

export const PROVIDERS = [
    ...APPLICATION_PROVIDERS
];
