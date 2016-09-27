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
var email_template_component_1 = require("./email-template.component");
var email_template_editor_component_1 = require("./email-template-editor.component");
var email_template_list_component_1 = require("./email-template-list.component");
var shared_module_1 = require('../../../shared/shared.module');
var router_1 = require("@angular/router");
var EmailTemplateModule = (function () {
    function EmailTemplateModule() {
    }
    EmailTemplateModule = __decorate([
        core_1.NgModule({
            imports: [shared_module_1.SharedModule, router_1.RouterModule],
            declarations: [email_template_editor_component_1.EmailTemplateEditorComponent, email_template_list_component_1.EmailTemplateListComponent, email_template_component_1.EmailTemplateComponent],
            providers: [email_template_service_1.EmailTemplateService]
        }), 
        __metadata('design:paramtypes', [])
    ], EmailTemplateModule);
    return EmailTemplateModule;
}());
exports.EmailTemplateModule = EmailTemplateModule;
//# sourceMappingURL=email-template.module.js.map