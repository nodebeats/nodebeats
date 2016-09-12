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
var forms_1 = require('@angular/forms');
var RADIO_VALUE_ACCESSOR = new core_1.Provider(forms_1.NG_VALUE_ACCESSOR, {
    useExisting: core_1.forwardRef(function () { return RadioButton; }),
    multi: true
});
var RadioButton = (function () {
    function RadioButton() {
        this.click = new core_1.EventEmitter();
        this.onModelChange = function () { };
        this.onModelTouched = function () { };
    }
    RadioButton.prototype.onclick = function () {
        if (!this.disabled) {
            this.click.emit(null);
            this.checked = true;
            this.onModelChange(this.value);
        }
    };
    RadioButton.prototype.onMouseEnter = function () {
        this.hover = true;
    };
    RadioButton.prototype.onMouseLeave = function () {
        this.hover = false;
    };
    RadioButton.prototype.writeValue = function (model) {
        this.model = model;
        this.checked = (this.model == this.value);
    };
    RadioButton.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    RadioButton.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], RadioButton.prototype, "value", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], RadioButton.prototype, "name", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], RadioButton.prototype, "disabled", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], RadioButton.prototype, "click", void 0);
    RadioButton = __decorate([
        core_1.Component({
            selector: 'p-radioButton',
            template: "\n        <div class=\"ui-radiobutton ui-widget\">\n            <div class=\"ui-helper-hidden-accessible\">\n                <input type=\"radio\" [attr.name]=\"name\" [attr.value]=\"value\" [checked]=\"checked\" (blur)=\"onModelTouched()\">\n            </div>\n            <div class=\"ui-radiobutton-box ui-widget ui-radiobutton-relative ui-state-default\" (click)=\"onclick()\"\n                        (mouseenter)=\"onMouseEnter()\" (mouseleave)=\"onMouseLeave()\" [ngClass]=\"{'ui-state-hover':hover&&!disabled,'ui-state-active':checked,'ui-state-disabled':disabled}\">\n                <span class=\"ui-radiobutton-icon\" [ngClass]=\"{'fa fa-fw fa-circle':checked}\"></span>\n            </div>\n        </div>\n    ",
            providers: [RADIO_VALUE_ACCESSOR]
        }), 
        __metadata('design:paramtypes', [])
    ], RadioButton);
    return RadioButton;
}());
exports.RadioButton = RadioButton;
//# sourceMappingURL=radiobutton.js.map