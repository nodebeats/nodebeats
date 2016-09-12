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
var Fieldset = (function () {
    function Fieldset() {
        this.collapsed = false;
        this.onBeforeToggle = new core_1.EventEmitter();
        this.onAfterToggle = new core_1.EventEmitter();
    }
    Fieldset.prototype.onLegendMouseenter = function (event) {
        if (this.toggleable) {
            this.hover = true;
        }
    };
    Fieldset.prototype.onLegendMouseleave = function (event) {
        if (this.toggleable) {
            this.hover = false;
        }
    };
    Fieldset.prototype.toggle = function (event) {
        if (this.toggleable) {
            this.onBeforeToggle.emit({ originalEvent: event, collapsed: this.collapsed });
            if (this.collapsed)
                this.expand(event);
            else
                this.collapse(event);
            this.onAfterToggle.emit({ originalEvent: event, collapsed: this.collapsed });
        }
    };
    Fieldset.prototype.expand = function (event) {
        this.collapsed = false;
    };
    Fieldset.prototype.collapse = function (event) {
        this.collapsed = true;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Fieldset.prototype, "legend", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Fieldset.prototype, "toggleable", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Fieldset.prototype, "collapsed", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Fieldset.prototype, "onBeforeToggle", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Fieldset.prototype, "onAfterToggle", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Fieldset.prototype, "style", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Fieldset.prototype, "styleClass", void 0);
    Fieldset = __decorate([
        core_1.Component({
            selector: 'p-fieldset',
            template: "\n        <fieldset [ngClass]=\"{'ui-fieldset ui-widget ui-widget-content ui-corner-all': true, 'ui-fieldset-toggleable': toggleable}\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <legend class=\"ui-fieldset-legend ui-corner-all ui-state-default ui-unselectable-text\" \n                (mouseenter)=\"onLegendMouseenter($event)\" (mouseleave)=\"onLegendMouseleave($event)\" (click)=\"toggle($event)\" [ngClass]=\"{'ui-state-hover':hover}\">\n                <span *ngIf=\"toggleable\" class=\"ui-fieldset-toggler fa fa-w\" [ngClass]=\"{'fa-minus': !collapsed,'fa-plus':collapsed}\"></span>\n                {{legend}}\n            </legend>\n            <div class=\"ui-fieldset-content\" [style.display]=\"collapsed ? 'none' : 'block'\">\n                <ng-content></ng-content>\n            </div>\n        </fieldset>\n    ",
        }), 
        __metadata('design:paramtypes', [])
    ], Fieldset);
    return Fieldset;
}());
exports.Fieldset = Fieldset;
//# sourceMappingURL=fieldset.js.map