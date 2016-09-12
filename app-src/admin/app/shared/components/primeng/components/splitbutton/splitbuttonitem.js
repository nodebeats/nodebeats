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
var SplitButtonItem = (function () {
    function SplitButtonItem() {
        this.onClick = new core_1.EventEmitter();
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], SplitButtonItem.prototype, "icon", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], SplitButtonItem.prototype, "label", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], SplitButtonItem.prototype, "url", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SplitButtonItem.prototype, "routerLink", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], SplitButtonItem.prototype, "onClick", void 0);
    SplitButtonItem = __decorate([
        core_1.Component({
            selector: 'p-splitButtonItem',
            template: "\n        \n    "
        }), 
        __metadata('design:paramtypes', [])
    ], SplitButtonItem);
    return SplitButtonItem;
}());
exports.SplitButtonItem = SplitButtonItem;
//# sourceMappingURL=splitbuttonitem.js.map