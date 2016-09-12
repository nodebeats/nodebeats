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
var UserViewComponent = (function () {
    function UserViewComponent(_objUserService) {
        this._objUserService = _objUserService;
        this.userEditEvent = new core_1.EventEmitter();
        this.showListEvent = new core_1.EventEmitter();
        this.objUser = new user_model_1.UserModel();
        this.objResponse = new user_model_1.UserResponse();
    }
    UserViewComponent.prototype.ngOnInit = function () {
        this.getUserDetail();
    };
    UserViewComponent.prototype.getUserDetail = function () {
        var _this = this;
        this._objUserService.getUserDetail(this.userId)
            .subscribe(function (resUser) { return _this.bindDetail(resUser); }, function (error) { return _this.errorMessage(error); });
    };
    UserViewComponent.prototype.errorMessage = function (objResponse) {
        jQuery.jAlert({
            'title': 'Alert',
            'content': objResponse.message,
            'theme': 'red'
        });
    };
    UserViewComponent.prototype.bindDetail = function (objUser) {
        this.objUser = objUser;
        if (!this.objUser.imageName)
            this.imageSrc = general_config_1.Config.DefaultAvatar;
        else {
            var cl = general_config_1.Config.Cloudinary;
            this.imageSrc = cl.url(this.objUser.imageName, { transformation: [{ crop: "thumb", width: 150 }] });
        }
    };
    UserViewComponent.prototype.triggerCancelView = function (event) {
        var isCancel = true;
        this.showListEvent.emit(isCancel);
    };
    UserViewComponent.prototype.triggerEdit = function () {
        var isEdit = false;
        // this.userEditEvent.emit({showForm: true, userId: userId});
        this.userEditEvent.emit({ isEdit: true, userId: this.userId });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], UserViewComponent.prototype, "userId", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], UserViewComponent.prototype, "userEditEvent", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], UserViewComponent.prototype, "showListEvent", void 0);
    UserViewComponent = __decorate([
        core_1.Component({
            selector: 'user-view',
            templateUrl: 'admin-templates/user-management/user-view.html'
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService])
    ], UserViewComponent);
    return UserViewComponent;
}());
exports.UserViewComponent = UserViewComponent;
//# sourceMappingURL=user-view.component.js.map