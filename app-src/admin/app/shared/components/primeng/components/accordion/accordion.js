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
var Accordion = (function () {
    function Accordion(el) {
        this.el = el;
        this.onClose = new core_1.EventEmitter();
        this.onOpen = new core_1.EventEmitter();
        this.tabs = [];
    }
    Accordion.prototype.addTab = function (tab) {
        this.tabs.push(tab);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Accordion.prototype, "multiple", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Accordion.prototype, "onClose", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Accordion.prototype, "onOpen", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Accordion.prototype, "style", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Accordion.prototype, "styleClass", void 0);
    Accordion = __decorate([
        core_1.Component({
            selector: 'p-accordion',
            template: "\n        <div [ngClass]=\"'ui-accordion ui-widget ui-helper-reset'\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <ng-content></ng-content>\n        </div>\n    ",
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], Accordion);
    return Accordion;
}());
exports.Accordion = Accordion;
//# sourceMappingURL=accordion.js.map