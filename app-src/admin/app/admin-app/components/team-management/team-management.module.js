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
var team_managment_service_1 = require("./team-managment.service");
var team_management_editor_component_1 = require("./team-management-editor.component");
var team_managment_list_component_1 = require("./team-managment-list.component");
var shared_module_1 = require('../../../shared/shared.module');
var TeamManagementModule = (function () {
    function TeamManagementModule() {
    }
    TeamManagementModule = __decorate([
        core_1.NgModule({
            imports: [shared_module_1.SharedModule],
            declarations: [team_management_editor_component_1.TeamManagementEditorComponent, team_managment_list_component_1.TeamManagementComponent],
            providers: [team_managment_service_1.TeamManagementService]
        }), 
        __metadata('design:paramtypes', [])
    ], TeamManagementModule);
    return TeamManagementModule;
}());
exports.TeamManagementModule = TeamManagementModule;
//# sourceMappingURL=team-management.module.js.map