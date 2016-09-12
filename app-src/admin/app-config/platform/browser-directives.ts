/*
 * These are globally available directives in any template
 */
// Angular 2
import {PLATFORM_DIRECTIVES} from '@angular/core';
// Angular 2 Router
import {ROUTER_DIRECTIVES} from '@angular/router';
// Angular 2 forms
import {REACTIVE_FORM_DIRECTIVES} from '@angular/forms';

// Commmonly usable directive are injected in main app
import {FadeInDirective}from '../../app/shared/directives/fadeInDirective';
import {ProcessingDirective} from '../../app/shared/directives/processing.directive';

// application_directives: directives that are global through out the application
export const APPLICATION_DIRECTIVES = [
    ...ROUTER_DIRECTIVES,
    ...REACTIVE_FORM_DIRECTIVES,
    FadeInDirective,
    ProcessingDirective
];

export const DIRECTIVES = [
    {provide: PLATFORM_DIRECTIVES, multi: true, useValue: APPLICATION_DIRECTIVES}
];
