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
var core_1 = require('@angular/core');
var dropdown_module_1 = require('./dropdown/dropdown.module');
var components_helper_service_1 = require('./utils/components-helper.service');
var typeahead_module_1 = require("./typeahead/typeahead.module");
var Ng2BootstrapModule = (function () {
    function Ng2BootstrapModule() {
    }
    Ng2BootstrapModule = __decorate([
        core_1.NgModule({
            exports: [
                dropdown_module_1.DropdownModule,
                typeahead_module_1.TypeaheadModule
            ],
            providers: [
                { provide: components_helper_service_1.ComponentsHelper, useClass: components_helper_service_1.ComponentsHelper }
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], Ng2BootstrapModule);
    return Ng2BootstrapModule;
}());
exports.Ng2BootstrapModule = Ng2BootstrapModule;
//# sourceMappingURL=index.js.map