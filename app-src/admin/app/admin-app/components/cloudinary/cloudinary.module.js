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
var cloudinary_service_1 = require("./cloudinary.service");
var cloudinary_component_1 = require("./cloudinary.component");
var shared_module_1 = require('../../../shared/shared.module');
var CloudinaryModule = (function () {
    function CloudinaryModule() {
    }
    CloudinaryModule = __decorate([
        core_1.NgModule({
            imports: [shared_module_1.SharedModule],
            declarations: [cloudinary_component_1.CloudinarySettingComponent],
            providers: [cloudinary_service_1.CloudinaryService]
        }), 
        __metadata('design:paramtypes', [])
    ], CloudinaryModule);
    return CloudinaryModule;
}());
exports.CloudinaryModule = CloudinaryModule;
//# sourceMappingURL=cloudinary.module.js.map