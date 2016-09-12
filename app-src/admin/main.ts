/*
 * Providers provided by Angular
 */
import {bootstrap} from '@angular/platform-browser-dynamic';
// /*
//  * Platform and Environment
//  * our providers/directives/pipes
//  */
import {PLATFORM_PROVIDERS} from './app-config/platform/browser';
import {ENV_PROVIDERS} from './app-config/platform/environment';
/*
 * App Component
 * our top level component that holds all of our components
 */
import {AppComponent} from './app/app.component';
//
// /*
//  * Bootstrap our Angular app with a top level component `App` and inject
//  * our Services and Providers into Angular's dependency injection
//  */
//
//
// //Vendor js
import './app-config/helperscript';
import {LoginService} from "./app/login-app/components/login/login.service";
import {enableProdMode} from "@angular/core";
enableProdMode();
bootstrap(AppComponent,
    [   // To add more vendor providers please look in the platform/ folder
        ...PLATFORM_PROVIDERS,
        LoginService
        // ...ENV_PROVIDERS
    ]);
