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
var InputText = (function () {
    function InputText(el) {
        this.el = el;
    }
    InputText.prototype.onMouseover = function (e) {
        this.hover = true;
    };
    InputText.prototype.onMouseout = function (e) {
        this.hover = false;
    };
    InputText.prototype.onFocus = function (e) {
        this.focus = true;
    };
    InputText.prototype.onBlur = function (e) {
        this.focus = false;
    };
    InputText.prototype.isDisabled = function () {
        return this.el.nativeElement.disabled;
    };
    __decorate([
        core_1.HostListener('mouseover', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], InputText.prototype, "onMouseover", null);
    __decorate([
        core_1.HostListener('mouseout', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], InputText.prototype, "onMouseout", null);
    __decorate([
        core_1.HostListener('focus', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], InputText.prototype, "onFocus", null);
    __decorate([
        core_1.HostListener('blur', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], InputText.prototype, "onBlur", null);
    InputText = __decorate([
        core_1.Directive({
            selector: '[pInputText]',
            host: {
                '[class.ui-inputtext]': 'true',
                '[class.ui-corner-all]': 'true',
                '[class.ui-state-default]': 'true',
                '[class.ui-widget]': 'true',
                '[class.ui-state-hover]': 'hover',
                '[class.ui-state-focus]': 'focus',
                '[class.ui-state-disabled]': 'isDisabled()'
            }
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], InputText);
    return InputText;
}());
exports.InputText = InputText;
//# sourceMappingURL=inputtext.js.map