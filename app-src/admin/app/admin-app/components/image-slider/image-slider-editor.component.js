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
var image_slider_model_1 = require("./image-slider.model");
var image_slider_service_1 = require("./image-slider.service");
var general_config_1 = require("../../../shared/configs/general.config");
var enum_config_1 = require("../../../shared/configs/enum.config");
var forms_1 = require("@angular/forms");
//declare var require;
//const styles:string = require('../../../shared/components/datepicker/src/my-date-picker/my-date-picker.component.css');
var ImageSliderEditorComponent = (function () {
    /* End Image Upload handle */
    function ImageSliderEditorComponent(_objService, _formBuilder) {
        this._objService = _objService;
        this._formBuilder = _formBuilder;
        this.objSlider = new image_slider_model_1.ImageSliderModel();
        this.showSliderListEvent = new core_1.EventEmitter();
        this.isSubmitted = false;
        /* Image Upload Handle*/
        this.imageDeleted = false;
        this.fileName = "";
        this.drawImagePath = general_config_1.Config.DefaultImage;
        this.imageFormControl = new forms_1.FormControl('', forms_1.Validators.required);
        this.canvasSize = enum_config_1.ImageCanvasSizeEnum.small;
        this.imageSliderForm = _formBuilder.group({
            "imageTitle": ['', forms_1.Validators.required],
            "imageAltText": ['', forms_1.Validators.required],
            "imagePrimaryContent": [''],
            "imageSecondaryContent": [''],
            "active": [''],
            "imageFormControl": this.imageFormControl
        });
    }
    ImageSliderEditorComponent.prototype.ngAfterViewInit = function () {
        if (!this.sliderId)
            this.drawImageToCanvas(general_config_1.Config.DefaultImage);
    };
    ImageSliderEditorComponent.prototype.ngOnInit = function () {
        if (this.sliderId)
            this.getImageDetail();
    };
    ImageSliderEditorComponent.prototype.getImageDetail = function () {
        var _this = this;
        this._objService.getImageSliderDetail(this.sliderId)
            .subscribe(function (res) { return _this.bindDetail(res); }, function (error) { return _this.errorMessage(error); });
    };
    ImageSliderEditorComponent.prototype.bindDetail = function (objRes) {
        this.objSlider = objRes;
        this.fileName = this.objSlider.imageName;
        this.imageSliderForm.controls['imageFormControl'].patchValue(this.fileName);
        var path = "";
        if (this.objSlider.imageName) {
            var cl = general_config_1.Config.Cloudinary;
            path = cl.url(this.objSlider.imageName);
        }
        else
            path = general_config_1.Config.DefaultImage;
        this.drawImageToCanvas(path);
    };
    ImageSliderEditorComponent.prototype.saveImageSlider = function () {
        var _this = this;
        this.isSubmitted = true;
        this.imageSliderForm.controls['imageFormControl'].patchValue(this.fileName);
        if (this.imageSliderForm.valid) {
            if (!this.sliderId) {
                this._objService.saveImageSlider(this.objSlider, this.file)
                    .subscribe(function (res) { return _this.resStatusMessage(res); }, function (error) { return _this.errorMessage(error); });
            }
            else {
                this._objService.updateImageSlider(this.objSlider, this.file, this.imageDeleted)
                    .subscribe(function (res) { return _this.resStatusMessage(res); }, function (error) { return _this.errorMessage(error); });
            }
        }
    };
    ImageSliderEditorComponent.prototype.resStatusMessage = function (objSave) {
        this.showSliderListEvent.emit(false); // is Form Canceled
        jQuery.jAlert({
            'title': 'Success',
            'content': objSave.message,
            'theme': 'green'
        });
    };
    ImageSliderEditorComponent.prototype.triggerCancelForm = function () {
        var isCanceled = true;
        this.showSliderListEvent.emit(isCanceled);
    };
    ImageSliderEditorComponent.prototype.errorMessage = function (objResponse) {
        jQuery.jAlert({
            'title': 'Alert',
            'content': objResponse.message,
            'theme': 'red'
        });
    };
    /*Image handler */
    ImageSliderEditorComponent.prototype.changeFile = function (args) {
        this.file = args;
        if (this.file)
            this.fileName = this.file.name;
    };
    ImageSliderEditorComponent.prototype.drawImageToCanvas = function (path) {
        this.drawImagePath = path;
    };
    ImageSliderEditorComponent.prototype.deleteImage = function (id) {
        var _this = this;
        jQuery.jAlert({
            'type': 'confirm',
            'title': 'Alert',
            'confirmQuestion': 'Are you sure to delete the Image ?',
            'theme': 'red',
            'onConfirm': function (e, btn) {
                e.preventDefault();
                _this._objService.deleteImage(_this.objSlider.imageName, _this.objSlider.imageProperties.imageExtension, _this.objSlider.imageProperties.imagePath)
                    .subscribe(function (res) {
                    _this.imageDeleted = true;
                    _this.objSlider.imageName = "";
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
    ], ImageSliderEditorComponent.prototype, "sliderId", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], ImageSliderEditorComponent.prototype, "showSliderListEvent", void 0);
    ImageSliderEditorComponent = __decorate([
        core_1.Component({
            selector: 'image-slider-editor',
            templateUrl: 'admin-templates/image-slider/image-slider-editor.html'
        }), 
        __metadata('design:paramtypes', [image_slider_service_1.ImageSliderService, forms_1.FormBuilder])
    ], ImageSliderEditorComponent);
    return ImageSliderEditorComponent;
}());
exports.ImageSliderEditorComponent = ImageSliderEditorComponent;
//# sourceMappingURL=image-slider-editor.component.js.map