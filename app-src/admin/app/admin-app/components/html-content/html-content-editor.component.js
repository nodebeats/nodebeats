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
var forms_1 = require("@angular/forms");
var HtmlContentEditorComponent = (function () {
    function HtmlContentEditorComponent(_objService, _formBuilder) {
        this._objService = _objService;
        this._formBuilder = _formBuilder;
        this.objHtml = new html_content_model_1.HtmlContentModel();
        this.showListEvent = new core_1.EventEmitter();
        this.isSubmitted = false;
        this.editorFormControl = new forms_1.FormControl('', forms_1.Validators.required);
        this.htmlForm = this._formBuilder.group({
            "title": ['', forms_1.Validators.required],
            "editorFormControl": this.editorFormControl,
            active: ['']
        });
    }
    HtmlContentEditorComponent.prototype.ngOnInit = function () {
        if (this.contentId)
            this.getEditorDetail();
    };
    HtmlContentEditorComponent.prototype.getEditorDetail = function () {
        var _this = this;
        this._objService.getHtmlEditorById(this.contentId)
            .subscribe(function (res) { return _this.bindDetail(res); }, function (error) { return _this.errorMessage(error); });
    };
    HtmlContentEditorComponent.prototype.bindDetail = function (objRes) {
        this.objHtml = objRes;
        this.htmlForm.controls["editorFormControl"].patchValue(objRes.htmlModuleContent);
    };
    HtmlContentEditorComponent.prototype.saveHtmlEditor = function () {
        var _this = this;
        this.isSubmitted = true;
        if (this.htmlForm.valid) {
            if (!this.contentId) {
                this._objService.saveHtmlEditor(this.objHtml)
                    .subscribe(function (resUser) { return _this.resStatusMessage(resUser); }, function (error) { return _this.errorMessage(error); });
            }
            else {
                this._objService.updateHtmlEditor(this.objHtml)
                    .subscribe(function (resUser) { return _this.resStatusMessage(resUser); }, function (error) { return _this.errorMessage(error); });
            }
        }
    };
    HtmlContentEditorComponent.prototype.resStatusMessage = function (res) {
        this.showListEvent.emit(false); //isCanceled
        jQuery.jAlert({
            'title': 'Success',
            'content': res.message,
            'theme': 'green'
        });
    };
    HtmlContentEditorComponent.prototype.editorValueChange = function (args) {
        this.objHtml.htmlModuleContent = args;
        // (<FormControl>this.htmlForm.controls["editorFormControl"]).updateValue(args);
    };
    HtmlContentEditorComponent.prototype.triggerCancelForm = function () {
        this.showListEvent.emit(true); // is Canceled = true
    };
    HtmlContentEditorComponent.prototype.errorMessage = function (objResponse) {
        jQuery.jAlert({
            'title': 'Alert',
            'content': objResponse.message,
            'theme': 'red'
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], HtmlContentEditorComponent.prototype, "contentId", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], HtmlContentEditorComponent.prototype, "showListEvent", void 0);
    HtmlContentEditorComponent = __decorate([
        core_1.Component({
            selector: 'html-content-editor',
            templateUrl: 'admin-templates/html-content/html-content-editor.html'
        }), 
        __metadata('design:paramtypes', [html_content_service_1.HtmlContentService, forms_1.FormBuilder])
    ], HtmlContentEditorComponent);
    return HtmlContentEditorComponent;
}());
exports.HtmlContentEditorComponent = HtmlContentEditorComponent;
//# sourceMappingURL=html-content-editor.component.js.map