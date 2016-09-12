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
var SELECTBUTTON_VALUE_ACCESSOR = new core_1.Provider(forms_1.NG_VALUE_ACCESSOR, {
    useExisting: core_1.forwardRef(function () { return SelectButton; }),
    multi: true
});
var SelectButton = (function () {
    function SelectButton() {
        this.onChange = new core_1.EventEmitter();
        this.onModelChange = function () { };
        this.onModelTouched = function () { };
    }
    SelectButton.prototype.writeValue = function (value) {
        this.value = value;
    };
    SelectButton.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    SelectButton.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    SelectButton.prototype.onItemClick = function (event, option) {
        if (this.multiple) {
            var itemIndex = this.findItemIndex(option);
            if (itemIndex != -1)
                this.value.splice(itemIndex, 1);
            else
                this.value.push(option.value);
        }
        else {
            this.value = option.value;
        }
        this.onModelChange(this.value);
        this.onChange.emit({
            originalEvent: event,
            value: this.value
        });
    };
    SelectButton.prototype.isSelected = function (option) {
        if (this.multiple)
            return this.findItemIndex(option) != -1;
        else
            return option.value == this.value;
    };
    SelectButton.prototype.findItemIndex = function (option) {
        var index = -1;
        if (this.value) {
            for (var i = 0; i < this.value.length; i++) {
                if (this.value[i] == option.value) {
                    index = i;
                    break;
                }
            }
        }
        return index;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], SelectButton.prototype, "options", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], SelectButton.prototype, "tabindex", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], SelectButton.prototype, "multiple", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SelectButton.prototype, "style", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], SelectButton.prototype, "styleClass", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], SelectButton.prototype, "onChange", void 0);
    SelectButton = __decorate([
        core_1.Component({
            selector: 'p-selectButton',
            template: "\n        <div [ngClass]=\"'ui-selectbutton ui-buttonset ui-widget ui-corner-all ui-buttonset-' + options.length\" (mouseleave)=\"hoveredItem=null\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <div *ngFor=\"let option of options;\" class=\"ui-button ui-widget ui-state-default ui-button-text-only\"\n                [ngClass]=\"{'ui-state-hover': hoveredItem == option,'ui-state-active':isSelected(option)}\"\n                (mouseenter)=\"hoveredItem=option\" (click)=\"onItemClick($event,option)\">\n                <span class=\"ui-button-text ui-c\">{{option.label}}</span>\n            </div>\n        </div>\n    ",
            providers: [SELECTBUTTON_VALUE_ACCESSOR]
        }), 
        __metadata('design:paramtypes', [])
    ], SelectButton);
    return SelectButton;
}());
exports.SelectButton = SelectButton;
//# sourceMappingURL=selectbutton.js.map