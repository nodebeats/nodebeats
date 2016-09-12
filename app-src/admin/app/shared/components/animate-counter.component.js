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
var AnimateCounterComponent = (function () {
    function AnimateCounterComponent() {
        this.duration = 2000;
        this.animateValue = 0;
    }
    AnimateCounterComponent.prototype.ngOnChanges = function () {
        if (this.valueToCount)
            this.animate();
    };
    AnimateCounterComponent.prototype.animate = function () {
        var _this = this;
        var end = this.valueToCount;
        var range = end - 0;
        var current = 0;
        var stepTime = Math.abs(Math.floor(this.duration / range));
        var timer = setInterval(function () {
            current += 1;
            _this.animateValue = current;
            if (current == end) {
                clearInterval(timer);
            }
        }, stepTime);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], AnimateCounterComponent.prototype, "valueToCount", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], AnimateCounterComponent.prototype, "duration", void 0);
    AnimateCounterComponent = __decorate([
        core_1.Component({
            selector: 'animate-counter',
            template: '<div class="animate-count huge">{{animateValue}}</div>'
        }), 
        __metadata('design:paramtypes', [])
    ], AnimateCounterComponent);
    return AnimateCounterComponent;
}());
exports.AnimateCounterComponent = AnimateCounterComponent;
//# sourceMappingURL=animate-counter.component.js.map