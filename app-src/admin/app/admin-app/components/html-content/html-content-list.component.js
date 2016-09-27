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
var html_content_service_1 = require("./html-content.service");
var html_content_model_1 = require("./html-content.model");
var HtmlContentComponent = (function () {
    function HtmlContentComponent(_objService) {
        this._objService = _objService;
        this.objHtmlTemplate = new html_content_model_1.HtmlContentModel();
        this.objResponse = new html_content_model_1.HtmlContentResponse();
        this.showForm = false;
        /* Pagination */
        this.perPage = 10;
        this.currentPage = 1;
        this.totalPage = 1;
        this.nextPage = 1;
        this.preIndex = 1;
    }
    /* End Pagination */
    HtmlContentComponent.prototype.ngOnInit = function () {
        this.perPage = 10;
        this.currentPage = 1;
        this.getHtmlEditorList();
    };
    HtmlContentComponent.prototype.getHtmlEditorList = function () {
        var _this = this;
        this._objService.getHtmlEditorList(this.perPage, this.currentPage)
            .subscribe(function (objRes) { return _this.bindList(objRes); }, function (error) { return _this.errorMessage(error); });
    };
    HtmlContentComponent.prototype.errorMessage = function (objResponse) {
        jQuery.jAlert({
            'title': 'Alert',
            'content': objResponse.message,
            'theme': 'red'
        });
    };
    HtmlContentComponent.prototype.bindList = function (objRes) {
        this.objResponse = objRes;
        this.preIndex = (this.perPage * (this.currentPage - 1));
        if (objRes.totalItems) {
            var totalPage = objRes.totalItems / this.perPage;
            this.totalPage = totalPage > 1 ? Math.ceil(totalPage) : 1;
            setTimeout(function () {
                jQuery('.tablesorter').tablesorter({
                    headers: {
                        2: { sorter: false },
                        3: { sorter: false }
                    }
                });
            }, 50);
        }
    };
    HtmlContentComponent.prototype.edit = function (id) {
        this.showForm = true;
        this.contentId = id;
    };
    HtmlContentComponent.prototype.addHtml = function () {
        this.showForm = true;
        this.contentId = null;
    };
    HtmlContentComponent.prototype.showList = function (args) {
        if (!args)
            this.getHtmlEditorList(); // if not
        this.showForm = false;
    };
    HtmlContentComponent.prototype.delete = function (id) {
        var _this = this;
        jQuery.jAlert({
            'type': 'confirm',
            'title': 'Alert',
            'confirmQuestion': 'Are you sure to delete the Content ?',
            'theme': 'red',
            'onConfirm': function (e, btn) {
                e.preventDefault();
                var objTemp = new html_content_model_1.HtmlContentModel();
                objTemp._id = id;
                objTemp.deleted = true;
                _this._objService.deleteHtmlEditor(objTemp)
                    .subscribe(function (res) {
                    _this.getHtmlEditorList();
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
    HtmlContentComponent.prototype.pageChanged = function (event) {
        this.perPage = event.rows;
        this.currentPage = (Math.floor(event.first / event.rows)) + 1;
        this.getHtmlEditorList();
        jQuery(".tablesorter").trigger("update");
    };
    HtmlContentComponent = __decorate([
        core_1.Component({
            selector: 'html-content-list',
            templateUrl: 'admin-templates/html-content/html-content-list.html'
        }), 
        __metadata('design:paramtypes', [html_content_service_1.HtmlContentService])
    ], HtmlContentComponent);
    return HtmlContentComponent;
}());
exports.HtmlContentComponent = HtmlContentComponent;
//# sourceMappingURL=html-content-list.component.js.map