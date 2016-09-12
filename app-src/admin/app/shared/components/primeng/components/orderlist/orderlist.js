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
var OrderList = (function () {
    function OrderList(el, domHandler) {
        this.el = el;
        this.domHandler = domHandler;
        this.onReorder = new core_1.EventEmitter();
    }
    OrderList.prototype.onMouseover = function (event) {
        var element = event.target;
        if (element.nodeName != 'UL') {
            var item = this.findListItem(element);
            this.domHandler.addClass(item, 'ui-state-hover');
        }
    };
    OrderList.prototype.onMouseout = function (event) {
        var element = event.target;
        if (element.nodeName != 'UL') {
            var item = this.findListItem(element);
            this.domHandler.removeClass(item, 'ui-state-hover');
        }
    };
    OrderList.prototype.onClick = function (event) {
        var element = event.target;
        if (element.nodeName != 'UL') {
            var item = this.findListItem(element);
            this.onItemClick(event, item);
        }
    };
    OrderList.prototype.findListItem = function (element) {
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
    OrderList.prototype.onItemClick = function (event, item) {
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
    OrderList.prototype.moveUp = function (event, listElement) {
        var selectedElements = this.getSelectedListElements(listElement);
        if (selectedElements.length) {
            for (var i = 0; i < selectedElements.length; i++) {
                var selectedElement = selectedElements[i];
                var selectedElementIndex = this.domHandler.index(selectedElement);
                if (selectedElementIndex != 0) {
                    var movedItem = this.value[selectedElementIndex];
                    var temp = this.value[selectedElementIndex - 1];
                    this.value[selectedElementIndex - 1] = movedItem;
                    this.value[selectedElementIndex] = temp;
                    this.domHandler.scrollInView(listElement, listElement.children[selectedElementIndex - 1]);
                }
                else {
                    break;
                }
            }
            this.onReorder.emit(event);
        }
    };
    OrderList.prototype.moveTop = function (event, listElement) {
        var selectedElements = this.getSelectedListElements(listElement);
        if (selectedElements.length) {
            for (var i = 0; i < selectedElements.length; i++) {
                var selectedElement = selectedElements[i];
                var selectedElementIndex = this.domHandler.index(selectedElement);
                if (selectedElementIndex != 0) {
                    var movedItem = this.value.splice(selectedElementIndex, 1)[0];
                    this.value.unshift(movedItem);
                    listElement.scrollTop = 0;
                }
                else {
                    break;
                }
            }
            this.onReorder.emit(event);
        }
    };
    OrderList.prototype.moveDown = function (event, listElement) {
        var selectedElements = this.getSelectedListElements(listElement);
        if (selectedElements.length) {
            for (var i = selectedElements.length - 1; i >= 0; i--) {
                var selectedElement = selectedElements[i];
                var selectedElementIndex = this.domHandler.index(selectedElement);
                if (selectedElementIndex != (this.value.length - 1)) {
                    var movedItem = this.value[selectedElementIndex];
                    var temp = this.value[selectedElementIndex + 1];
                    this.value[selectedElementIndex + 1] = movedItem;
                    this.value[selectedElementIndex] = temp;
                    this.domHandler.scrollInView(listElement, listElement.children[selectedElementIndex + 1]);
                }
                else {
                    break;
                }
            }
            this.onReorder.emit(event);
        }
    };
    OrderList.prototype.moveBottom = function (event, listElement) {
        var selectedElements = this.getSelectedListElements(listElement);
        if (selectedElements.length) {
            for (var i = selectedElements.length - 1; i >= 0; i--) {
                var selectedElement = selectedElements[i];
                var selectedElementIndex = this.domHandler.index(selectedElement);
                if (selectedElementIndex != (this.value.length - 1)) {
                    var movedItem = this.value.splice(selectedElementIndex, 1)[0];
                    this.value.push(movedItem);
                    listElement.scrollTop = listElement.scrollHeight;
                }
                else {
                    break;
                }
            }
            this.onReorder.emit(event);
        }
    };
    OrderList.prototype.getSelectedListElements = function (listElement) {
        return this.domHandler.find(listElement, 'li.ui-state-highlight');
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], OrderList.prototype, "value", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], OrderList.prototype, "header", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], OrderList.prototype, "style", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], OrderList.prototype, "styleClass", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], OrderList.prototype, "listStyle", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], OrderList.prototype, "responsive", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], OrderList.prototype, "onReorder", void 0);
    __decorate([
        core_1.ContentChild(core_1.TemplateRef), 
        __metadata('design:type', core_1.TemplateRef)
    ], OrderList.prototype, "itemTemplate", void 0);
    OrderList = __decorate([
        core_1.Component({
            selector: 'p-orderList',
            template: "\n        <div [ngClass]=\"{'ui-orderlist ui-grid ui-widget':true,'ui-grid-responsive':responsive}\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <div class=\"ui-grid-row\">\n                <div class=\"ui-orderlist-controls ui-grid-col-2\">\n                    <button type=\"button\" pButton icon=\"fa-angle-up\" (click)=\"moveUp($event,listelement)\"></button>\n                    <button type=\"button\" pButton icon=\"fa-angle-double-up\" (click)=\"moveTop($event,listelement)\"></button>\n                    <button type=\"button\" pButton icon=\"fa-angle-down\" (click)=\"moveDown($event,listelement)\"></button>\n                    <button type=\"button\" pButton icon=\"fa-angle-double-down\" (click)=\"moveBottom($event,listelement)\"></button>\n                </div>\n                <div class=\"ui-grid-col-10\">\n                    <div class=\"ui-orderlist-caption ui-widget-header ui-corner-top\" *ngIf=\"header\">{{header}}</div>\n                    <ul #listelement class=\"ui-widget-content ui-orderlist-list ui-corner-bottom\" [ngStyle]=\"listStyle\" \n                        (mouseover)=\"onMouseover($event)\" (mouseout)=\"onMouseout($event)\" (click)=\"onClick($event)\">\n                        <template ngFor [ngForOf]=\"value\" [ngForTemplate]=\"itemTemplate\"></template>\n                    </ul>\n                </div>\n            </div>\n        </div>\n    ",
            directives: [button_1.Button],
            providers: [domhandler_1.DomHandler]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, domhandler_1.DomHandler])
    ], OrderList);
    return OrderList;
}());
exports.OrderList = OrderList;
//# sourceMappingURL=orderlist.js.map