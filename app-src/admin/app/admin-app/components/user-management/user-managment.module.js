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
var user_edit_component_1 = require("./user-edit.component");
var user_list_component_1 = require("./user-list.component");
var user_management_component_1 = require("./user-management.component");
var user_registration_component_1 = require("./user-registration.component");
var user_security_question_component_1 = require("./user-security-question.component");
var user_setting_component_1 = require("./user-setting.component");
var user_password_update_component_1 = require("./user-password-update.component");
var user_service_1 = require("./user.service");
var shared_module_1 = require('../../../shared/shared.module');
var user_view_component_1 = require("./user-view.component");
var UserManagementModule = (function () {
    function UserManagementModule() {
    }
    UserManagementModule = __decorate([
        core_1.NgModule({
            imports: [shared_module_1.SharedModule],
            declarations: [user_edit_component_1.UserEditComponent, user_list_component_1.UserListComponent,
                user_management_component_1.UserManagementComponent, user_registration_component_1.UserRegistrationComponent, user_view_component_1.UserViewComponent,
                user_security_question_component_1.UserSecurityUpdateComponent, user_setting_component_1.UserSettingComponent, user_password_update_component_1.UserPasswordUpdateComponent],
            exports: [user_security_question_component_1.UserSecurityUpdateComponent, user_edit_component_1.UserEditComponent, user_setting_component_1.UserSettingComponent, user_password_update_component_1.UserPasswordUpdateComponent],
            providers: [user_service_1.UserService]
        }), 
        __metadata('design:paramtypes', [])
    ], UserManagementModule);
    return UserManagementModule;
}());
exports.UserManagementModule = UserManagementModule;
//# sourceMappingURL=user-managment.module.js.map