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
var user_service_1 = require("./user.service");
var user_model_1 = require("./user.model");
var control_valdation_message_component_1 = require("../../../shared/components/control-valdation-message.component");
var validation_service_1 = require("../../../shared/services/validation.service");
var forms_1 = require("@angular/forms");
var primeng_1 = require('primeng/primeng');
var router_1 = require("@angular/router");
var login_service_1 = require("../../../login-app/components/login/login.service");
var UserPasswordUpdateComponent = (function () {
    function UserPasswordUpdateComponent(_objUserService, router, _formBuilder, activatedRoute, loginService) {
        this._objUserService = _objUserService;
        this.router = router;
        this._formBuilder = _formBuilder;
        this.activatedRoute = activatedRoute;
        this.loginService = loginService;
        this.showListEvent = new core_1.EventEmitter();
        this.objUser = new user_model_1.UserModel();
        this.isSubmitted = false;
        this.userPasswordForm = this._formBuilder.group({
            "password": ['', forms_1.Validators.compose([forms_1.Validators.required, validation_service_1.ValidationService.passwordValidator])],
            "confirmPassword": ['', forms_1.Validators.required]
        }, {
            validator: validation_service_1.ValidationService.matchingPasswords('password', 'confirmPassword')
        });
    }
    UserPasswordUpdateComponent.prototype.updatePassword = function () {
        var _this = this;
        this.isSubmitted = true;
        this.objUser._id = this.userId;
        if (this.userPasswordForm.valid) {
            this._objUserService.updatePassword(this.objUser)
                .subscribe(function (resUser) { return _this.saveUserStatusMessage(resUser); }, function (error) { return _this.errorMessage(error); });
        }
    };
    UserPasswordUpdateComponent.prototype.saveUserStatusMessage = function (res) {
        var _this = this;
        jQuery.jAlert({
            'title': 'Success',
            'content': res.message,
            'theme': 'green',
            'onClose': function (alert) {
                if (_this.activatedRoute.snapshot.url[0].path.indexOf("profile") != -1) {
                    _this.loginService.logout();
                    _this.router.navigate(['/login']);
                }
            }
        });
        // this.triggerCancelForm();
    };
    UserPasswordUpdateComponent.prototype.errorMessage = function (objResponse) {
        jQuery.jAlert({
            'title': 'Alert',
            'content': objResponse.message,
            'theme': 'red'
        });
    };
    UserPasswordUpdateComponent.prototype.triggerCancelForm = function () {
        var isCancel = true;
        this.showListEvent.emit(isCancel);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], UserPasswordUpdateComponent.prototype, "userId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], UserPasswordUpdateComponent.prototype, "hideCancel", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], UserPasswordUpdateComponent.prototype, "showListEvent", void 0);
    UserPasswordUpdateComponent = __decorate([
        core_1.Component({
            selector: 'user-password',
            templateUrl: 'admin-templates/user-management/user-password-update.html',
            directives: [primeng_1.Password, control_valdation_message_component_1.FormControlMessages]
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService, router_1.Router, forms_1.FormBuilder, router_1.ActivatedRoute, login_service_1.LoginService])
    ], UserPasswordUpdateComponent);
    return UserPasswordUpdateComponent;
}());
exports.UserPasswordUpdateComponent = UserPasswordUpdateComponent;
//# sourceMappingURL=user-password-update.component.js.map