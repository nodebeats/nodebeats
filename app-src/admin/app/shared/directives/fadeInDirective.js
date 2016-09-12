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
/**
 * Created by sanedev on 6/19/16.
 */
var core_1 = require('@angular/core');
var FadeInDirective = (function () {
    function FadeInDirective(element) {
        this.element = element;
        this.duration = 500;
        this.collapse = true;
    }
    FadeInDirective.prototype.ngOnInit = function () {
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], FadeInDirective.prototype, "duration", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], FadeInDirective.prototype, "collapse", void 0);
    FadeInDirective = __decorate([
        core_1.Directive({
            selector: '[fadeInDirective]',
            host: {
                '[class.animated]': 'true',
                '[class.fadeIn]': 'true'
            }
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], FadeInDirective);
    return FadeInDirective;
}());
exports.FadeInDirective = FadeInDirective;
//# sourceMappingURL=fadeInDirective.js.map