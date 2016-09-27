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
var blog_model_1 = require("./blog.model");
var blog_service_1 = require("./blog.service");
var forms_1 = require("@angular/forms");
var BlogDocEditorComponent = (function () {
    /* End File Upload handle */
    function BlogDocEditorComponent(_objService, _formBuilder) {
        this._objService = _objService;
        this._formBuilder = _formBuilder;
        this.objBlogDoc = new blog_model_1.BlogDocumentModel();
        this.showListEvent = new core_1.EventEmitter();
        this.isSubmitted = false;
        /* File Upload Handle*/
        this.allowedExt = ['pdf', 'doc', 'ppt', 'pptx', 'docx']; /// For valdiation of file ext
        this.allowedSize = 3;
        this.fileDeleted = false;
        this.docFormControl = new forms_1.FormControl('', forms_1.Validators.required);
        this.blogDocForm = this._formBuilder.group({
            "docTitle": ['', forms_1.Validators.required],
            "docFormControl": this.docFormControl,
            active: ['']
        });
    }
    BlogDocEditorComponent.prototype.ngOnInit = function () {
        if (this.docId)
            this.getBlogDocDetail();
    };
    BlogDocEditorComponent.prototype.getBlogDocDetail = function () {
        var _this = this;
        this._objService.getBlogDocDetail(this.blogId, this.docId)
            .subscribe(function (res) { return _this.bindDetail(res); }, function (error) { return _this.errorMessage(error); });
    };
    BlogDocEditorComponent.prototype.bindDetail = function (objRes) {
        this.objBlogDoc = objRes;
        this.fileName = this.objBlogDoc.documentName;
    };
    BlogDocEditorComponent.prototype.saveBlogDoc = function () {
        var _this = this;
        this.isSubmitted = true;
        this.docFormControl.patchValue(this.fileName);
        if (this.blogDocForm.valid) {
            if (!this.docId) {
                this._objService.saveDocument(this.blogId, this.objBlogDoc, this.file)
                    .subscribe(function (res) { return _this.resStatusMessage(res); }, function (error) { return _this.errorMessage(error); });
            }
            else {
                this._objService.updateDocumnet(this.blogId, this.objBlogDoc, this.file, this.fileDeleted)
                    .subscribe(function (res) { return _this.resStatusMessage(res); }, function (error) { return _this.errorMessage(error); });
            }
        }
    };
    BlogDocEditorComponent.prototype.resStatusMessage = function (objSave) {
        this.showListEvent.emit(false); // is Form Canceled
        jQuery.jAlert({
            'title': 'Success',
            'content': objSave.message,
            'theme': 'green'
        });
    };
    BlogDocEditorComponent.prototype.triggerCancelForm = function () {
        var isCanceled = true;
        this.showListEvent.emit(isCanceled);
    };
    BlogDocEditorComponent.prototype.errorMessage = function (objResponse) {
        jQuery.jAlert({
            'title': 'Alert',
            'content': objResponse.message,
            'theme': 'red'
        });
    };
    /*file handler */
    BlogDocEditorComponent.prototype.onFileSelect = function (args) {
        this.file = args;
        if (this.file)
            this.fileName = this.file.name;
    };
    BlogDocEditorComponent.prototype.onDeleteFile = function (id) {
        var _this = this;
        jQuery.jAlert({
            'type': 'confirm',
            'title': 'Alert',
            'confirmQuestion': 'Are you sure to delete the Document ?',
            'theme': 'red',
            'onConfirm': function (e, btn) {
                e.preventDefault();
                _this._objService.deleteDoc(_this.objBlogDoc.documentName, _this.objBlogDoc.docProperties.documentMimeType, _this.objBlogDoc.docProperties.docPath)
                    .subscribe(function (res) {
                    _this.fileDeleted = true;
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
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], BlogDocEditorComponent.prototype, "docId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], BlogDocEditorComponent.prototype, "blogId", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], BlogDocEditorComponent.prototype, "showListEvent", void 0);
    BlogDocEditorComponent = __decorate([
        core_1.Component({
            selector: 'blog-doc-editor',
            templateUrl: 'admin-templates/blog/blog-doc-editor.html'
        }), 
        __metadata('design:paramtypes', [blog_service_1.BlogService, forms_1.FormBuilder])
    ], BlogDocEditorComponent);
    return BlogDocEditorComponent;
}());
exports.BlogDocEditorComponent = BlogDocEditorComponent;
//# sourceMappingURL=blog-doc-editor.component.js.map