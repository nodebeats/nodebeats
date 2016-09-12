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
var accordion_1 = require('./accordion');
var common_1 = require('../common');
var AccordionTab = (function () {
    function AccordionTab(accordion) {
        this.accordion = accordion;
        this.accordion.addTab(this);
    }
    AccordionTab.prototype.toggle = function (event) {
        if (this.disabled) {
            event.preventDefault();
            return;
        }
        var index = this.findTabIndex();
        if (this.selected) {
            this.selected = !this.selected;
            this.accordion.onClose.emit({ originalEvent: event, index: index });
        }
        else {
            if (!this.accordion.multiple) {
                for (var i = 0; i < this.accordion.tabs.length; i++) {
                    this.accordion.tabs[i].selected = false;
                }
            }
            this.selected = true;
            this.accordion.onOpen.emit({ originalEvent: event, index: index });
        }
        event.preventDefault();
    };
    AccordionTab.prototype.findTabIndex = function () {
        var index = -1;
        for (var i = 0; i < this.accordion.tabs.length; i++) {
            if (this.accordion.tabs[i] == this) {
                index = i;
                break;
            }
        }
        return index;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], AccordionTab.prototype, "header", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], AccordionTab.prototype, "selected", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], AccordionTab.prototype, "disabled", void 0);
    __decorate([
        core_1.ContentChild(common_1.Header), 
        __metadata('design:type', Object)
    ], AccordionTab.prototype, "headerFacet", void 0);
    AccordionTab = __decorate([
        core_1.Component({
            selector: 'p-accordionTab',
            template: "\n        <div class=\"ui-accordion-header ui-helper-reset ui-state-default\" [ngClass]=\"{'ui-state-active': selected,'ui-state-hover':hover&&!disabled,'ui-state-disabled':disabled}\"\n            (click)=\"toggle($event)\" (mouseenter)=\"hover = true\" (mouseleave)=\"hover=false\">\n            <span class=\"fa fa-fw\" [ngClass]=\"{'fa-caret-down': selected, 'fa-caret-right': !selected}\"></span>\n            <a href=\"#\" *ngIf=\"!headerFacet\">{{header}}</a>\n            <a href=\"#\" *ngIf=\"headerFacet\">\n                <ng-content select=\"header\"></ng-content>\n            </a>\n        </div>\n        <div class=\"ui-accordion-content ui-helper-reset ui-widget-content\" [style.display]=\"selected ? 'block' : 'none'\">\n            <ng-content></ng-content>\n        </div>\n    "
        }), 
        __metadata('design:paramtypes', [accordion_1.Accordion])
    ], AccordionTab);
    return AccordionTab;
}());
exports.AccordionTab = AccordionTab;
//# sourceMappingURL=accordiontab.js.map