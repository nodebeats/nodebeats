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
var forms_1 = require('@angular/forms');
var LISTBOX_VALUE_ACCESSOR = new core_1.Provider(forms_1.NG_VALUE_ACCESSOR, {
    useExisting: core_1.forwardRef(function () { return Listbox; }),
    multi: true
});
var Listbox = (function () {
    function Listbox(el, domHandler, differs) {
        this.el = el;
        this.domHandler = domHandler;
        this.onChange = new core_1.EventEmitter();
        this.onModelChange = function () { };
        this.onModelTouched = function () { };
        this.differ = differs.find([]).create(null);
    }
    Listbox.prototype.writeValue = function (value) {
        this.value = value;
        if (!this.multiple) {
            this.valueChanged = true;
        }
    };
    Listbox.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    Listbox.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    Listbox.prototype.ngDoCheck = function () {
        if (this.multiple) {
            var changes = this.differ.diff(this.value);
            if (changes) {
                this.valueChanged = true;
            }
        }
    };
    Listbox.prototype.ngAfterViewChecked = function () {
        if (this.valueChanged) {
            this.preselect();
            this.valueChanged = false;
        }
    };
    Listbox.prototype.preselect = function () {
        var items = this.domHandler.find(this.el.nativeElement, 'li.ui-listbox-item');
        if (items && items.length) {
            this.unselectAll(items);
            if (this.value) {
                if (this.multiple) {
                    for (var i = 0; i < this.value.length; i++) {
                        for (var j = 0; i < this.options.length; j++) {
                            if (this.options[j].value == this.value[i]) {
                                this.domHandler.addClass(items[j], 'ui-state-highlight');
                                break;
                            }
                        }
                    }
                }
                else {
                    for (var i = 0; i < this.options.length; i++) {
                        if (this.options[i].value == this.value) {
                            this.domHandler.addClass(items[i], 'ui-state-highlight');
                            break;
                        }
                    }
                }
            }
        }
    };
    Listbox.prototype.unselectAll = function (items) {
        var listItems = items || this.domHandler.find(this.el.nativeElement, 'li.ui-listbox-item');
        for (var i = 0; i < listItems.length; i++) {
            this.domHandler.removeClass(listItems[i], 'ui-state-highlight');
        }
    };
    Listbox.prototype.onMouseover = function (event) {
        if (this.disabled) {
            return;
        }
        var element = event.target;
        if (element.nodeName != 'UL') {
            var item = this.findListItem(element);
            this.domHandler.addClass(item, 'ui-state-hover');
        }
    };
    Listbox.prototype.onMouseout = function (event) {
        if (this.disabled) {
            return;
        }
        var element = event.target;
        if (element.nodeName != 'UL') {
            var item = this.findListItem(element);
            this.domHandler.removeClass(item, 'ui-state-hover');
        }
    };
    Listbox.prototype.onClick = function (event) {
        if (this.disabled) {
            return;
        }
        var element = event.target;
        if (element.nodeName != 'UL') {
            var item = this.findListItem(element);
            this.onItemClick(event, item);
        }
    };
    Listbox.prototype.onItemClick = function (event, item) {
        var metaKey = (event.metaKey || event.ctrlKey);
        if (this.domHandler.hasClass(item, 'ui-state-highlight')) {
            if (metaKey)
                this.domHandler.removeClass(item, 'ui-state-highlight');
            else
                this.unselectSiblings(item);
        }
        else {
            if (!metaKey || !this.multiple) {
                this.unselectSiblings(item);
            }
            this.domHandler.removeClass(item, 'ui-state-hover');
            this.domHandler.addClass(item, 'ui-state-highlight');
        }
        //update value
        if (this.multiple) {
            var selectedItems = this.domHandler.find(item.parentNode, 'li.ui-state-highlight');
            var valueArr = [];
            if (selectedItems && selectedItems.length) {
                for (var i = 0; i < selectedItems.length; i++) {
                    var itemIndex = this.domHandler.index(selectedItems[i]);
                    valueArr.push(this.options[itemIndex].value);
                }
            }
            this.value = valueArr;
        }
        else {
            var selectedItem = this.domHandler.findSingle(item.parentNode, 'li.ui-state-highlight');
            if (selectedItem) {
                var selectedIndex = this.domHandler.index(selectedItem);
                this.value = this.options[selectedIndex].value;
            }
            else {
                this.value = null;
            }
        }
        this.onModelChange(this.value);
        this.onChange.emit(event);
    };
    Listbox.prototype.unselectSiblings = function (item) {
        var siblings = this.domHandler.siblings(item);
        for (var i = 0; i < siblings.length; i++) {
            var sibling = siblings[i];
            if (this.domHandler.hasClass(sibling, 'ui-state-highlight')) {
                this.domHandler.removeClass(sibling, 'ui-state-highlight');
            }
        }
    };
    Listbox.prototype.findListItem = function (element) {
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
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], Listbox.prototype, "options", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Listbox.prototype, "multiple", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Listbox.prototype, "style", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Listbox.prototype, "styleClass", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Listbox.prototype, "disabled", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Listbox.prototype, "onChange", void 0);
    __decorate([
        core_1.ContentChild(core_1.TemplateRef), 
        __metadata('design:type', core_1.TemplateRef)
    ], Listbox.prototype, "itemTemplate", void 0);
    Listbox = __decorate([
        core_1.Component({
            selector: 'p-listbox',
            template: "\n        <div [ngClass]=\"{'ui-listbox ui-inputtext ui-widget ui-widget-content ui-corner-all':true,'ui-state-disabled':disabled}\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <ul class=\"ui-listbox-list\" *ngIf=\"!itemTemplate\" (mouseover)=\"onMouseover($event)\" (mouseout)=\"onMouseout($event)\" (click)=\"onClick($event)\">\n                <li *ngFor=\"let option of options\" class=\"ui-listbox-item ui-corner-all\">\n                    {{option.label}}\n                </li>\n            </ul>\n            <ul class=\"ui-listbox-list\" *ngIf=\"itemTemplate\" (mouseover)=\"onMouseover($event)\" (mouseout)=\"onMouseout($event)\" (click)=\"onClick($event)\">\n                <template ngFor [ngForOf]=\"options\" [ngForTemplate]=\"itemTemplate\"></template>\n            </ul>\n        </div>\n    ",
            providers: [domhandler_1.DomHandler, LISTBOX_VALUE_ACCESSOR]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, domhandler_1.DomHandler, core_1.IterableDiffers])
    ], Listbox);
    return Listbox;
}());
exports.Listbox = Listbox;
//# sourceMappingURL=listbox.js.map