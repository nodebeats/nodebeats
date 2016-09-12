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
var env_config_1 = require("../configs/env.config");
var ProcessingDirective = (function () {
    function ProcessingDirective(element) {
        this.element = element;
        this.isSubmitted = false;
        this.isProccessing = false;
    }
    ProcessingDirective.prototype.ngOnInit = function () {
        this.detectAjax();
    };
    ProcessingDirective.prototype.ngOnChanges = function () {
        if (this.isSubmitted)
            this.detectAjax();
    };
    ProcessingDirective.prototype.detectAjax = function () {
        var origOpen = XMLHttpRequest.prototype.open;
        var that = this;
        var cacheButtonContent = this.element.nativeElement.textContent;
        XMLHttpRequest.prototype.open = function (method, url, async) {
            if (url.indexOf(env_config_1.HOST_URL + '/api') != -1) {
                that.element.nativeElement.textContent = "Processing...";
                that.element.nativeElement.disabled = true;
                that.isProccessing = true;
            }
            this.addEventListener('load', function () {
                setTimeout(function () {
                    that.element.nativeElement.textContent = cacheButtonContent;
                    that.element.nativeElement.disabled = false;
                    that.isProccessing = false;
                }, 1000);
            });
            origOpen.apply(this, arguments);
        };
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], ProcessingDirective.prototype, "isSubmitted", void 0);
    ProcessingDirective = __decorate([
        core_1.Directive({
            selector: '[processing]',
            host: {
                '[class.processing]': 'isProccessing'
            }
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], ProcessingDirective);
    return ProcessingDirective;
}());
exports.ProcessingDirective = ProcessingDirective;
//# sourceMappingURL=processing.directive.js.map