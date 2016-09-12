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
var control_valdation_message_component_1 = require("../../../shared/components/control-valdation-message.component");
var blog_model_1 = require("./blog.model");
var blog_service_1 = require("./blog.service");
var forms_1 = require("@angular/forms");
var tag_input_component_1 = require('../../../shared/components/tag-input/tag-input.component');
var BlogMetaTagEditorComponent = (function () {
    function BlogMetaTagEditorComponent(_objService, _formBuilder) {
        this._objService = _objService;
        this._formBuilder = _formBuilder;
        this.objBlogMeta = new blog_model_1.BlogMetaTagModel();
        this.isSubmitted = false;
        this.showBlogListEvent = new core_1.EventEmitter();
        this.blogMetaForm = this._formBuilder.group({
            metaKeyword: [''],
            titleTag: ['', forms_1.Validators.required],
            metaDescription: ['', forms_1.Validators.required],
            metaAuthor: ['', forms_1.Validators.required],
        });
    }
    BlogMetaTagEditorComponent.prototype.ngOnInit = function () {
        if (this.blogId)
            this.getBlogMetaTagDetail();
        this.getBlogTagList();
    };
    BlogMetaTagEditorComponent.prototype.typeaheadOnSelect = function (e) {
        console.log("Selected value: " + e.item);
    };
    BlogMetaTagEditorComponent.prototype.getBlogTagList = function () {
        var _this = this;
        this._objService.getBlogTagList()
            .subscribe(function (res) { return _this.bindTagForAutoComplete(res); }, function (error) { return _this.errorMessage(error); });
    };
    BlogMetaTagEditorComponent.prototype.bindTagForAutoComplete = function (res) {
        var data = res.map(function (row) {
            return row.tag;
        });
        this.autoCompleteData = data;
    };
    BlogMetaTagEditorComponent.prototype.getBlogMetaTagDetail = function () {
        var _this = this;
        this._objService.getBlogMetaTagDetail(this.blogId)
            .subscribe(function (res) { return _this.bindDetail(res); }, function (error) { return _this.errorMessage(error); });
    };
    BlogMetaTagEditorComponent.prototype.bindDetail = function (objRes) {
        objRes.metaKeyword = objRes.metaKeyword.split(',');
        this.objBlogMeta = objRes;
    };
    BlogMetaTagEditorComponent.prototype.saveBlogMetaTag = function () {
        var _this = this;
        this.isSubmitted = true;
        if (this.blogMetaForm.valid) {
            this._objService.updateBlogMetaTag(this.objBlogMeta)
                .subscribe(function (res) { return _this.resStatusMessage(res); }, function (error) { return _this.errorMessage(error); });
        }
    };
    BlogMetaTagEditorComponent.prototype.resStatusMessage = function (res) {
        this.showBlogListEvent.emit(false); // * isCanceled = false
        jQuery.jAlert({
            'title': 'Success',
            'content': res.message,
            'theme': 'green'
        });
    };
    BlogMetaTagEditorComponent.prototype.errorMessage = function (objResponse) {
        jQuery.jAlert({
            'title': 'Alert',
            'content': objResponse.message,
            'theme': 'red'
        });
    };
    BlogMetaTagEditorComponent.prototype.triggerCancelForm = function () {
        var isCanceled = true;
        this.showBlogListEvent.emit(isCanceled);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], BlogMetaTagEditorComponent.prototype, "blogId", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], BlogMetaTagEditorComponent.prototype, "showBlogListEvent", void 0);
    BlogMetaTagEditorComponent = __decorate([
        core_1.Component({
            selector: 'blog-metatag-editor',
            templateUrl: 'admin-templates/blog/blog-metatag.html',
            directives: [control_valdation_message_component_1.FormControlMessages, tag_input_component_1.TagInputComponent]
        }), 
        __metadata('design:paramtypes', [blog_service_1.BlogService, forms_1.FormBuilder])
    ], BlogMetaTagEditorComponent);
    return BlogMetaTagEditorComponent;
}());
exports.BlogMetaTagEditorComponent = BlogMetaTagEditorComponent;
//# sourceMappingURL=blog-metatag.component.js.map