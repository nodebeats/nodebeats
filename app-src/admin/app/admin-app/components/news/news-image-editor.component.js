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
var news_model_1 = require("./news.model");
var news_service_1 = require("./news.service");
var general_config_1 = require("../../../shared/configs/general.config");
var forms_1 = require("@angular/forms");
var NewsImageEditorComponent = (function () {
    /* End Image Upload handle */
    function NewsImageEditorComponent(_objService, _formBuilder) {
        this._objService = _objService;
        this._formBuilder = _formBuilder;
        this.objNewsImage = new news_model_1.NewsImageModel();
        this.showImageListEvent = new core_1.EventEmitter();
        this.isSubmitted = false;
        /* Image Upload Handle*/
        this.imageDeleted = false;
        this.fileName = "";
        this.drawImagePath = general_config_1.Config.DefaultImage;
        this.imageFormControl = new forms_1.FormControl('', forms_1.Validators.required);
        this.newsImageForm = this._formBuilder.group({
            "imageTitle": ['', forms_1.Validators.required],
            "imageAltText": ['', forms_1.Validators.required],
            "imageFormControl": this.imageFormControl,
            active: ['']
        });
    }
    NewsImageEditorComponent.prototype.ngAfterViewInit = function () {
        if (!this.newsImageId)
            this.drawImageToCanvas(general_config_1.Config.DefaultImage);
    };
    NewsImageEditorComponent.prototype.ngOnInit = function () {
        if (this.newsImageId)
            this.getNewsImageDetail();
    };
    NewsImageEditorComponent.prototype.getNewsImageDetail = function () {
        var _this = this;
        this._objService.getNewsImageDetail(this.newsId, this.newsImageId)
            .subscribe(function (res) { return _this.bindDetail(res); }, function (error) { return _this.errorMessage(error); });
    };
    NewsImageEditorComponent.prototype.bindDetail = function (objRes) {
        this.objNewsImage = objRes;
        var path = "";
        if (this.objNewsImage.imageName) {
            var cl = general_config_1.Config.Cloudinary;
            path = cl.url(this.objNewsImage.imageName);
        }
        else
            path = general_config_1.Config.DefaultImage;
        this.drawImageToCanvas(path);
    };
    NewsImageEditorComponent.prototype.saveNewsImage = function () {
        var _this = this;
        this.isSubmitted = true;
        if (this.newsImageForm.valid) {
            if (!this.newsImageId) {
                this._objService.saveNewsImage(this.newsId, this.objNewsImage, this.file)
                    .subscribe(function (res) { return _this.resStatusMessage(res); }, function (error) { return _this.errorMessage(error); });
            }
            else {
                this._objService.updateNewsImage(this.newsId, this.objNewsImage, this.file, this.imageDeleted)
                    .subscribe(function (res) { return _this.resStatusMessage(res); }, function (error) { return _this.errorMessage(error); });
            }
        }
    };
    NewsImageEditorComponent.prototype.resStatusMessage = function (objSave) {
        this.showImageListEvent.emit(false); // is Form Canceled
        jQuery.jAlert({
            'title': 'Success',
            'content': objSave.message,
            'theme': 'green'
        });
    };
    NewsImageEditorComponent.prototype.triggerCancelForm = function () {
        var isCanceled = true;
        this.showImageListEvent.emit(isCanceled);
    };
    NewsImageEditorComponent.prototype.errorMessage = function (objResponse) {
        jQuery.jAlert({
            'title': 'Alert',
            'content': objResponse.message,
            'theme': 'red'
        });
    };
    /*Image handler */
    NewsImageEditorComponent.prototype.changeFile = function (args) {
        this.file = args;
        if (this.file)
            this.fileName = this.file.name;
    };
    NewsImageEditorComponent.prototype.drawImageToCanvas = function (path) {
        this.drawImagePath = path;
    };
    NewsImageEditorComponent.prototype.deleteImage = function (id) {
        var _this = this;
        jQuery.jAlert({
            'type': 'confirm',
            'title': 'Alert',
            'confirmQuestion': 'Are you sure to delete the Image ?',
            'theme': 'red',
            'onConfirm': function (e, btn) {
                e.preventDefault();
                _this._objService.deleteImage(_this.objNewsImage.imageName, _this.objNewsImage.imageProperties.imageExtension, _this.objNewsImage.imageProperties.imagePath)
                    .subscribe(function (res) {
                    _this.imageDeleted = true;
                    _this.objNewsImage.imageName = "";
                    _this.drawImageToCanvas(general_config_1.Config.DefaultImage);
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
    ], NewsImageEditorComponent.prototype, "newsImageId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], NewsImageEditorComponent.prototype, "newsId", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], NewsImageEditorComponent.prototype, "showImageListEvent", void 0);
    NewsImageEditorComponent = __decorate([
        core_1.Component({
            selector: 'news-image-editor',
            templateUrl: 'admin-templates/news/news-image-editor.html'
        }), 
        __metadata('design:paramtypes', [news_service_1.NewsService, forms_1.FormBuilder])
    ], NewsImageEditorComponent);
    return NewsImageEditorComponent;
}());
exports.NewsImageEditorComponent = NewsImageEditorComponent;
//# sourceMappingURL=news-image-editor.component.js.map