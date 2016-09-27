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
var email_template_service_1 = require("./email-template.service");
var email_template_model_1 = require("./email-template.model");
var validation_service_1 = require("../../../shared/services/validation.service");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var EmailTemplateEditorComponent = (function () {
    function EmailTemplateEditorComponent(_objService, _formBuilder, router, activatedRoute) {
        var _this = this;
        this._objService = _objService;
        this._formBuilder = _formBuilder;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.objEmailTemp = new email_template_model_1.EmailTemplateModel();
        this.id = "";
        this.editorFormControl = new forms_1.FormControl('', forms_1.Validators.required);
        this.isSubmitted = false;
        this.templateForm = this._formBuilder.group({
            "templateName": ['', forms_1.Validators.required],
            "emailSubject": ['', forms_1.Validators.required],
            "emailFrom": ['', forms_1.Validators.compose([forms_1.Validators.required, validation_service_1.ValidationService.emailValidator])],
            "editorFormControl": this.editorFormControl,
            "active": [''],
            "attachment": ['']
        });
        activatedRoute.params.subscribe(function (params) { return _this.id = params['id']; });
    }
    EmailTemplateEditorComponent.prototype.ngOnInit = function () {
        if (this.id)
            this.getTemplateDetail();
    };
    EmailTemplateEditorComponent.prototype.getTemplateDetail = function () {
        var _this = this;
        this._objService.getEmailTemplateById(this.id)
            .subscribe(function (res) { return _this.bindDetail(res); }, function (error) { return _this.errorMessage(error); });
    };
    EmailTemplateEditorComponent.prototype.bindDetail = function (objRes) {
        this.objEmailTemp = objRes;
    };
    EmailTemplateEditorComponent.prototype.saveTemplate = function () {
        var _this = this;
        this.isSubmitted = true;
        this.templateForm.controls["editorFormControl"].patchValue(this.objEmailTemp.templateBody ? this.objEmailTemp.templateBody : "");
        if (this.templateForm.valid) {
            if (!this.id) {
                this._objService.saveEmailTemplate(this.objEmailTemp)
                    .subscribe(function (resUser) { return _this.resStatusMessage(resUser); }, function (error) { return _this.errorMessage(error); });
            }
            else {
                this._objService.updateEmailTemplate(this.objEmailTemp)
                    .subscribe(function (resUser) { return _this.resStatusMessage(resUser); }, function (error) { return _this.errorMessage(error); });
            }
        }
    };
    EmailTemplateEditorComponent.prototype.resStatusMessage = function (res) {
        this.router.navigate(['/admin/email-template']);
        jQuery.jAlert({
            'title': 'Success',
            'content': res.message,
            'theme': 'green'
        });
    };
    EmailTemplateEditorComponent.prototype.editorValueChange = function (args) {
        this.objEmailTemp.templateBody = args;
        //  (<FormControl>this.templateForm.controls["editorFormControl"]).updateValue(args);
    };
    EmailTemplateEditorComponent.prototype.triggerCancelForm = function () {
        this.router.navigate(['/admin/email-template']);
    };
    EmailTemplateEditorComponent.prototype.errorMessage = function (objResponse) {
        jQuery.jAlert({
            'title': 'Alert',
            'content': objResponse.message,
            'theme': 'red'
        });
    };
    EmailTemplateEditorComponent = __decorate([
        core_1.Component({
            selector: 'email-template-editor',
            templateUrl: 'admin-templates/email-template/email-template-editor.html'
        }), 
        __metadata('design:paramtypes', [email_template_service_1.EmailTemplateService, forms_1.FormBuilder, router_1.Router, router_1.ActivatedRoute])
    ], EmailTemplateEditorComponent);
    return EmailTemplateEditorComponent;
}());
exports.EmailTemplateEditorComponent = EmailTemplateEditorComponent;
//# sourceMappingURL=email-template-editor.component.js.map