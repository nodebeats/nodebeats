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
var RATING_VALUE_ACCESSOR = new core_1.Provider(forms_1.NG_VALUE_ACCESSOR, {
    useExisting: core_1.forwardRef(function () { return Rating; }),
    multi: true
});
var Rating = (function () {
    function Rating() {
        this.stars = 5;
        this.cancel = true;
        this.onRate = new core_1.EventEmitter();
        this.onCancel = new core_1.EventEmitter();
        this.onModelChange = function () { };
        this.onModelTouched = function () { };
    }
    Rating.prototype.ngOnInit = function () {
        this.starsArray = [];
        for (var i = 0; i < this.stars; i++) {
            this.starsArray[i] = i;
        }
    };
    Rating.prototype.rate = function (event, i) {
        if (!this.readonly && !this.disabled) {
            this.value = (i + 1);
            this.onModelChange(this.value);
            this.onModelTouched();
            this.onRate.emit({
                originalEvent: event,
                value: (i + 1)
            });
        }
    };
    Rating.prototype.clear = function (event) {
        if (!this.readonly && !this.disabled) {
            this.value = null;
            this.onModelChange(this.value);
            this.onModelTouched();
            this.onCancel.emit(event);
        }
    };
    Rating.prototype.writeValue = function (value) {
        this.value = value;
    };
    Rating.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    Rating.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Rating.prototype, "disabled", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Rating.prototype, "readonly", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Rating.prototype, "stars", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Rating.prototype, "cancel", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Rating.prototype, "onRate", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Rating.prototype, "onCancel", void 0);
    Rating = __decorate([
        core_1.Component({
            selector: 'p-rating',
            template: "\n        <div class=\"ui-rating\" [ngClass]=\"{'ui-state-disabled': disabled}\">\n            <div class=\"ui-rating-cancel\" *ngIf=\"cancel\" (click)=\"clear($event)\" [ngClass]=\"{'ui-rating-cancel-hover':hoverCancel}\"\n             (mouseenter)=\"hoverCancel=true\" (mouseleave)=\"hoverCancel=false\"><a></a></div>\n            <div class=\"ui-rating-star\" *ngFor=\"let star of starsArray;let i=index\" (click)=\"rate($event,i)\"\n             [ngClass]=\"{'ui-rating-star-on':(i < value)}\"><a></a></div>\n        </div>\n    ",
            providers: [RATING_VALUE_ACCESSOR]
        }), 
        __metadata('design:paramtypes', [])
    ], Rating);
    return Rating;
}());
exports.Rating = Rating;
//# sourceMappingURL=rating.js.map