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
var inputtext_1 = require('../inputtext/inputtext');
var domhandler_1 = require('../dom/domhandler');
var forms_1 = require('@angular/forms');
var SPINNER_VALUE_ACCESSOR = new core_1.Provider(forms_1.NG_VALUE_ACCESSOR, {
    useExisting: core_1.forwardRef(function () { return Spinner; }),
    multi: true
});
var Spinner = (function () {
    function Spinner(el, domHandler) {
        this.el = el;
        this.domHandler = domHandler;
        this.onChange = new core_1.EventEmitter();
        this.step = 1;
        this.onModelChange = function () { };
        this.onModelTouched = function () { };
    }
    Spinner.prototype.ngAfterViewInit = function () {
        if (Math.floor(this.step) === 0) {
            this.precision = this.step.toString().split(/[,]|[.]/)[1].length;
        }
        this.inputtext = this.domHandler.findSingle(this.el.nativeElement, 'input');
        if ((this.value !== null && this.value !== undefined)) {
            this.inputtext.value = this.value;
        }
    };
    Spinner.prototype.repeat = function (interval, dir, input) {
        var _this = this;
        var i = interval || 500;
        this.clearTimer();
        this.timer = setTimeout(function () {
            _this.repeat(40, dir, input);
        }, i);
        this.spin(dir, input);
    };
    Spinner.prototype.spin = function (dir, inputElement) {
        var step = this.step * dir;
        var currentValue = this.value || 0;
        var newValue = null;
        if (this.precision)
            this.value = parseFloat(this.toFixed(currentValue + step, this.precision));
        else
            this.value = currentValue + step;
        if (this.max !== undefined && this.value.toString().length > this.maxlength) {
            this.value = currentValue;
        }
        if (this.min !== undefined && this.value < this.min) {
            this.value = this.min;
        }
        if (this.max !== undefined && this.value > this.max) {
            this.value = this.max;
        }
        inputElement.value = this.value;
        this.onModelChange(this.value);
    };
    Spinner.prototype.toFixed = function (value, precision) {
        var power = Math.pow(10, precision || 0);
        return String(Math.round(value * power) / power);
    };
    Spinner.prototype.onUpButtonMousedown = function (event, input) {
        if (!this.disabled) {
            input.focus();
            this.activeUp = true;
            this.repeat(null, 1, input);
            event.preventDefault();
        }
    };
    Spinner.prototype.onUpButtonMouseup = function (event) {
        if (!this.disabled) {
            this.activeUp = false;
            this.clearTimer();
        }
    };
    Spinner.prototype.onUpButtonMouseenter = function (event) {
        if (!this.disabled) {
            this.hoverUp = true;
        }
    };
    Spinner.prototype.onUpButtonMouseleave = function (event) {
        if (!this.disabled) {
            this.hoverUp = false;
            this.activeUp = false;
            this.clearTimer();
        }
    };
    Spinner.prototype.onDownButtonMousedown = function (event, input) {
        if (!this.disabled) {
            input.focus();
            this.activeDown = true;
            this.repeat(null, -1, input);
            event.preventDefault();
        }
    };
    Spinner.prototype.onDownButtonMouseup = function (event) {
        if (!this.disabled) {
            this.activeDown = false;
            this.clearTimer();
        }
    };
    Spinner.prototype.onDownButtonMouseenter = function (event) {
        if (!this.disabled) {
            this.hoverDown = true;
        }
    };
    Spinner.prototype.onDownButtonMouseleave = function (event) {
        if (!this.disabled) {
            this.hoverDown = false;
            this.activeDown = false;
            this.clearTimer();
        }
    };
    Spinner.prototype.onInputKeydown = function (event, inputElement) {
        if (event.which == 38) {
            this.spin(1, inputElement);
            event.preventDefault();
        }
        else if (event.which == 40) {
            this.spin(-1, inputElement);
            event.preventDefault();
        }
    };
    Spinner.prototype.onInput = function (event) {
        this.value = this.parseValue(event.target.value);
        this.onModelChange(this.value);
    };
    Spinner.prototype.onBlur = function (inputElement) {
        if (this.value !== undefined && this.value !== null) {
            inputElement.value = this.value;
        }
        this.onModelTouched();
    };
    Spinner.prototype.parseValue = function (val) {
        var value;
        if (val.trim() === '') {
            value = this.min !== undefined ? this.min : null;
        }
        else {
            if (this.precision)
                value = parseFloat(val);
            else
                value = parseInt(val);
            if (!isNaN(value)) {
                if (this.max !== undefined && value > this.max) {
                    value = this.max;
                }
                if (this.min !== undefined && value < this.min) {
                    value = this.min;
                }
            }
            else {
                value = null;
            }
        }
        return value;
    };
    Spinner.prototype.handleChange = function (event) {
        this.onChange.emit(event);
    };
    Spinner.prototype.clearTimer = function () {
        if (this.timer) {
            clearInterval(this.timer);
        }
    };
    Spinner.prototype.writeValue = function (value) {
        this.value = value;
        if (this.inputtext && (this.value !== null && this.value !== undefined)) {
            this.inputtext.value = this.value;
        }
    };
    Spinner.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    Spinner.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Spinner.prototype, "onChange", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Spinner.prototype, "step", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Spinner.prototype, "min", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Spinner.prototype, "max", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Spinner.prototype, "maxlength", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Spinner.prototype, "size", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Spinner.prototype, "disabled", void 0);
    Spinner = __decorate([
        core_1.Component({
            selector: 'p-spinner',
            template: "\n        <span class=\"ui-spinner ui-widget ui-corner-all\">\n            <input #in pInputText type=\"text\" class=\"ui-spinner-input\"\n            [attr.size]=\"size\" [attr.maxlength]=\"maxlength\" [attr.readonly]=\"readonly\" [attr.disabled]=\"disabled\"\n            (keydown)=\"onInputKeydown($event,in)\" (input)=\"onInput($event)\" (blur)=\"onBlur(in)\" (change)=\"handleChange($event)\">\n            <a class=\"ui-spinner-button ui-spinner-up ui-corner-tr ui-button ui-widget ui-state-default ui-button-text-only\"\n                [ngClass]=\"{'ui-state-hover':hoverUp,'ui-state-active':activeUp,'ui-state-disabled':disabled}\"\n                (mouseenter)=\"onUpButtonMouseenter($event)\" (mouseleave)=\"onUpButtonMouseleave($event)\" (mousedown)=\"onUpButtonMousedown($event,in)\" (mouseup)=\"onUpButtonMouseup($event)\">\n                <span class=\"ui-button-text\">\n                    <span class=\"fa fa-fw fa-caret-up\"></span>\n                </span>\n            </a>\n            <a class=\"ui-spinner-button ui-spinner-down ui-corner-br ui-button ui-widget ui-state-default ui-button-text-only\"\n                [ngClass]=\"{'ui-state-hover':hoverDown,'ui-state-active':activeDown,'ui-state-disabled':disabled}\"\n                (mouseenter)=\"onDownButtonMouseenter($event)\" (mouseleave)=\"onDownButtonMouseleave($event)\" (mousedown)=\"onDownButtonMousedown($event,in)\" (mouseup)=\"onDownButtonMouseup($event)\">\n                <span class=\"ui-button-text\">\n                    <span class=\"fa fa-fw fa-caret-down\"></span>\n                </span>\n            </a>\n        </span>\n    ",
            directives: [inputtext_1.InputText],
            providers: [domhandler_1.DomHandler, SPINNER_VALUE_ACCESSOR]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, domhandler_1.DomHandler])
    ], Spinner);
    return Spinner;
}());
exports.Spinner = Spinner;
//# sourceMappingURL=spinner.js.map