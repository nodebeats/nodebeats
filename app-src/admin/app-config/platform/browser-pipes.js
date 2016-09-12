/*
 * These are globally available pipes in any template
 */
"use strict";
var core_1 = require('@angular/core');
// application_pipes: pipes that are global through out the application
exports.APPLICATION_PIPES = [];
exports.PIPES = [
    { provide: core_1.PLATFORM_PIPES, multi: true, useValue: exports.APPLICATION_PIPES }
];
//# sourceMappingURL=browser-pipes.js.map