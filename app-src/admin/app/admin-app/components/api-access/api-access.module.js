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
var api_access_service_1 = require("./api-access.service");
var api_access_editor_component_1 = require("./api-access-editor.component");
var api_access_component_1 = require('./api-access.component');
var shared_module_1 = require('../../../shared/shared.module');
var ApiAccessModule = (function () {
    function ApiAccessModule() {
    }
    ApiAccessModule = __decorate([
        core_1.NgModule({
            imports: [shared_module_1.SharedModule],
            declarations: [api_access_editor_component_1.ApiAccessEditorComponent, api_access_component_1.ApiAccessComponent],
            providers: [api_access_service_1.ApiAccessService]
        }), 
        __metadata('design:paramtypes', [])
    ], ApiAccessModule);
    return ApiAccessModule;
}());
exports.ApiAccessModule = ApiAccessModule;
//# sourceMappingURL=api-access.module.js.map