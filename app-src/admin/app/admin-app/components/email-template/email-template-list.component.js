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
var primeng_1 = require('primeng/primeng');
var router_1 = require("@angular/router");
var EmailTemplateListComponent = (function () {
    function EmailTemplateListComponent(_objService, router) {
        this._objService = _objService;
        this.router = router;
        this.objEmailTemplate = new email_template_model_1.EmailTemplateModel();
        this.objResponse = new email_template_model_1.EmailTempalteResponse();
        /* Pagination */
        this.perPage = 10;
        this.currentPage = 1;
        this.totalPage = 1;
        this.nextPage = 1;
        this.preIndex = 1;
    }
    /* End Pagination */
    EmailTemplateListComponent.prototype.ngOnInit = function () {
        this.perPage = 10;
        this.currentPage = 1;
        this.getEmailTemplateList();
    };
    EmailTemplateListComponent.prototype.getEmailTemplateList = function () {
        var _this = this;
        this._objService.getEmailTemplate(this.perPage, this.currentPage)
            .subscribe(function (objRes) { return _this.bindList(objRes); }, function (error) { return _this.errorMessage(error); });
    };
    EmailTemplateListComponent.prototype.errorMessage = function (objResponse) {
        jQuery.jAlert({
            'title': 'Alert',
            'content': objResponse.message,
            'theme': 'red'
        });
    };
    EmailTemplateListComponent.prototype.bindList = function (objRes) {
        this.objResponse = objRes;
        this.preIndex = (this.perPage * (this.currentPage - 1));
        if (objRes.totalItems > 0) {
            var totalPage = objRes.totalItems / this.perPage;
            this.totalPage = totalPage > 1 ? Math.ceil(totalPage) : 1;
            setTimeout(function () {
                jQuery('.tablesorter').tablesorter({
                    headers: {
                        4: { sorter: false },
                        5: { sorter: false }
                    }
                });
            }, 50);
        }
    };
    EmailTemplateListComponent.prototype.addTemplate = function () {
        this.router.navigate(['/admin/email-template/email-template-editor']);
    };
    EmailTemplateListComponent.prototype.editDetail = function (id) {
        this.router.navigate(['/admin/email-template/email-template-editor', id]);
    };
    EmailTemplateListComponent.prototype.delete = function (id) {
        var _this = this;
        jQuery.jAlert({
            'type': 'confirm',
            'title': 'Alert',
            'confirmQuestion': 'Are you sure to delete the Template ?',
            'theme': 'red',
            'onConfirm': function (e, btn) {
                e.preventDefault();
                var objTemp = new email_template_model_1.EmailTemplateModel();
                objTemp._id = id;
                objTemp.deleted = true;
                _this._objService.deleteTemplate(objTemp)
                    .subscribe(function (res) {
                    _this.getEmailTemplateList();
                    jQuery.jAlert({
                        'title': 'Success',
                        'content': res.message,
                        'theme': 'green'
                    });
                }, function (error) {
                    jQuery.jAlert({
                        'title': 'Alert',
                        'content': error.message,
                        'theme': 'red'
                    });
                });
            }
        });
    };
    EmailTemplateListComponent.prototype.pageChanged = function (event) {
        this.perPage = event.rows;
        this.currentPage = (Math.floor(event.first / event.rows)) + 1;
        this.getEmailTemplateList();
        jQuery(".tablesorter").trigger("update");
    };
    EmailTemplateListComponent = __decorate([
        core_1.Component({
            selector: 'email-template-list',
            templateUrl: 'admin-templates/email-template/email-template-list.html',
            providers: [email_template_service_1.EmailTemplateService],
            directives: [primeng_1.Paginator]
        }), 
        __metadata('design:paramtypes', [email_template_service_1.EmailTemplateService, router_1.Router])
    ], EmailTemplateListComponent);
    return EmailTemplateListComponent;
}());
exports.EmailTemplateListComponent = EmailTemplateListComponent;
//# sourceMappingURL=email-template-list.component.js.map