/*
 * Providers provided by Angular
 */
// import {bootstrap} from '@angular/platform-browser-dynamic';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
// import {enableProdMode} from "@angular/core";
// enableProdMode();
import './app-config/helperscript';
import {AppModule} from './app/app.module';
platformBrowserDynamic().bootstrapModule(AppModule);