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
var SLIDER_VALUE_ACCESSOR = new core_1.Provider(forms_1.NG_VALUE_ACCESSOR, {
    useExisting: core_1.forwardRef(function () { return Slider; }),
    multi: true
});
var Slider = (function () {
    function Slider(el) {
        this.el = el;
        this.onChange = new core_1.EventEmitter();
        this.onSlideEnd = new core_1.EventEmitter();
        this.onModelChange = function () { };
        this.onModelTouched = function () { };
        this.initialized = false;
    }
    Slider.prototype.ngAfterViewInit = function () {
        var _this = this;
        jQuery(this.el.nativeElement.children[0]).slider({
            animate: this.animate,
            disabled: this.disabled,
            max: this.max,
            min: this.min,
            orientation: this.orientation,
            range: this.range,
            step: this.step,
            value: this.value,
            values: this.value,
            slide: function (event, ui) {
                if (_this.range) {
                    _this.onModelChange(ui.values);
                    _this.onChange.emit({ originalEvent: event, values: ui.values });
                }
                else {
                    _this.onModelChange(ui.value);
                    _this.onChange.emit({ originalEvent: event, value: ui.value });
                }
            },
            stop: function (event, ui) {
                _this.onSlideEnd.emit({ originalEvent: event, value: ui.value });
            }
        });
        this.initialized = true;
    };
    Slider.prototype.writeValue = function (value) {
        this.value = value;
        if (this.initialized) {
            var optionName = this.range ? 'values' : 'value';
            jQuery(this.el.nativeElement.children[0]).slider('option', optionName, this.value);
        }
    };
    Slider.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    Slider.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    Slider.prototype.ngOnChanges = function (changes) {
        if (this.initialized) {
            for (var key in changes) {
                jQuery(this.el.nativeElement.children[0]).slider('option', key, changes[key].currentValue);
            }
        }
    };
    Slider.prototype.ngOnDestroy = function () {
        jQuery(this.el.nativeElement.children[0]).slider('destroy');
        this.initialized = false;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Slider.prototype, "animate", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Slider.prototype, "disabled", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Slider.prototype, "min", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Slider.prototype, "max", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Slider.prototype, "orientation", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Slider.prototype, "step", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Slider.prototype, "range", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Slider.prototype, "style", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Slider.prototype, "styleClass", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Slider.prototype, "onChange", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Slider.prototype, "onSlideEnd", void 0);
    Slider = __decorate([
        core_1.Component({
            selector: 'p-slider',
            template: "\n        <div [ngStyle]=\"style\" [class]=\"styleClass\"></div>\n    ",
            providers: [SLIDER_VALUE_ACCESSOR]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], Slider);
    return Slider;
}());
exports.Slider = Slider;
//# sourceMappingURL=slider.js.map