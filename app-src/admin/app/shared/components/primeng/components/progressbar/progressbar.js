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
var ProgressBar = (function () {
    function ProgressBar() {
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ProgressBar.prototype, "value", void 0);
    ProgressBar = __decorate([
        core_1.Component({
            selector: 'p-progressBar',
            template: "\n        <div class=\"ui-progressbar ui-widget ui-widget-content ui-corner-all\" role=\"progressbar\" aria-valuemin=\"0\" [attr.aria-valuenow]=\"value\" aria-valuemax=\"100\">\n            <div class=\"ui-progressbar-value ui-progressbar-value-animate ui-widget-header ui-corner-all\" [style.width]=\"value + '%'\" style=\"display:block\"></div>\n            <div class=\"ui-progressbar-label\" [style.display]=\"value ? 'block' : 'none'\">{{value}}%</div>\n        </div>\n    "
        }), 
        __metadata('design:paramtypes', [])
    ], ProgressBar);
    return ProgressBar;
}());
exports.ProgressBar = ProgressBar;
//# sourceMappingURL=progressbar.js.map