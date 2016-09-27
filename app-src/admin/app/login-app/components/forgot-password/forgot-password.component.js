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
var forgot_password_model_1 = require('./forgot-password.model');
var forgot_password_service_1 = require("./forgot-password.service");
var forms_1 = require("@angular/forms");
var security_question_config_1 = require('../../../shared/configs/security-question.config');
var validation_service_1 = require("../../../shared/services/validation.service");
var ForgotPasswordComponent = (function () {
    function ForgotPasswordComponent(form, _passwordService) {
        this.form = form;
        this._passwordService = _passwordService;
        this.objForgotPassword = new forgot_password_model_1.ForgotPasswordModel();
        this.slide = "collapse";
        this.questionlist = security_question_config_1.QUESTION_LIST;
        this.alertClass = "alert-danger";
        this.email = new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required, validation_service_1.ValidationService.emailValidator]));
        this.securityAnswer = new forms_1.FormControl('', forms_1.Validators.required);
        this.securityQuestion = new forms_1.FormControl('', forms_1.Validators.required);
        this.forgotPasswordForm = form.group({
            email: this.email,
            securityQuestion: this.securityQuestion,
            securityAnswer: this.securityAnswer
        });
    }
    ForgotPasswordComponent.prototype.onSubmit = function () {
        var _this = this;
        this.isSubmitted = true;
        if (this.forgotPasswordForm.valid) {
            this._passwordService.forgotPassword(this.forgotPasswordForm.value)
                .subscribe(function (objRes) { return _this.handleSuccessResponse(objRes); }, function (error) { return _this.handleError(error); });
        }
    };
    ForgotPasswordComponent.prototype.handleSuccessResponse = function (res) {
        this.objResponse = res.message;
        this.alertClass = "alert-success";
        this.slide = "expand";
        this.isValidUser = true;
    };
    ForgotPasswordComponent.prototype.handleError = function (res) {
        this.objResponse = res.message;
        this.alertClass = "alert-danger";
        this.isValidUser = false;
        this.slide = "expand";
    };
    ForgotPasswordComponent = __decorate([
        core_1.Component({
            selector: 'forgot-password',
            templateUrl: 'login-templates/forgot-password.html',
            animations: [core_1.trigger('slideMsg', [
                    core_1.state('collapse, void', core_1.style({ opacity: 0 })),
                    core_1.state('expand', core_1.style({ opacity: 1 })),
                    core_1.transition('void <=> expand', [core_1.animate("1s ease-in", core_1.style({ opacity: 1 })), core_1.animate(500)])
                ])],
            providers: [forgot_password_service_1.ForgotPasswordService]
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder, forgot_password_service_1.ForgotPasswordService])
    ], ForgotPasswordComponent);
    return ForgotPasswordComponent;
}());
exports.ForgotPasswordComponent = ForgotPasswordComponent;
//# sourceMappingURL=forgot-password.component.js.map