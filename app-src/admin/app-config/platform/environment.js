"use strict";
// Angular 2
// rc2 workaround
var platform_browser_1 = require('@angular/platform-browser');
var core_1 = require('@angular/core');
// Environment Providers
var PROVIDERS = [];
// Angular debug tools in the dev console
// https://github.com/angular/angular/blob/86405345b781a9dc2438c0fbe3e9409245647019/TOOLS_JS.md
var _decorateComponentRef = function identity(value) {
    return value;
};
if ('production' === process.env.NODE_ENV) {
    // Production
    platform_browser_1.disableDebugTools();
    core_1.enableProdMode();
    PROVIDERS = PROVIDERS.slice();
}
else {
    _decorateComponentRef = function (cmpRef) {
        var _ng = window.ng;
        platform_browser_1.enableDebugTools(cmpRef);
        window.ng.probe = _ng.probe;
        window.ng.coreTokens = _ng.coreTokens;
        return cmpRef;
    };
    // Development
    PROVIDERS = PROVIDERS.slice();
}
exports.decorateComponentRef = _decorateComponentRef;
exports.ENV_PROVIDERS = PROVIDERS.slice();
//# sourceMappingURL=environment.js.map