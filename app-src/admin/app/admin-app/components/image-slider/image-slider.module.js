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
var image_silder_list_component_1 = require("./image-silder-list.component");
var image_slider_editor_component_1 = require("./image-slider-editor.component");
var image_slider_service_1 = require("./image-slider.service");
var shared_module_1 = require('../../../shared/shared.module');
var ImageSlideModule = (function () {
    function ImageSlideModule() {
    }
    ImageSlideModule = __decorate([
        core_1.NgModule({
            imports: [shared_module_1.SharedModule],
            declarations: [image_slider_editor_component_1.ImageSliderEditorComponent,
                image_silder_list_component_1.ImageSliderComponent],
            providers: [image_slider_service_1.ImageSliderService]
        }), 
        __metadata('design:paramtypes', [])
    ], ImageSlideModule);
    return ImageSlideModule;
}());
exports.ImageSlideModule = ImageSlideModule;
//# sourceMappingURL=image-slider.module.js.map