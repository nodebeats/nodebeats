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
var image_gallery_service_1 = require("./image-gallery.service");
var image_gallery_album_editor_component_1 = require("./image-gallery-album-editor.component");
var image_gallery_album_list_component_1 = require("./image-gallery-album-list.component");
var image_gallery_image_editor_component_1 = require("./image-gallery-image-editor.component");
var image_gallery_image_list_component_1 = require("./image-gallery-image-list.component");
var shared_module_1 = require('../../../shared/shared.module');
var image_gallery_component_1 = require("./image-gallery.component");
var ImageGalleryModule = (function () {
    function ImageGalleryModule() {
    }
    ImageGalleryModule = __decorate([
        core_1.NgModule({
            imports: [shared_module_1.SharedModule],
            declarations: [image_gallery_image_editor_component_1.ImageGalleryImageEditorComponent,
                image_gallery_album_list_component_1.ImageAlbumListComponent,
                image_gallery_album_editor_component_1.ImageAlbumEditorComponent,
                image_gallery_component_1.ImageGalleryComponent,
                image_gallery_image_list_component_1.ImageListComponent],
            providers: [image_gallery_service_1.ImageGalleryService]
        }), 
        __metadata('design:paramtypes', [])
    ], ImageGalleryModule);
    return ImageGalleryModule;
}());
exports.ImageGalleryModule = ImageGalleryModule;
//# sourceMappingURL=image-gallery.module.js.map