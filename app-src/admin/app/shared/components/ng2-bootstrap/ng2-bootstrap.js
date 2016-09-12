"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var typeahead_1 = require('./components/typeahead');
var dropdown_1 = require('./components/dropdown');
var components_helper_service_1 = require('./components/utils/components-helper.service');
__export(require('./components/typeahead'));
__export(require('./components/dropdown'));
__export(require('./components/position'));
__export(require('./components/common'));
__export(require('./components/ng2-bootstrap-config'));
exports.BS_VIEW_PROVIDERS = [{ provide: components_helper_service_1.ComponentsHelper, useClass: components_helper_service_1.ComponentsHelper }];
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    directives: [
        dropdown_1.DROPDOWN_DIRECTIVES,
        typeahead_1.TYPEAHEAD_DIRECTIVES
    ],
    providers: [
        components_helper_service_1.ComponentsHelper
    ]
};
//# sourceMappingURL=ng2-bootstrap.js.map