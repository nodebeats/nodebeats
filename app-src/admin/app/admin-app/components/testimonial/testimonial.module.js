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
var testimonial_service_1 = require("./testimonial.service");
var testimonial_editor_component_1 = require("./testimonial-editor.component");
var testimonial_list_component_1 = require("./testimonial-list.component");
var shared_module_1 = require('../../../shared/shared.module');
var TestimonialModule = (function () {
    function TestimonialModule() {
    }
    TestimonialModule = __decorate([
        core_1.NgModule({
            imports: [shared_module_1.SharedModule],
            declarations: [testimonial_list_component_1.TestimonialComponent, testimonial_editor_component_1.TestimonialEditorComponent],
            providers: [testimonial_service_1.TestimonialService]
        }), 
        __metadata('design:paramtypes', [])
    ], TestimonialModule);
    return TestimonialModule;
}());
exports.TestimonialModule = TestimonialModule;
//# sourceMappingURL=testimonial.module.js.map