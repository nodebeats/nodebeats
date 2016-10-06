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
var role_service_1 = require("./role.service");
var role_editor_component_1 = require("./role-editor.component");
var role_list_component_1 = require('./role-list.component');
var shared_module_1 = require('../../../shared/shared.module');
var RoleModule = (function () {
    function RoleModule() {
    }
    RoleModule = __decorate([
        core_1.NgModule({
            imports: [shared_module_1.SharedModule],
            declarations: [role_editor_component_1.RoleEditorComponent, role_list_component_1.RoleComponent],
            providers: [role_service_1.RoleService]
        }), 
        __metadata('design:paramtypes', [])
    ], RoleModule);
    return RoleModule;
}());
exports.RoleModule = RoleModule;
//# sourceMappingURL=role.module.js.map