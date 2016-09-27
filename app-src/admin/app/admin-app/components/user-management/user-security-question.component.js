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
var forms_1 = require("@angular/forms");
var security_question_config_1 = require('../../../shared/configs/security-question.config');
var UserSecurityUpdateComponent = (function () {
    function UserSecurityUpdateComponent(_objUserService, _formBuilder) {
        this._objUserService = _objUserService;
        this._formBuilder = _formBuilder;
        this.showListEvent = new core_1.EventEmitter();
        this.objUserSecurity = new user_model_1.UserSecurityModel();
        this.isSubmitted = false;
        this.questionlist = security_question_config_1.QUESTION_LIST;
        this.userSecurityForm = this._formBuilder.group({
            "securityQuestion": ['', forms_1.Validators.required],
            "securityAnswer": ['', forms_1.Validators.required]
        });
    }
    UserSecurityUpdateComponent.prototype.updateSecurity = function () {
        var _this = this;
        this.isSubmitted = true;
        this.objUserSecurity._id = this.userId;
        if (this.userSecurityForm.valid) {
            this._objUserService.updateSecurityQuestion(this.objUserSecurity)
                .subscribe(function (res) { return _this.successStatusMessage(res); }, function (error) { return _this.errorMessage; });
        }
    };
    UserSecurityUpdateComponent.prototype.successStatusMessage = function (res) {
        jQuery.jAlert({
            'title': 'Success',
            'content': res.message,
            'theme': 'green'
        });
        // this.triggerCancelForm();
    };
    UserSecurityUpdateComponent.prototype.errorMessage = function (objResponse) {
        jQuery.jAlert({
            'title': 'Alert',
            'content': objResponse.message,
            'theme': 'red'
        });
    };
    UserSecurityUpdateComponent.prototype.triggerCancelForm = function () {
        var isCancel = true;
        this.showListEvent.emit(isCancel);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], UserSecurityUpdateComponent.prototype, "userId", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], UserSecurityUpdateComponent.prototype, "showListEvent", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], UserSecurityUpdateComponent.prototype, "hideCancel", void 0);
    UserSecurityUpdateComponent = __decorate([
        core_1.Component({
            selector: 'user-security',
            templateUrl: 'admin-templates/user-management/user-security-update.html'
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService, forms_1.FormBuilder])
    ], UserSecurityUpdateComponent);
    return UserSecurityUpdateComponent;
}());
exports.UserSecurityUpdateComponent = UserSecurityUpdateComponent;
//# sourceMappingURL=user-security-question.component.js.map