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
var BlogCategoryEditorComponent = (function () {
    function BlogCategoryEditorComponent(_objService, _formBuilder) {
        this._objService = _objService;
        this._formBuilder = _formBuilder;
        this.objBlogCat = new blog_model_1.BlogCategoryModel();
        this.isSubmitted = false;
        this.showListEvent = new core_1.EventEmitter();
        this.blogCategoryForm = this._formBuilder.group({
            "categoryName": ['', forms_1.Validators.required],
            "categoryDescription": ['', forms_1.Validators.required],
            "active": ['']
        });
    }
    BlogCategoryEditorComponent.prototype.ngOnInit = function () {
        if (this.blogCategoryId)
            this.getBlogCategoryDetail();
    };
    BlogCategoryEditorComponent.prototype.getBlogCategoryDetail = function () {
        var _this = this;
        this._objService.getBlogCategoryDetail(this.blogCategoryId)
            .subscribe(function (res) { return _this.objBlogCat = res; }, function (error) { return _this.errorMessage(error); });
    };
    BlogCategoryEditorComponent.prototype.saveBlogCategory = function () {
        var _this = this;
        this.isSubmitted = true;
        if (this.blogCategoryForm.valid) {
            if (!this.blogCategoryId) {
                this._objService.saveBlogCategory(this.objBlogCat)
                    .subscribe(function (res) { return _this.resStatusMessage(res); }, function (error) { return _this.errorMessage(error); });
            }
            else {
                this._objService.updateBlogCategory(this.objBlogCat)
                    .subscribe(function (res) { return _this.resStatusMessage(res); }, function (error) { return _this.errorMessage(error); });
            }
        }
    };
    BlogCategoryEditorComponent.prototype.resStatusMessage = function (res) {
        this.showListEvent.emit(false); // * isCanceled = false
        jQuery.jAlert({
            'title': 'Success',
            'content': res.message,
            'theme': 'green'
        });
    };
    BlogCategoryEditorComponent.prototype.errorMessage = function (objResponse) {
        jQuery.jAlert({
            'title': 'Alert',
            'content': objResponse.message,
            'theme': 'red'
        });
    };
    BlogCategoryEditorComponent.prototype.triggerCancelForm = function () {
        var isCanceled = true;
        this.showListEvent.emit(isCanceled);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], BlogCategoryEditorComponent.prototype, "blogCategoryId", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], BlogCategoryEditorComponent.prototype, "showListEvent", void 0);
    BlogCategoryEditorComponent = __decorate([
        core_1.Component({
            selector: 'blog-category-editor',
            templateUrl: 'admin-templates/blog/blog-category-editor.html'
        }), 
        __metadata('design:paramtypes', [blog_service_1.BlogService, forms_1.FormBuilder])
    ], BlogCategoryEditorComponent);
    return BlogCategoryEditorComponent;
}());
exports.BlogCategoryEditorComponent = BlogCategoryEditorComponent;
//# sourceMappingURL=blog-category-editor.component.js.map