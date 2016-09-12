"use strict";
/*
 * These are globally available directives in any template
 */
// Angular 2
var core_1 = require('@angular/core');
// Angular 2 Router
var router_1 = require('@angular/router');
// Angular 2 forms
var forms_1 = require('@angular/forms');
// Commmonly usable directive are injected in main app
var fadeInDirective_1 = require('../../app/shared/directives/fadeInDirective');
var processing_directive_1 = require('../../app/shared/directives/processing.directive');
// application_directives: directives that are global through out the application
exports.APPLICATION_DIRECTIVES = router_1.ROUTER_DIRECTIVES.concat(forms_1.REACTIVE_FORM_DIRECTIVES, [
    fadeInDirective_1.FadeInDirective,
    processing_directive_1.ProcessingDirective
]);
exports.DIRECTIVES = [
    { provide: core_1.PLATFORM_DIRECTIVES, multi: true, useValue: exports.APPLICATION_DIRECTIVES }
];
//# sourceMappingURL=browser-directives.js.map