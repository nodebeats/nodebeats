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
var domhandler_1 = require('../dom/domhandler');
var Password = (function () {
    function Password(el, domHandler) {
        this.el = el;
        this.domHandler = domHandler;
        this.promptLabel = 'Please enter a password';
        this.weakLabel = 'Weak';
        this.mediumLabel = 'Medium';
        this.strongLabel = 'Strong';
    }
    Password.prototype.ngAfterViewInit = function () {
        this.panel = document.createElement('div');
        this.panel.className = 'ui-password-panel ui-widget ui-state-highlight ui-corner-all ui-helper-hidden ui-password-panel-overlay';
        this.meter = document.createElement('div');
        this.meter.className = 'ui-password-meter';
        this.info = document.createElement('div');
        this.info.className = 'ui-password-info';
        this.info.textContent = this.promptLabel;
        this.panel.appendChild(this.meter);
        this.panel.appendChild(this.info);
        document.body.appendChild(this.panel);
    };
    Password.prototype.onMouseover = function (e) {
        this.hover = true;
    };
    Password.prototype.onMouseout = function (e) {
        this.hover = false;
    };
    Password.prototype.onFocus = function (e) {
        this.focus = true;
        this.domHandler.removeClass(this.panel, 'ui-helper-hidden');
        this.domHandler.absolutePosition(this.panel, this.el.nativeElement);
        this.domHandler.fadeIn(this.panel, 250);
    };
    Password.prototype.onBlur = function (e) {
        this.focus = false;
        this.domHandler.addClass(this.panel, 'ui-helper-hidden');
    };
    Password.prototype.onKeyup = function (e) {
        var value = e.target.value, label = null, meterPos = null;
        if (value.length === 0) {
            label = this.promptLabel;
            meterPos = '0px 0px';
        }
        else {
            var score = this.testStrength(value);
            if (score < 30) {
                label = this.weakLabel;
                meterPos = '0px -10px';
            }
            else if (score >= 30 && score < 80) {
                label = this.mediumLabel;
                meterPos = '0px -20px';
            }
            else if (score >= 80) {
                label = this.strongLabel;
                meterPos = '0px -30px';
            }
        }
        this.meter.style.backgroundPosition = meterPos;
        this.info.textContent = label;
    };
    Password.prototype.testStrength = function (str) {
        var grade = 0;
        var val;
        val = str.match('[0-9]');
        grade += this.normalize(val ? val.length : 1 / 4, 1) * 25;
        val = str.match('[a-zA-Z]');
        grade += this.normalize(val ? val.length : 1 / 2, 3) * 10;
        val = str.match('[!@#$%^&*?_~.,;=]');
        grade += this.normalize(val ? val.length : 1 / 6, 1) * 35;
        val = str.match('[A-Z]');
        grade += this.normalize(val ? val.length : 1 / 6, 1) * 30;
        grade *= str.length / 8;
        return grade > 100 ? 100 : grade;
    };
    Password.prototype.normalize = function (x, y) {
        var diff = x - y;
        if (diff <= 0)
            return x / y;
        else
            return 1 + 0.5 * (x / (x + y / 4));
    };
    Password.prototype.isDisabled = function () {
        return this.el.nativeElement.disabled;
    };
    Password.prototype.ngOnDestroy = function () {
        this.panel.removeChild(this.meter);
        this.panel.removeChild(this.info);
        document.body.removeChild(this.panel);
        this.panel = null;
        this.meter = null;
        this.info = null;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Password.prototype, "promptLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Password.prototype, "weakLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Password.prototype, "mediumLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Password.prototype, "strongLabel", void 0);
    __decorate([
        core_1.HostListener('mouseover', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], Password.prototype, "onMouseover", null);
    __decorate([
        core_1.HostListener('mouseout', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], Password.prototype, "onMouseout", null);
    __decorate([
        core_1.HostListener('focus', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], Password.prototype, "onFocus", null);
    __decorate([
        core_1.HostListener('blur', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], Password.prototype, "onBlur", null);
    __decorate([
        core_1.HostListener('keyup', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], Password.prototype, "onKeyup", null);
    Password = __decorate([
        core_1.Directive({
            selector: '[pPassword]',
            host: {
                '[class.ui-inputtext]': 'true',
                '[class.ui-corner-all]': 'true',
                '[class.ui-state-default]': 'true',
                '[class.ui-widget]': 'true',
                '[class.ui-state-hover]': 'hover',
                '[class.ui-state-focus]': 'focus',
                '[class.ui-state-disabled]': 'isDisabled()'
            },
            providers: [domhandler_1.DomHandler]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, domhandler_1.DomHandler])
    ], Password);
    return Password;
}());
exports.Password = Password;
//# sourceMappingURL=password.js.map