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
var news_model_1 = require("./news.model");
var news_service_1 = require("./news.service");
var tinymce_component_1 = require('../../../shared/components/tinymce.component');
var general_config_1 = require("../../../shared/configs/general.config");
var enum_config_1 = require("../../../shared/configs/enum.config");
var primeng_1 = require("primeng/primeng");
var image_uploader_component_1 = require("../../../shared/components/image-uploader.component");
var forms_1 = require("@angular/forms");
var NewsEditorComponent = (function () {
    /* End Image Upload handle */
    function NewsEditorComponent(_objService, _formBuilder) {
        this._objService = _objService;
        this._formBuilder = _formBuilder;
        this.objNews = new news_model_1.NewsModel();
        this.showListEvent = new core_1.EventEmitter();
        this.id = "";
        this.editorFormControl = new forms_1.FormControl('', forms_1.Validators.required);
        this.isSubmitted = false;
        /* Image Upload Handle*/
        this.imageDeleted = false;
        this.fileName = "";
        this.drawImagePath = general_config_1.Config.DefaultImage;
        this.imageFormControl = new forms_1.FormControl('', forms_1.Validators.required);
        this.canvasSize = enum_config_1.ImageCanvasSizeEnum.small;
        this.objNews.newsDate = new Date().toLocaleDateString();
        this.newsForm = this._formBuilder.group({
            "newsTitle": ['', forms_1.Validators.required],
            "newsSummary": ['', forms_1.Validators.required],
            "newsAuthor": ['', forms_1.Validators.required],
            "editorFormControl": this.editorFormControl,
            "selectCategory": ['', forms_1.Validators.required],
            "newsDate": ['', forms_1.Validators.required],
            "imageFormControl": this.imageFormControl,
            "active": ['']
        });
    }
    NewsEditorComponent.prototype.ngAfterViewInit = function () {
        if (!this.newsId)
            this.drawImageToCanvas(general_config_1.Config.DefaultImage);
    };
    NewsEditorComponent.prototype.ngOnInit = function () {
        this.getCategoryList();
        if (this.newsId)
            this.getNewsDetail();
    };
    NewsEditorComponent.prototype.getCategoryList = function () {
        var _this = this;
        this._objService.getNewsCategoryList(true) /*active*/
            .subscribe(function (res) { return _this.objCatList = res; }, function (error) { return _this.errorMessage(error); });
    };
    NewsEditorComponent.prototype.getNewsDetail = function () {
        var _this = this;
        this._objService.getNewsDetail(this.newsId)
            .subscribe(function (res) { return _this.bindDetail(res); }, function (error) { return _this.errorMessage(error); });
    };
    NewsEditorComponent.prototype.bindDetail = function (objRes) {
        this.objNews = objRes;
        this.objNews.newsDate = new Date(this.objNews.newsDate).toLocaleDateString();
        this.editorFormControl.updateValue(objRes.newsDescription);
        this.imageFormControl.updateValue(objRes.image[0].imageName);
        this.fileName = objRes.image[0].imageName;
        var path = "";
        if (this.objNews.image[0]) {
            var cl = general_config_1.Config.Cloudinary;
            path = cl.url(this.objNews.image[0].imageName);
        }
        else
            path = general_config_1.Config.DefaultImage;
        this.drawImageToCanvas(path);
    };
    NewsEditorComponent.prototype.saveNews = function () {
        var _this = this;
        this.isSubmitted = true;
        this.newsForm.controls["editorFormControl"].updateValue(this.objNews.newsDescription ? this.objNews.newsDescription : "");
        if (this.newsForm.valid) {
            if (!this.newsId) {
                this._objService.saveNews(this.objNews, this.file)
                    .subscribe(function (res) { return _this.resStatusMessage(res); }, function (error) { return _this.errorMessage(error); });
            }
            else {
                this._objService.updateNews(this.objNews, this.file, this.imageDeleted)
                    .subscribe(function (res) { return _this.resStatusMessage(res); }, function (error) { return _this.errorMessage(error); });
            }
        }
    };
    NewsEditorComponent.prototype.resStatusMessage = function (objSave) {
        this.showListEvent.emit(false); // is Form Canceled
        jQuery.jAlert({
            'title': 'Success',
            'content': objSave.message,
            'theme': 'green'
        });
    };
    NewsEditorComponent.prototype.editorValueChange = function (args) {
        this.objNews.newsDescription = args;
        // (<FormControl>this.newsForm.controls["editorFormControl"]).updateValue(args);
    };
    NewsEditorComponent.prototype.triggerCancelForm = function () {
        var isCanceled = true;
        this.showListEvent.emit(isCanceled);
    };
    NewsEditorComponent.prototype.errorMessage = function (objResponse) {
        jQuery.jAlert({
            'title': 'Alert',
            'content': objResponse.message,
            'theme': 'red'
        });
    };
    /*Image Handler */
    NewsEditorComponent.prototype.changeFile = function (args) {
        this.file = args;
        if (this.file)
            this.fileName = this.file.name;
    };
    NewsEditorComponent.prototype.drawImageToCanvas = function (path) {
        this.drawImagePath = path;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], NewsEditorComponent.prototype, "newsId", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], NewsEditorComponent.prototype, "showListEvent", void 0);
    NewsEditorComponent = __decorate([
        core_1.Component({
            selector: 'news-editor',
            templateUrl: 'admin-templates/news/news-editor.html',
            directives: [control_valdation_message_component_1.FormControlMessages, primeng_1.Calendar, tinymce_component_1.TinyEditor, image_uploader_component_1.ImageUploader],
        }), 
        __metadata('design:paramtypes', [news_service_1.NewsService, forms_1.FormBuilder])
    ], NewsEditorComponent);
    return NewsEditorComponent;
}());
exports.NewsEditorComponent = NewsEditorComponent;
//# sourceMappingURL=news-editor.component.js.map