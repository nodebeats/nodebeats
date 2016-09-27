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
var general_config_1 = require("../../../shared/configs/general.config");
var UserProfileManagementComponent = (function () {
    function UserProfileManagementComponent() {
        this.showListEvent = new core_1.EventEmitter();
        this.showView = true;
        this.tfaEnabled = false;
        var userInfo = JSON.parse(general_config_1.Config.getUserInfoToken());
        this.userId = userInfo._id;
        this.tfaEnabled = userInfo.twoFactorAuthEnabled;
    }
    UserProfileManagementComponent.prototype.ngOnInit = function () {
    };
    UserProfileManagementComponent.prototype.onShowView = function (args) {
        this.showListEvent.emit(args);
    };
    UserProfileManagementComponent.prototype.tabSwitch = function (args) {
        if (0 == args.index) {
            this.showView = true;
        }
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], UserProfileManagementComponent.prototype, "showListEvent", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], UserProfileManagementComponent.prototype, "hideCancel", void 0);
    UserProfileManagementComponent = __decorate([
        core_1.Component({
            selector: 'user-management',
            templateUrl: 'admin-templates/user-profile/user-management.html'
        }), 
        __metadata('design:paramtypes', [])
    ], UserProfileManagementComponent);
    return UserProfileManagementComponent;
}());
exports.UserProfileManagementComponent = UserProfileManagementComponent;
//# sourceMappingURL=user-management.component.js.map