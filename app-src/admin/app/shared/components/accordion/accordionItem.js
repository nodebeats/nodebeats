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
var common_1 = require('@angular/common');
// import {Collapse} from '../../directives/collapse/collapse';
var accordion_1 = require('./accordion');
var AccordionItem = (function () {
    function AccordionItem(accordion, eleRef) {
        this.eleRef = eleRef;
        this.disabled = false;
        this.divHeight = "0px";
        this._open = false;
        this.openChange = new core_1.EventEmitter();
        this.accordion = accordion;
    }
    Object.defineProperty(AccordionItem.prototype, "open", {
        get: function () {
            return this._open;
        },
        set: function (value) {
            this._open = value;
            if (value) {
                this.accordion.closeOtherItems(this);
            }
        },
        enumerable: true,
        configurable: true
    });
    AccordionItem.prototype.ngOnInit = function () {
        this.accordion.addItem(this);
    };
    AccordionItem.prototype.ngOnDestroy = function () {
        this.accordion.removeItem(this);
    };
    AccordionItem.prototype.toggleOpen = function (event) {
        event.preventDefault();
        if (!this.disabled) {
            this.open = !this.open;
            this.divHeight = this.open ? this.eleRef.nativeElement.querySelector('.fuel-ui-collapse').scrollHeight + 'px' : '0';
            this.openChange.emit(this.open);
        }
    };
    AccordionItem.prototype.expand = function () {
        this.stateExpression = 'expanded';
    };
    AccordionItem.prototype.collapse = function () {
        this.stateExpression = 'collapsed';
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], AccordionItem.prototype, "heading", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], AccordionItem.prototype, "disabled", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], AccordionItem.prototype, "open", null);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], AccordionItem.prototype, "openChange", void 0);
    AccordionItem = __decorate([
        core_1.Component({
            selector: 'accordion-item, [accordion-item]',
            directives: [common_1.NgClass],
            template: "<div (click)=\"toggleOpen($event)\">\n                 <span *ngIf=\"heading\" class=\"fuel-ui-clickable\" [ngClass]=\"{'text-muted': disabled}\">{{heading}}</span>\n                      <ng-content select=\"accordion-heading\"></ng-content>\n                         <ng-content select=\"[accordion-heading]\"></ng-content>\n                </div>\n                    <div class=\"fuel-ui-collapse\"  [style.height]='divHeight'>\n                        <ng-content></ng-content>\n                    </div>",
            styles: ["\n    \t\t\t\t\t.fuel-ui-collapse {\n              \toverflow-y: hidden;\n              \ttransition: height 1s ease;\n              }\n    \t\t\t\t"]
        }), 
        __metadata('design:paramtypes', [accordion_1.Accordion, core_1.ElementRef])
    ], AccordionItem);
    return AccordionItem;
}());
exports.AccordionItem = AccordionItem;
exports.ACCORDION_PROVIDERS = [
    accordion_1.Accordion,
    AccordionItem
];
//# sourceMappingURL=accordionItem.js.map