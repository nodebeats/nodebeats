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
var image_slider_service_1 = require("./image-slider.service");
var image_slider_model_1 = require("./image-slider.model");
var ImageSliderComponent = (function () {
    function ImageSliderComponent(_objService) {
        this._objService = _objService;
        this.showForm = false;
    }
    ImageSliderComponent.prototype.ngOnInit = function () {
        this.getImageSliderList();
    };
    ImageSliderComponent.prototype.getImageSliderList = function () {
        var _this = this;
        this._objService.getImageSliderList()
            .subscribe(function (objRes) { return _this.bindList(objRes); }, function (error) { return _this.errorMessage(error); });
    };
    ImageSliderComponent.prototype.errorMessage = function (objResponse) {
        jQuery.jAlert({
            'title': 'Alert',
            'content': objResponse.message,
            'theme': 'red'
        });
    };
    ImageSliderComponent.prototype.bindList = function (objRes) {
        this.objListResponse = objRes;
        if (objRes.length > 0) {
            setTimeout(function () {
                jQuery('.tablesorter').tablesorter({
                    headers: {
                        2: { sorter: false },
                        3: { sorter: false }
                    }
                });
            }, 50);
        }
    };
    ImageSliderComponent.prototype.edit = function (id) {
        this.showForm = true;
        this.sliderId = id;
    };
    ImageSliderComponent.prototype.addImage = function () {
        this.showForm = true;
        this.sliderId = null;
    };
    ImageSliderComponent.prototype.delete = function (id) {
        var _this = this;
        jQuery.jAlert({
            'type': 'confirm',
            'title': 'Alert',
            'confirmQuestion': 'Are you sure to delete the Image ?',
            'theme': 'red',
            'onConfirm': function (e, btn) {
                e.preventDefault();
                var objSlider = new image_slider_model_1.ImageSliderModel();
                objSlider._id = id;
                objSlider.deleted = true;
                _this._objService.deleteImageSlider(objSlider)
                    .subscribe(function (res) {
                    _this.getImageSliderList();
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
    ImageSliderComponent.prototype.showSliderList = function (arg) {
        if (!arg)
            this.getImageSliderList();
        this.showForm = false;
    };
    ImageSliderComponent = __decorate([
        core_1.Component({
            selector: 'image-slider-list',
            templateUrl: 'admin-templates/image-slider/image-slider-list.html'
        }), 
        __metadata('design:paramtypes', [image_slider_service_1.ImageSliderService])
    ], ImageSliderComponent);
    return ImageSliderComponent;
}());
exports.ImageSliderComponent = ImageSliderComponent;
//# sourceMappingURL=image-silder-list.component.js.map