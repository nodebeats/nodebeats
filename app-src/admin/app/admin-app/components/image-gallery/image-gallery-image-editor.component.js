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
var image_gallery_model_1 = require("./image-gallery.model");
var image_gallery_service_1 = require("./image-gallery.service");
var general_config_1 = require("../../../shared/configs/general.config");
var enum_config_1 = require("../../../shared/configs/enum.config");
var forms_1 = require("@angular/forms");
//declare var require;
//const styles:string = require('../../../shared/components/datepicker/src/my-date-picker/my-date-picker.component.css');
var ImageGalleryImageEditorComponent = (function () {
    /* End Image Upload handle */
    function ImageGalleryImageEditorComponent(_objService, _formBuilder) {
        this._objService = _objService;
        this._formBuilder = _formBuilder;
        this.objImage = new image_gallery_model_1.ImageGalleryModel();
        this.showImageListEvent = new core_1.EventEmitter();
        this.isSubmitted = false;
        /* Image Upload Handle*/
        this.imageDeleted = false;
        this.fileName = "";
        this.drawImagePath = general_config_1.Config.DefaultImage;
        this.imageFormControl = new forms_1.FormControl('', forms_1.Validators.required);
        this.canvasCanvas = enum_config_1.ImageCanvasSizeEnum.wide;
        this.imageForm = this._formBuilder.group({
            "imageTitle": ['', forms_1.Validators.required],
            "imageAltText": ['', forms_1.Validators.required],
            "imageFormControl": this.imageFormControl,
            "active": ['']
        });
    }
    ImageGalleryImageEditorComponent.prototype.ngAfterViewInit = function () {
        if (!this.imageId)
            this.drawImageToCanvas(general_config_1.Config.DefaultImage);
    };
    ImageGalleryImageEditorComponent.prototype.ngOnInit = function () {
        if (this.imageId)
            this.getAlbumImageDetail();
    };
    ImageGalleryImageEditorComponent.prototype.getAlbumImageDetail = function () {
        var _this = this;
        this._objService.getImageDetail(this.albumId, this.imageId)
            .subscribe(function (res) { return _this.bindDetail(res); }, function (error) { return _this.errorMessage(error); });
    };
    ImageGalleryImageEditorComponent.prototype.bindDetail = function (objRes) {
        this.objImage = objRes;
        var path = "";
        if (this.objImage.imageName) {
            this.fileName = this.objImage.imageName;
            this.imageForm.controls['imageFormControl'].patchValue(this.fileName);
            var cl = general_config_1.Config.Cloudinary;
            path = cl.url(this.objImage.imageName);
        }
        else
            path = general_config_1.Config.DefaultImage;
        this.drawImageToCanvas(path);
    };
    ImageGalleryImageEditorComponent.prototype.saveImage = function () {
        var _this = this;
        this.isSubmitted = true;
        this.imageForm.controls['imageFormControl'].patchValue(this.fileName);
        if (this.imageForm.valid) {
            if (!this.imageId) {
                this._objService.saveImage(this.albumId, this.objImage, this.file)
                    .subscribe(function (res) { return _this.resStatusMessage(res); }, function (error) { return _this.errorMessage(error); });
            }
            else {
                this._objService.updateImage(this.albumId, this.objImage, this.file, this.imageDeleted)
                    .subscribe(function (res) { return _this.resStatusMessage(res); }, function (error) { return _this.errorMessage(error); });
            }
        }
    };
    ImageGalleryImageEditorComponent.prototype.resStatusMessage = function (objSave) {
        this.showImageListEvent.emit(false); // is Form Canceled
        jQuery.jAlert({
            'title': 'Success',
            'content': objSave.message,
            'theme': 'green'
        });
    };
    ImageGalleryImageEditorComponent.prototype.triggerCancelForm = function () {
        var isCanceled = true;
        this.showImageListEvent.emit(isCanceled);
    };
    ImageGalleryImageEditorComponent.prototype.errorMessage = function (objResponse) {
        jQuery.jAlert({
            'title': 'Alert',
            'content': objResponse.message,
            'theme': 'red'
        });
    };
    /*Image handler */
    ImageGalleryImageEditorComponent.prototype.changeFile = function (args) {
        this.file = args;
        if (this.file)
            this.fileName = this.file.name;
    };
    ImageGalleryImageEditorComponent.prototype.drawImageToCanvas = function (path) {
        this.drawImagePath = path;
    };
    ImageGalleryImageEditorComponent.prototype.deleteImage = function (id) {
        var _this = this;
        jQuery.jAlert({
            'type': 'confirm',
            'title': 'Alert',
            'confirmQuestion': 'Are you sure to delete the Image ?',
            'theme': 'red',
            'onConfirm': function (e, btn) {
                e.preventDefault();
                _this._objService.deleteImageFile(_this.objImage.imageName, _this.objImage.imageProperties.imageExtension, _this.objImage.imageProperties.imagePath)
                    .subscribe(function (res) {
                    _this.imageDeleted = true;
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
    ], ImageGalleryImageEditorComponent.prototype, "imageId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ImageGalleryImageEditorComponent.prototype, "albumId", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], ImageGalleryImageEditorComponent.prototype, "showImageListEvent", void 0);
    ImageGalleryImageEditorComponent = __decorate([
        core_1.Component({
            selector: 'image-gallery-image-editor',
            templateUrl: 'admin-templates/image-gallery/image-gallery-image-editor.html'
        }), 
        __metadata('design:paramtypes', [image_gallery_service_1.ImageGalleryService, forms_1.FormBuilder])
    ], ImageGalleryImageEditorComponent);
    return ImageGalleryImageEditorComponent;
}());
exports.ImageGalleryImageEditorComponent = ImageGalleryImageEditorComponent;
//# sourceMappingURL=image-gallery-image-editor.component.js.map