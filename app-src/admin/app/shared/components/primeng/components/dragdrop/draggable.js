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
var Draggable = (function () {
    function Draggable(el, domHandler) {
        this.el = el;
        this.domHandler = domHandler;
        this.onDragStart = new core_1.EventEmitter();
        this.onDragEnd = new core_1.EventEmitter();
        this.onDrag = new core_1.EventEmitter();
    }
    Draggable.prototype.dragStart = function (event) {
        if (this.allowDrag()) {
            if (this.dragEffect) {
                event.dataTransfer.effectAllowed = this.dragEffect;
            }
            event.dataTransfer.setData(this.scope, this.scope);
            this.onDragStart.emit(event);
        }
        else {
            event.preventDefault();
        }
    };
    Draggable.prototype.drag = function (event) {
        this.onDrag.emit(event);
    };
    Draggable.prototype.dragEnd = function (event) {
        this.onDragEnd.emit(event);
    };
    Draggable.prototype.mouseover = function (event) {
        this.handle = event.target;
    };
    Draggable.prototype.mouseleave = function (event) {
        this.handle = null;
    };
    Draggable.prototype.allowDrag = function () {
        if (this.dragHandle && this.handle)
            return this.domHandler.matches(this.handle, this.dragHandle);
        else
            return true;
    };
    __decorate([
        core_1.Input('pDraggable'), 
        __metadata('design:type', String)
    ], Draggable.prototype, "scope", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Draggable.prototype, "dragEffect", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Draggable.prototype, "dragHandle", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Draggable.prototype, "onDragStart", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Draggable.prototype, "onDragEnd", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Draggable.prototype, "onDrag", void 0);
    __decorate([
        core_1.HostListener('dragstart', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], Draggable.prototype, "dragStart", null);
    __decorate([
        core_1.HostListener('drag', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], Draggable.prototype, "drag", null);
    __decorate([
        core_1.HostListener('dragend', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], Draggable.prototype, "dragEnd", null);
    __decorate([
        core_1.HostListener('mouseover', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], Draggable.prototype, "mouseover", null);
    __decorate([
        core_1.HostListener('mouseleave', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], Draggable.prototype, "mouseleave", null);
    Draggable = __decorate([
        core_1.Directive({
            selector: '[pDraggable]',
            host: {
                '[draggable]': 'true'
            },
            providers: [domhandler_1.DomHandler]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, domhandler_1.DomHandler])
    ], Draggable);
    return Draggable;
}());
exports.Draggable = Draggable;
//# sourceMappingURL=draggable.js.map