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
///<reference path="../../../shared/components/control-valdation-message.component.ts"/>
var core_1 = require('@angular/core');
var email_service_service_1 = require("./email-service.service");
var email_service_model_1 = require("./email-service.model");
var alert_model_1 = require("../../../shared/models/alert.model");
var forms_1 = require("@angular/forms");
var validation_service_1 = require("../../../shared/services/validation.service");
var EmailServiceComponent = (function () {
    function EmailServiceComponent(_objEmailService, _formBuilder) {
        this._objEmailService = _objEmailService;
        this._formBuilder = _formBuilder;
        this.objEmailService = new email_service_model_1.EmailServiceModel();
        this.emailServiceProvider = ['normal', 'mailgun', 'postmark', 'mandrill', 'sendgrid', 'amazon'];
        this.objAlert = new alert_model_1.AlertModel();
        this.isSubmitted = false;
        this.emailServiceForm = this._formBuilder.group({
            serviceProviderType: ['', forms_1.Validators.required],
            host: [''],
            port: ['', validation_service_1.ValidationService.numberValidator],
            authUserName: [''],
            authPassword: [''],
            pool: [''],
            api_Key: [''],
            api_Secret: [''],
            api_User: [''],
            domain: [''],
            rateLimit: ['0', forms_1.Validators.compose([validation_service_1.ValidationService.numberValidator, forms_1.Validators.required])],
            secure: ['']
        });
    }
    EmailServiceComponent.prototype.ngOnInit = function () {
        this.getEmailService();
    };
    EmailServiceComponent.prototype.getEmailService = function () {
        var _this = this;
        this._objEmailService.getEmailServiceDetail()
            .subscribe(function (res) { return _this.bindDetail(res); }, function (error) { return _this.errorMessage(error); });
    };
    EmailServiceComponent.prototype.bindDetail = function (objEmailService) {
        this.objEmailService = objEmailService;
    };
    EmailServiceComponent.prototype.saveEmailService = function () {
        var _this = this;
        this.isSubmitted = true;
        if (this.validateForm() && this.emailServiceForm.valid) {
            var objSave = new email_service_model_1.EmailServiceModel();
            objSave = this.emailServiceForm.value;
            if (!this.objEmailService._id) {
                this.isPost = true;
                this._objEmailService.saveEmailService(objSave)
                    .subscribe(function (res) { return _this.resStatusMessage(res); }, function (error) { return _this.errorMessage(error); });
            }
            else {
                this.isPost = false;
                objSave._id = this.objEmailService._id;
                this._objEmailService.updateEmailService(objSave)
                    .subscribe(function (res) { return _this.resStatusMessage(res); }, function (error) { return _this.errorMessage(error); });
            }
        }
    };
    EmailServiceComponent.prototype.validateForm = function () {
        if ((this.objEmailService.api_Key != "" && typeof this.objEmailService.api_Key != "undefined") || (this.objEmailService.host != "" && typeof this.objEmailService.host != "undefined"))
            return true;
        else {
            this.objAlert.showAlert("danger", "Alert !!", "Please Enter Either Host or API Key");
        }
    };
    EmailServiceComponent.prototype.resStatusMessage = function (res) {
        this.objAlert.hideAlert();
        if (this.isPost)
            this.getEmailService();
        jQuery.jAlert({
            'title': 'Success',
            'content': res.message,
            'theme': 'green'
        });
    };
    EmailServiceComponent.prototype.errorMessage = function (res) {
        this.objAlert.showAlert("danger", "Alert !!", res.message, true);
    };
    EmailServiceComponent = __decorate([
        core_1.Component({
            selector: 'email-service',
            templateUrl: 'admin-templates/email-service/email-service.html'
        }), 
        __metadata('design:paramtypes', [email_service_service_1.EmailServiceService, forms_1.FormBuilder])
    ], EmailServiceComponent);
    return EmailServiceComponent;
}());
exports.EmailServiceComponent = EmailServiceComponent;
//# sourceMappingURL=email-service.component.js.map