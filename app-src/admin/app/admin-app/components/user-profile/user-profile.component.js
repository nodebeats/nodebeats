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
var user_model_1 = require("../user-management/user.model");
var user_service_1 = require("../user-management/user.service");
var general_config_1 = require("../../../shared/configs/general.config");
var user_edit_component_1 = require('../user-management/user-edit.component');
var UserProfileComponent = (function () {
    function UserProfileComponent(_objUserService) {
        this._objUserService = _objUserService;
        this.userEditEvent = new core_1.EventEmitter();
        this.objUser = new user_model_1.UserModel();
        this.objResponse = new user_model_1.UserResponse();
    }
    UserProfileComponent.prototype.ngOnInit = function () {
        this.getUserDetail();
    };
    UserProfileComponent.prototype.getUserDetail = function () {
        var _this = this;
        this._objUserService.getUserDetail(this.userId)
            .subscribe(function (resUser) { return _this.bindDetail(resUser); }, function (error) { return _this.errorMessage(error); });
    };
    UserProfileComponent.prototype.errorMessage = function (objResponse) {
        jQuery.jAlert({
            'title': 'Alert',
            'content': objResponse.message,
            'theme': 'red'
        });
    };
    UserProfileComponent.prototype.bindDetail = function (objUser) {
        this.objUser = objUser;
        if (!this.objUser.imageName)
            this.imageSrc = general_config_1.Config.DefaultAvatar;
        else {
            var cl = general_config_1.Config.Cloudinary;
            this.imageSrc = cl.url(this.objUser.imageName, { transformation: [{ width: 100, crop: "scale" }] });
        }
    };
    UserProfileComponent.prototype.onShowView = function (args) {
        if (!args)
            this.getUserDetail();
        this.showView = true;
    };
    UserProfileComponent.prototype.onShowEdit = function () {
        this.showView = false;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], UserProfileComponent.prototype, "userId", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], UserProfileComponent.prototype, "userEditEvent", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], UserProfileComponent.prototype, "showView", void 0);
    UserProfileComponent = __decorate([
        core_1.Component({
            selector: 'user-profile',
            templateUrl: 'admin-templates/user-profile/user-profile.html',
            directives: [user_edit_component_1.UserEditComponent],
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService])
    ], UserProfileComponent);
    return UserProfileComponent;
}());
exports.UserProfileComponent = UserProfileComponent;
//# sourceMappingURL=user-profile.component.js.map