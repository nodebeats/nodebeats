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
var general_config_1 = require("../../../shared/configs/general.config");
var enum_config_1 = require("../../../shared/configs/enum.config");
var forms_1 = require("@angular/forms");
var BlogEditorComponent = (function () {
    /* End Image Upload handle */
    function BlogEditorComponent(_objService, _formBuilder) {
        this._objService = _objService;
        this._formBuilder = _formBuilder;
        this.objBlog = new blog_model_1.BlogModel();
        this.objCatList = new blog_model_1.BlogCategoryResponse();
        this.showListEvent = new core_1.EventEmitter();
        this.id = "";
        this.editorFormControl = new forms_1.FormControl('', forms_1.Validators.required);
        this.isSubmitted = false;
        /* Image Upload Handle*/
        this.imageDeleted = false;
        this.fileName = "";
        this.drawImagePath = general_config_1.Config.DefaultWideImage;
        this.imageFormControl = new forms_1.FormControl('', forms_1.Validators.required);
        this.canvasSize = enum_config_1.ImageCanvasSizeEnum.wide;
    }
    BlogEditorComponent.prototype.ngAfterViewInit = function () {
        if (!this.blogId)
            this.drawImageToCanvas(this.drawImagePath);
    };
    BlogEditorComponent.prototype.createForm = function () {
        this.blogForm = this._formBuilder.group({
            "blogTitle": ['', forms_1.Validators.required],
            "blogSummary": ['', forms_1.Validators.required],
            "blogAuthor": ['', forms_1.Validators.required],
            "editorFormControl": this.editorFormControl,
            "blogCategory": ['', forms_1.Validators.required],
            "tags": ['', forms_1.Validators.required],
            "bannerImageTitle": ['', forms_1.Validators.required],
            "bannerImageAltText": ['', forms_1.Validators.required],
            "imageFormControl": this.imageFormControl,
            "status": [''],
            "active": ['']
        });
    };
    BlogEditorComponent.prototype.ngOnInit = function () {
        this.createForm();
        this.getCategoryList();
        /*active*/
        if (this.blogId)
            this.getBlogDetail();
        this.getBlogTagList();
    };
    BlogEditorComponent.prototype.getBlogTagList = function () {
        var _this = this;
        this._objService.getBlogTagList()
            .subscribe(function (res) { return _this.bindTagForAutoComplete(res); }, function (error) { return _this.errorMessage(error); });
    };
    BlogEditorComponent.prototype.bindTagForAutoComplete = function (res) {
        var data = res.map(function (row) {
            return row.tag;
        });
        this.autoCompleteData = data;
    };
    BlogEditorComponent.prototype.getCategoryList = function () {
        var _this = this;
        this._objService.getBlogCategoryList(100, 1, true)
            .subscribe(function (res) { return _this.objCatList = res; }, function (error) { return _this.errorMessage(error); });
    };
    BlogEditorComponent.prototype.getBlogDetail = function () {
        var _this = this;
        this._objService.getBlogDetail(this.blogId)
            .subscribe(function (res) { return _this.bindDetail(res); }, function (error) { return _this.errorMessage(error); });
    };
    BlogEditorComponent.prototype.bindDetail = function (objRes) {
        var tags = objRes.tags.map(function (res) {
            return res.tag;
        });
        objRes.tags = tags;
        this.objBlog = objRes;
        this.editorFormControl.patchValue(objRes.blogDescription);
        var path = "";
        if (this.objBlog.bannerImage) {
            var cl = general_config_1.Config.Cloudinary;
            path = cl.url(this.objBlog.bannerImage);
        }
        else
            path = general_config_1.Config.DefaultWideImage;
        this.drawImageToCanvas(path);
    };
    BlogEditorComponent.prototype.saveBlog = function () {
        var _this = this;
        this.isSubmitted = true;
        this.editorFormControl.patchValue(this.objBlog.blogDescription);
        if (this.blogForm.valid) {
            if (!this.blogId) {
                this._objService.saveBlog(this.objBlog, this.file)
                    .subscribe(function (res) { return _this.resStatusMessage(res); }, function (error) { return _this.errorMessage(error); });
            }
            else {
                this._objService.updateBlog(this.objBlog, this.file, this.imageDeleted)
                    .subscribe(function (res) { return _this.resStatusMessage(res); }, function (error) { return _this.errorMessage(error); });
            }
        }
    };
    BlogEditorComponent.prototype.resStatusMessage = function (objSave) {
        this.showListEvent.emit(false); // is Form Canceled
        jQuery.jAlert({
            'title': 'Success',
            'content': objSave.message,
            'theme': 'green'
        });
    };
    BlogEditorComponent.prototype.editorValueChange = function (args) {
        this.objBlog.blogDescription = args;
        // (<FormControl>this.newsForm.controls["editorFormControl"]).updateValue(args);
    };
    BlogEditorComponent.prototype.triggerCancelForm = function () {
        var isCanceled = true;
        this.showListEvent.emit(isCanceled);
    };
    BlogEditorComponent.prototype.errorMessage = function (objResponse) {
        jQuery.jAlert({
            'title': 'Alert',
            'content': objResponse.message,
            'theme': 'red'
        });
    };
    /*Image Handler */
    BlogEditorComponent.prototype.changeFile = function (args) {
        this.file = args;
        if (this.file)
            this.fileName = this.file.name;
    };
    BlogEditorComponent.prototype.drawImageToCanvas = function (path) {
        this.drawImagePath = path;
    };
    BlogEditorComponent.prototype.deleteImage = function (imageId) {
        var _this = this;
        jQuery.jAlert({
            'type': 'confirm',
            'title': 'Alert',
            'confirmQuestion': 'Are you sure to delete the Image ?',
            'theme': 'red',
            'onConfirm': function (e, btn) {
                e.preventDefault();
                _this._objService.deleteImage(_this.objBlog.bannerImage, _this.objBlog.imageProperties.imageExtension, _this.objBlog.imageProperties.imagePath)
                    .subscribe(function (res) {
                    _this.imageDeleted = true;
                    _this.drawImageToCanvas(general_config_1.Config.DefaultWideImage);
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
    ], BlogEditorComponent.prototype, "blogId", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], BlogEditorComponent.prototype, "showListEvent", void 0);
    BlogEditorComponent = __decorate([
        core_1.Component({
            selector: 'blog-editor',
            templateUrl: 'admin-templates/blog/blog-editor.html'
        }), 
        __metadata('design:paramtypes', [blog_service_1.BlogService, forms_1.FormBuilder])
    ], BlogEditorComponent);
    return BlogEditorComponent;
}());
exports.BlogEditorComponent = BlogEditorComponent;
//# sourceMappingURL=blog-editor.component.js.map