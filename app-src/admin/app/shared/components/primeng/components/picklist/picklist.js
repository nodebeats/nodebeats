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
var button_1 = require('../button/button');
var domhandler_1 = require('../dom/domhandler');
var PickList = (function () {
    function PickList(el, domHandler) {
        this.el = el;
        this.domHandler = domHandler;
    }
    PickList.prototype.onMouseover = function (event) {
        var element = event.target;
        if (element.nodeName != 'UL') {
            var item = this.findListItem(element);
            this.domHandler.addClass(item, 'ui-state-hover');
        }
    };
    PickList.prototype.onMouseout = function (event) {
        var element = event.target;
        if (element.nodeName != 'UL') {
            var item = this.findListItem(element);
            this.domHandler.removeClass(item, 'ui-state-hover');
        }
    };
    PickList.prototype.onClick = function (event) {
        var element = event.target;
        if (element.nodeName != 'UL') {
            var item = this.findListItem(element);
            this.onItemClick(event, item);
        }
    };
    PickList.prototype.findListItem = function (element) {
        if (element.nodeName == 'LI') {
            return element;
        }
        else {
            var parent_1 = element.parentElement;
            while (parent_1.nodeName != 'LI') {
                parent_1 = parent_1.parentElement;
            }
            return parent_1;
        }
    };
    PickList.prototype.onItemClick = function (event, item) {
        var metaKey = (event.metaKey || event.ctrlKey);
        if (this.domHandler.hasClass(item, 'ui-state-highlight')) {
            if (metaKey) {
                this.domHandler.removeClass(item, 'ui-state-highlight');
            }
        }
        else {
            if (!metaKey) {
                var siblings = this.domHandler.siblings(item);
                for (var i = 0; i < siblings.length; i++) {
                    var sibling = siblings[i];
                    if (this.domHandler.hasClass(sibling, 'ui-state-highlight')) {
                        this.domHandler.removeClass(sibling, 'ui-state-highlight');
                    }
                }
            }
            this.domHandler.removeClass(item, 'ui-state-hover');
            this.domHandler.addClass(item, 'ui-state-highlight');
        }
    };
    PickList.prototype.moveUp = function (listElement, list) {
        var selectedElements = this.getSelectedListElements(listElement);
        for (var i = 0; i < selectedElements.length; i++) {
            var selectedElement = selectedElements[i];
            var selectedElementIndex = this.domHandler.index(selectedElement);
            if (selectedElementIndex != 0) {
                var movedItem = list[selectedElementIndex];
                var temp = list[selectedElementIndex - 1];
                list[selectedElementIndex - 1] = movedItem;
                list[selectedElementIndex] = temp;
                this.domHandler.scrollInView(listElement, this.getListElements(listElement)[selectedElementIndex - 1]);
            }
            else {
                break;
            }
        }
    };
    PickList.prototype.moveTop = function (listElement, list) {
        var selectedElements = this.getSelectedListElements(listElement);
        for (var i = 0; i < selectedElements.length; i++) {
            var selectedElement = selectedElements[i];
            var selectedElementIndex = this.domHandler.index(selectedElement);
            if (selectedElementIndex != 0) {
                var movedItem = list.splice(selectedElementIndex, 1)[0];
                list.unshift(movedItem);
                listElement.scrollTop = 0;
            }
            else {
                break;
            }
        }
    };
    PickList.prototype.moveDown = function (listElement, list) {
        var selectedElements = this.getSelectedListElements(listElement);
        for (var i = selectedElements.length - 1; i >= 0; i--) {
            var selectedElement = selectedElements[i];
            var selectedElementIndex = this.domHandler.index(selectedElement);
            if (selectedElementIndex != (list.length - 1)) {
                var movedItem = list[selectedElementIndex];
                var temp = list[selectedElementIndex + 1];
                list[selectedElementIndex + 1] = movedItem;
                list[selectedElementIndex] = temp;
                this.domHandler.scrollInView(listElement, this.getListElements(listElement)[selectedElementIndex + 1]);
            }
            else {
                break;
            }
        }
    };
    PickList.prototype.moveBottom = function (listElement, list) {
        var selectedElements = this.getSelectedListElements(listElement);
        for (var i = selectedElements.length - 1; i >= 0; i--) {
            var selectedElement = selectedElements[i];
            var selectedElementIndex = this.domHandler.index(selectedElement);
            if (selectedElementIndex != (list.length - 1)) {
                var movedItem = list.splice(selectedElementIndex, 1)[0];
                list.push(movedItem);
                listElement.scrollTop = listElement.scrollHeight;
            }
            else {
                break;
            }
        }
    };
    PickList.prototype.moveRight = function (sourceListElement) {
        var selectedElements = this.getSelectedListElements(sourceListElement);
        var i = selectedElements.length;
        while (i--) {
            this.target.push(this.source.splice(this.domHandler.index(selectedElements[i]), 1)[0]);
        }
    };
    PickList.prototype.moveAllRight = function () {
        for (var i = 0; i < this.source.length; i++) {
            this.target.push(this.source[i]);
        }
        this.source.splice(0, this.source.length);
    };
    PickList.prototype.moveLeft = function (targetListElement) {
        var selectedElements = this.getSelectedListElements(targetListElement);
        var i = selectedElements.length;
        while (i--) {
            this.source.push(this.target.splice(this.domHandler.index(selectedElements[i]), 1)[0]);
        }
    };
    PickList.prototype.moveAllLeft = function () {
        for (var i = 0; i < this.target.length; i++) {
            this.source.push(this.target[i]);
        }
        this.target.splice(0, this.target.length);
    };
    PickList.prototype.getListElements = function (listElement) {
        return listElement.children;
    };
    PickList.prototype.getSelectedListElements = function (listElement) {
        return this.domHandler.find(listElement, 'li.ui-state-highlight');
    };
    PickList.prototype.ngOnDestroy = function () {
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], PickList.prototype, "source", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], PickList.prototype, "target", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], PickList.prototype, "sourceHeader", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], PickList.prototype, "targetHeader", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], PickList.prototype, "responsive", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PickList.prototype, "style", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], PickList.prototype, "styleClass", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PickList.prototype, "sourceStyle", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PickList.prototype, "targetStyle", void 0);
    __decorate([
        core_1.ContentChild(core_1.TemplateRef), 
        __metadata('design:type', core_1.TemplateRef)
    ], PickList.prototype, "itemTemplate", void 0);
    PickList = __decorate([
        core_1.Component({
            selector: 'p-pickList',
            template: "\n        <div [class]=\"styleClass\" [ngStyle]=\"style\" [ngClass]=\"{'ui-picklist ui-widget ui-helper-clearfix': true, 'ui-picklist-responsive': responsive}\">\n            <div class=\"ui-picklist-source-controls ui-picklist-buttons\">\n                <div class=\"ui-picklist-buttons-cell\">\n                    <button type=\"button\" pButton icon=\"fa-angle-up\" (click)=\"moveUp(sourcelist,source)\"></button>\n                    <button type=\"button\" pButton icon=\"fa-angle-double-up\" (click)=\"moveTop(sourcelist,source)\"></button>\n                    <button type=\"button\" pButton icon=\"fa-angle-down\" (click)=\"moveDown(sourcelist,source)\"></button>\n                    <button type=\"button\" pButton icon=\"fa-angle-double-down\" (click)=\"moveBottom(sourcelist,source)\"></button>\n                </div>\n            </div>\n            <div class=\"ui-picklist-listwrapper ui-picklist-source-wrapper\">\n                <div class=\"ui-picklist-caption ui-widget-header ui-corner-tl ui-corner-tr\" *ngIf=\"sourceHeader\">{{sourceHeader}}</div>\n                <ul #sourcelist class=\"ui-widget-content ui-picklist-list ui-picklist-source ui-corner-bottom\" [ngStyle]=\"sourceStyle\"\n                    (mouseover)=\"onMouseover($event)\" (mouseout)=\"onMouseout($event)\" (click)=\"onClick($event)\">\n                    <template ngFor [ngForOf]=\"source\" [ngForTemplate]=\"itemTemplate\"></template>\n                </ul>\n            </div>\n            <div class=\"ui-picklist-buttons\">\n                <div class=\"ui-picklist-buttons-cell\">\n                    <button type=\"button\" pButton icon=\"fa-angle-right\" (click)=\"moveRight(sourcelist)\"></button>\n                    <button type=\"button\" pButton icon=\"fa-angle-double-right\" (click)=\"moveAllRight(sourcelist)\"></button>\n                    <button type=\"button\" pButton icon=\"fa-angle-left\" (click)=\"moveLeft(targetlist)\"></button>\n                    <button type=\"button\" pButton icon=\"fa-angle-double-left\" (click)=\"moveAllLeft(targetlist)\"></button>\n                </div>\n            </div>\n            <div class=\"ui-picklist-listwrapper ui-picklist-target-wrapper\">\n                <div class=\"ui-picklist-caption ui-widget-header ui-corner-tl ui-corner-tr\" *ngIf=\"targetHeader\">{{targetHeader}}</div>\n                <ul #targetlist class=\"ui-widget-content ui-picklist-list ui-picklist-source ui-corner-bottom\" [ngStyle]=\"targetStyle\"\n                    (mouseover)=\"onMouseover($event)\" (mouseout)=\"onMouseout($event)\" (click)=\"onClick($event)\">\n                    <template ngFor [ngForOf]=\"target\" [ngForTemplate]=\"itemTemplate\"></template>\n                </ul>\n            </div>\n            <div class=\"ui-picklist-target-controls ui-picklist-buttons\">\n                <div class=\"ui-picklist-buttons-cell\">\n                    <button type=\"button\" pButton icon=\"fa-angle-up\" (click)=\"moveUp(targetlist,target)\"></button>\n                    <button type=\"button\" pButton icon=\"fa-angle-double-up\" (click)=\"moveTop(targetlist,target)\"></button>\n                    <button type=\"button\" pButton icon=\"fa-angle-down\" (click)=\"moveDown(targetlist,target)\"></button>\n                    <button type=\"button\" pButton icon=\"fa-angle-double-down\" (click)=\"moveBottom(targetlist,target)\"></button>\n                </div>\n            </div>\n        </div>\n    ",
            directives: [button_1.Button],
            providers: [domhandler_1.DomHandler]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, domhandler_1.DomHandler])
    ], PickList);
    return PickList;
}());
exports.PickList = PickList;
//# sourceMappingURL=picklist.js.map