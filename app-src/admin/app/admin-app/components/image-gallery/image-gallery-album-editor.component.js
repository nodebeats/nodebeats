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
var image_gallery_model_1 = require("./image-gallery.model");
var image_gallery_service_1 = require("./image-gallery.service");
var forms_1 = require("@angular/forms");
var ImageAlbumEditorComponent = (function () {
    function ImageAlbumEditorComponent(_objService, _formBuilder) {
        this._objService = _objService;
        this._formBuilder = _formBuilder;
        this.objAlbum = new image_gallery_model_1.ImageAlbumModel();
        this.showListEvent = new core_1.EventEmitter();
        this.isSubmitted = false;
        this.imageAlbumForm = this._formBuilder.group({
            "albumName": ['', forms_1.Validators.required],
            "albumDescription": ['', forms_1.Validators.required],
            "active": ['']
        });
    }
    ImageAlbumEditorComponent.prototype.ngOnInit = function () {
        if (this.albumId)
            this.getImageAlbumDetail();
    };
    ImageAlbumEditorComponent.prototype.getImageAlbumDetail = function () {
        var _this = this;
        this._objService.getImageAlbumDetail(this.albumId)
            .subscribe(function (res) {
            _this.objAlbum = res;
        }, function (error) { return _this.errorMessage(error); });
    };
    ImageAlbumEditorComponent.prototype.saveAlbum = function () {
        var _this = this;
        this.isSubmitted = true;
        if (this.imageAlbumForm.valid) {
            if (!this.albumId) {
                this._objService.saveImageAlbum(this.objAlbum)
                    .subscribe(function (res) { return _this.resStatusMessage(res); }, function (error) { return _this.errorMessage(error); });
            }
            else {
                this._objService.updateImageAlbum(this.objAlbum)
                    .subscribe(function (res) { return _this.resStatusMessage(res); }, function (error) { return _this.errorMessage(error); });
            }
        }
    };
    ImageAlbumEditorComponent.prototype.resStatusMessage = function (res) {
        this.showListEvent.emit(false); // * isCanceled = false
        jQuery.jAlert({
            'title': 'Success',
            'content': res.message,
            'theme': 'green'
        });
    };
    ImageAlbumEditorComponent.prototype.errorMessage = function (objResponse) {
        jQuery.jAlert({
            'title': 'Alert',
            'content': objResponse.message,
            'theme': 'red'
        });
    };
    ImageAlbumEditorComponent.prototype.triggerCancelForm = function () {
        var isCanceled = true;
        this.showListEvent.emit(isCanceled);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ImageAlbumEditorComponent.prototype, "albumId", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], ImageAlbumEditorComponent.prototype, "showListEvent", void 0);
    ImageAlbumEditorComponent = __decorate([
        core_1.Component({
            selector: 'image-gallery-album-editor',
            templateUrl: 'admin-templates/image-gallery/image-gallery-album-editor.html',
            directives: [control_valdation_message_component_1.FormControlMessages]
        }), 
        __metadata('design:paramtypes', [image_gallery_service_1.ImageGalleryService, forms_1.FormBuilder])
    ], ImageAlbumEditorComponent);
    return ImageAlbumEditorComponent;
}());
exports.ImageAlbumEditorComponent = ImageAlbumEditorComponent;
//# sourceMappingURL=image-gallery-album-editor.component.js.map