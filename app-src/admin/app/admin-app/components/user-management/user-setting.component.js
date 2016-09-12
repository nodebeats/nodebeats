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
var forms_1 = require("@angular/forms");
var slide_toggle_1 = require('@angular2-material/slide-toggle/slide-toggle');
var UserSettingComponent = (function () {
    function UserSettingComponent(_objUserService, _formBuilder) {
        this._objUserService = _objUserService;
        this._formBuilder = _formBuilder;
        this.showListEvent = new core_1.EventEmitter();
        this.objUserSetting = new user_model_1.UserSettingModel();
        this.isSubmitted = false;
        this.qrCodePath = "M0 0 L0 0 L0 0 Z";
        this.tfaChecked = false;
        this.isCancel = true;
        this.userSettingForm = this._formBuilder.group({
            "token": ['', forms_1.Validators.required]
        });
    }
    UserSettingComponent.prototype.ngOnInit = function () {
        this.tfaChecked = this.tfaEnabled;
        if (!this.tfaEnabled)
            this.getTwoFactorSecret();
    };
    UserSettingComponent.prototype.getTwoFactorSecret = function () {
        var _this = this;
        this._objUserService.getTotpSecret()
            .subscribe(function (res) { return _this.bindData(res); }, function (err) { return _this.errorMessage(err); });
    };
    UserSettingComponent.prototype.bindData = function (res) {
        this.qrCodePath = res.qrcode.path;
    };
    UserSettingComponent.prototype.verifyTotpToken = function () {
        var _this = this;
        this.isSubmitted = true;
        if (this.userSettingForm.valid) {
            var tokenValue = this.userSettingForm.controls['token'].value;
            this._objUserService.verifyTotpToken(tokenValue, this.userId)
                .subscribe(function (res) {
                //this.toggleTfa = true;
                _this.clearTextField();
                _this.tfaEnabled = true;
                _this.successStatusMessage(res);
            }, function (err) { return _this.errorMessage(err); });
        }
    };
    UserSettingComponent.prototype.successStatusMessage = function (res) {
        this.isCancel = false;
        jQuery.jAlert({
            'title': 'Success',
            'content': res.message,
            'theme': 'green'
        });
    };
    UserSettingComponent.prototype.errorMessage = function (objResponse) {
        jQuery.jAlert({
            'title': 'Alert',
            'content': objResponse.message,
            'theme': 'red'
        });
    };
    UserSettingComponent.prototype.triggerCancelForm = function () {
        this.showListEvent.emit(this.isCancel);
    };
    UserSettingComponent.prototype.toggleEnable = function (args) {
        var _this = this;
        this.tfaChecked = args;
        if (!this.tfaEnabled && this.tfaChecked)
            this.getTwoFactorSecret();
        if (!args && this.tfaEnabled) {
            jQuery.jAlert({
                'type': 'confirm',
                'title': 'Alert',
                'confirmQuestion': 'Are you sure to disable Two Factor Authentication ?',
                'theme': 'red',
                'onConfirm': function (e, btn) {
                    e.preventDefault();
                    _this.objUserSetting._id = _this.userId;
                    _this.objUserSetting.twoFactorAuthEnabled = args;
                    _this._objUserService.updateSetting(_this.objUserSetting)
                        .subscribe(function (res) {
                        _this.tfaEnabled = false;
                        _this.successStatusMessage(res);
                    }, function (error) {
                        jQuery.jAlert({
                            'title': 'Alert',
                            'content': error.message,
                            'theme': 'red'
                        });
                    });
                },
                'onDeny': function (alert) {
                    _this.tfaChecked = true;
                }
            });
        }
    };
    UserSettingComponent.prototype.clearTextField = function () {
        this.userSettingForm.controls['token'].updateValue("");
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], UserSettingComponent.prototype, "userId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], UserSettingComponent.prototype, "tfaEnabled", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], UserSettingComponent.prototype, "hideCancel", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], UserSettingComponent.prototype, "showListEvent", void 0);
    UserSettingComponent = __decorate([
        core_1.Component({
            selector: 'user-setting',
            templateUrl: 'admin-templates/user-management/user-setting.html',
            directives: [slide_toggle_1.MdSlideToggle, control_valdation_message_component_1.FormControlMessages]
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService, forms_1.FormBuilder])
    ], UserSettingComponent);
    return UserSettingComponent;
}());
exports.UserSettingComponent = UserSettingComponent;
//# sourceMappingURL=user-setting.component.js.map