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
var Droppable = (function () {
    function Droppable(el, domHandler) {
        this.el = el;
        this.domHandler = domHandler;
        this.onDragEnter = new core_1.EventEmitter();
        this.onDragLeave = new core_1.EventEmitter();
        this.onDrop = new core_1.EventEmitter();
        this.onDragOver = new core_1.EventEmitter();
    }
    Droppable.prototype.drop = function (event) {
        event.preventDefault();
        this.onDrop.emit(event);
    };
    Droppable.prototype.dragEnter = function (event) {
        event.preventDefault();
        if (this.dropEffect) {
            event.dataTransfer.dropEffect = this.dropEffect;
        }
        this.onDragEnter.emit(event);
    };
    Droppable.prototype.dragLeave = function (event) {
        event.preventDefault();
        this.onDragLeave.emit(event);
    };
    Droppable.prototype.dragOver = function (event) {
        if (this.allowDrop(event)) {
            event.preventDefault();
            this.onDragOver.emit(event);
        }
    };
    Droppable.prototype.allowDrop = function (event) {
        var allow = false;
        var types = event.dataTransfer.types;
        if (types && types.length) {
            for (var i = 0; i < types.length; i++) {
                if (types[i] == this.scope) {
                    allow = true;
                    break;
                }
            }
        }
        return allow;
    };
    __decorate([
        core_1.Input('pDroppable'), 
        __metadata('design:type', String)
    ], Droppable.prototype, "scope", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Droppable.prototype, "dropEffect", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Droppable.prototype, "onDragEnter", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Droppable.prototype, "onDragLeave", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Droppable.prototype, "onDrop", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Droppable.prototype, "onDragOver", void 0);
    __decorate([
        core_1.HostListener('drop', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], Droppable.prototype, "drop", null);
    __decorate([
        core_1.HostListener('dragenter', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], Droppable.prototype, "dragEnter", null);
    __decorate([
        core_1.HostListener('dragleave', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], Droppable.prototype, "dragLeave", null);
    __decorate([
        core_1.HostListener('dragover', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], Droppable.prototype, "dragOver", null);
    Droppable = __decorate([
        core_1.Directive({
            selector: '[pDroppable]',
            providers: [domhandler_1.DomHandler]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, domhandler_1.DomHandler])
    ], Droppable);
    return Droppable;
}());
exports.Droppable = Droppable;
//# sourceMappingURL=droppable.js.map