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
var user_model_1 = require('./user.model');
var UserManagementComponent = (function () {
    function UserManagementComponent() {
        this.showListEvent = new core_1.EventEmitter();
        this.objUser = new user_model_1.UserModel();
    }
    UserManagementComponent.prototype.ngOnInit = function () {
        this.userId = this.objUser._id;
    };
    UserManagementComponent.prototype.onShowList = function (args) {
        this.showListEvent.emit(args);
    };
    UserManagementComponent.prototype.tabSwitch = function (args) {
        if (args.active) {
        }
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], UserManagementComponent.prototype, "showListEvent", void 0);
    __decorate([
        core_1.Input('userInfo'), 
        __metadata('design:type', user_model_1.UserModel)
    ], UserManagementComponent.prototype, "objUser", void 0);
    UserManagementComponent = __decorate([
        core_1.Component({
            selector: 'user-management',
            templateUrl: 'admin-templates/user-management/user-management.html',
        }), 
        __metadata('design:paramtypes', [])
    ], UserManagementComponent);
    return UserManagementComponent;
}());
exports.UserManagementComponent = UserManagementComponent;
//# sourceMappingURL=user-management.component.js.map