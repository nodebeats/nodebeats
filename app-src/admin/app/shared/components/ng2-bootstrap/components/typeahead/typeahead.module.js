"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var common_1 = require('@angular/common');
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var typeahead_container_component_1 = require('./typeahead-container.component');
var typeahead_directive_1 = require('./typeahead.directive');
var components_helper_service_1 = require('../utils/components-helper.service');
var TypeaheadModule = (function () {
    function TypeaheadModule() {
    }
    TypeaheadModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, forms_1.FormsModule],
            declarations: [typeahead_container_component_1.TypeaheadContainerComponent, typeahead_directive_1.TypeaheadDirective],
            exports: [forms_1.FormsModule, typeahead_container_component_1.TypeaheadContainerComponent, typeahead_directive_1.TypeaheadDirective],
            providers: [components_helper_service_1.ComponentsHelper],
            entryComponents: [typeahead_container_component_1.TypeaheadContainerComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], TypeaheadModule);
    return TypeaheadModule;
}());
exports.TypeaheadModule = TypeaheadModule;
//# sourceMappingURL=typeahead.module.js.map