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
var inputtext_1 = require('../inputtext/inputtext');
var button_1 = require('../button/button');
var domhandler_1 = require('../dom/domhandler');
var forms_1 = require('@angular/forms');
var AUTOCOMPLETE_VALUE_ACCESSOR = new core_1.Provider(forms_1.NG_VALUE_ACCESSOR, {
    useExisting: core_1.forwardRef(function () { return AutoComplete; }),
    multi: true
});
var AutoComplete = (function () {
    function AutoComplete(el, domHandler, differs, renderer) {
        this.el = el;
        this.domHandler = domHandler;
        this.renderer = renderer;
        this.minLength = 3;
        this.delay = 300;
        this.completeMethod = new core_1.EventEmitter();
        this.onSelect = new core_1.EventEmitter();
        this.onUnselect = new core_1.EventEmitter();
        this.onDropdownClick = new core_1.EventEmitter();
        this.scrollHeight = '200px';
        this.onModelChange = function () { };
        this.onModelTouched = function () { };
        this.panelVisible = false;
        this.differ = differs.find([]).create(null);
    }
    AutoComplete.prototype.ngDoCheck = function () {
        var changes = this.differ.diff(this.suggestions);
        if (changes && this.panel) {
            if (this.suggestions && this.suggestions.length) {
                this.show();
                this.suggestionsUpdated = true;
            }
            else {
                this.hide();
            }
        }
    };
    AutoComplete.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.input = this.domHandler.findSingle(this.el.nativeElement, 'input');
        this.panel = this.domHandler.findSingle(this.el.nativeElement, 'div.ui-autocomplete-panel');
        if (this.multiple) {
            this.multipleContainer = this.domHandler.findSingle(this.el.nativeElement, 'ul.ui-autocomplete-multiple');
        }
        this.documentClickListener = this.renderer.listenGlobal('body', 'click', function () {
            _this.hide();
        });
    };
    AutoComplete.prototype.ngAfterViewChecked = function () {
        if (this.suggestionsUpdated) {
            this.align();
            this.suggestionsUpdated = false;
        }
    };
    AutoComplete.prototype.writeValue = function (value) {
        this.value = value;
    };
    AutoComplete.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    AutoComplete.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    AutoComplete.prototype.onInput = function (event) {
        var _this = this;
        var value = event.target.value;
        if (!this.multiple) {
            this.value = value;
            this.onModelChange(value);
        }
        if (value.length === 0) {
            this.hide();
        }
        if (value.length >= this.minLength) {
            //Cancel the search request if user types within the timeout
            if (this.timeout) {
                clearTimeout(this.timeout);
            }
            this.timeout = setTimeout(function () {
                _this.search(event, value);
            }, this.delay);
        }
        else {
            this.suggestions = null;
        }
    };
    AutoComplete.prototype.search = function (event, query) {
        //allow empty string but not undefined or null
        if (query === undefined || query === null) {
            return;
        }
        this.completeMethod.emit({
            originalEvent: event,
            query: query
        });
    };
    AutoComplete.prototype.onItemMouseover = function (event) {
        if (this.disabled) {
            return;
        }
        var element = event.target;
        if (element.nodeName != 'UL') {
            var item = this.findListItem(element);
            this.domHandler.addClass(item, 'ui-state-highlight');
        }
    };
    AutoComplete.prototype.onItemMouseout = function (event) {
        if (this.disabled) {
            return;
        }
        var element = event.target;
        if (element.nodeName != 'UL') {
            var item = this.findListItem(element);
            this.domHandler.removeClass(item, 'ui-state-highlight');
        }
    };
    AutoComplete.prototype.onItemClick = function (event) {
        var element = event.target;
        if (element.nodeName != 'UL') {
            var item = this.findListItem(element);
            this.selectItem(item);
        }
    };
    AutoComplete.prototype.selectItem = function (item) {
        var itemIndex = this.domHandler.index(item);
        var selectedValue = this.suggestions[itemIndex];
        if (this.multiple) {
            this.input.value = '';
            this.value = this.value || [];
            if (!this.isSelected(selectedValue)) {
                this.value.push(selectedValue);
                this.onModelChange(this.value);
            }
        }
        else {
            this.input.value = this.field ? this.resolveFieldData(selectedValue) : selectedValue;
            this.value = selectedValue;
            this.onModelChange(this.value);
        }
        this.onSelect.emit(selectedValue);
        this.input.focus();
    };
    AutoComplete.prototype.findListItem = function (element) {
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
    AutoComplete.prototype.show = function () {
        if (!this.panelVisible) {
            this.panelVisible = true;
            this.panel.style.zIndex = ++domhandler_1.DomHandler.zindex;
            this.domHandler.fadeIn(this.panel, 200);
        }
    };
    AutoComplete.prototype.align = function () {
        if (this.multiple)
            this.domHandler.relativePosition(this.panel, this.multipleContainer);
        else
            this.domHandler.relativePosition(this.panel, this.input);
    };
    AutoComplete.prototype.hide = function () {
        this.panelVisible = false;
    };
    AutoComplete.prototype.handleDropdownClick = function (event) {
        this.onDropdownClick.emit({
            originalEvent: event,
            query: this.input.value
        });
    };
    AutoComplete.prototype.removeItem = function (item) {
        var itemIndex = this.domHandler.index(item);
        var removedValue = this.value.splice(itemIndex, 1)[0];
        this.onUnselect.emit(removedValue);
        this.onModelChange(this.value);
    };
    AutoComplete.prototype.resolveFieldData = function (data) {
        if (data && this.field) {
            if (this.field.indexOf('.') == -1) {
                return data[this.field];
            }
            else {
                var fields = this.field.split('.');
                var value = data;
                for (var i = 0, len = fields.length; i < len; ++i) {
                    value = value[fields[i]];
                }
                return value;
            }
        }
        else {
            return null;
        }
    };
    AutoComplete.prototype.onKeydown = function (event) {
        if (this.panelVisible) {
            var highlightedItem = this.domHandler.findSingle(this.panel, 'li.ui-state-highlight');
            switch (event.which) {
                //down
                case 40:
                    if (highlightedItem) {
                        var nextItem = highlightedItem.nextElementSibling;
                        if (nextItem) {
                            this.domHandler.removeClass(highlightedItem, 'ui-state-highlight');
                            this.domHandler.addClass(nextItem, 'ui-state-highlight');
                            this.domHandler.scrollInView(this.panel, nextItem);
                        }
                    }
                    else {
                        var firstItem = this.domHandler.findSingle(this.panel, 'li:first-child');
                        this.domHandler.addClass(firstItem, 'ui-state-highlight');
                    }
                    event.preventDefault();
                    break;
                //up
                case 38:
                    if (highlightedItem) {
                        var prevItem = highlightedItem.previousElementSibling;
                        if (prevItem) {
                            this.domHandler.removeClass(highlightedItem, 'ui-state-highlight');
                            this.domHandler.addClass(prevItem, 'ui-state-highlight');
                            this.domHandler.scrollInView(this.panel, prevItem);
                        }
                    }
                    event.preventDefault();
                    break;
                //enter
                case 13:
                    if (highlightedItem) {
                        this.selectItem(highlightedItem);
                        this.hide();
                    }
                    event.preventDefault();
                    break;
                //escape
                case 27:
                    this.hide();
                    event.preventDefault();
                    break;
                //tab
                case 9:
                    if (highlightedItem) {
                        this.selectItem(highlightedItem);
                    }
                    this.hide();
                    break;
            }
        }
        if (this.multiple) {
            switch (event.which) {
                //backspace
                case 8:
                    if (this.value && this.value.length && !this.input.value) {
                        var removedValue = this.value.pop();
                        this.onUnselect.emit(removedValue);
                        this.onModelChange(this.value);
                    }
                    break;
            }
        }
    };
    AutoComplete.prototype.isSelected = function (val) {
        var selected = false;
        if (this.value && this.value.length) {
            for (var i = 0; i < this.value.length; i++) {
                if (this.domHandler.equals(this.value[i], val)) {
                    selected = true;
                    break;
                }
            }
        }
        return selected;
    };
    AutoComplete.prototype.ngOnDestroy = function () {
        if (this.documentClickListener) {
            this.documentClickListener();
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], AutoComplete.prototype, "minLength", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], AutoComplete.prototype, "delay", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AutoComplete.prototype, "style", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], AutoComplete.prototype, "styleClass", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AutoComplete.prototype, "inputStyle", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], AutoComplete.prototype, "inputStyleClass", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], AutoComplete.prototype, "placeholder", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], AutoComplete.prototype, "readonly", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], AutoComplete.prototype, "disabled", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], AutoComplete.prototype, "maxlength", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], AutoComplete.prototype, "size", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], AutoComplete.prototype, "suggestions", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], AutoComplete.prototype, "completeMethod", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], AutoComplete.prototype, "onSelect", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], AutoComplete.prototype, "onUnselect", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], AutoComplete.prototype, "onDropdownClick", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], AutoComplete.prototype, "field", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], AutoComplete.prototype, "scrollHeight", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], AutoComplete.prototype, "dropdown", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], AutoComplete.prototype, "multiple", void 0);
    __decorate([
        core_1.ContentChild(core_1.TemplateRef), 
        __metadata('design:type', core_1.TemplateRef)
    ], AutoComplete.prototype, "itemTemplate", void 0);
    AutoComplete = __decorate([
        core_1.Component({
            selector: 'p-autoComplete',
            template: "\n        <span [ngClass]=\"{'ui-autocomplete ui-widget':true,'ui-autocomplete-dd':dropdown}\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <input *ngIf=\"!multiple\" #in pInputText type=\"text\" [ngStyle]=\"inputStyle\" [class]=\"inputStyleClass\" \n            [value]=\"value ? (field ? resolveFieldData(value)||value : value) : null\" (input)=\"onInput($event)\" (keydown)=\"onKeydown($event)\" (blur)=\"onModelTouched()\"\n            [attr.placeholder]=\"placeholder\" [attr.size]=\"size\" [attr.maxlength]=\"maxlength\" [attr.readonly]=\"readonly\" [disabled]=\"disabled\" \n            ><ul *ngIf=\"multiple\" class=\"ui-autocomplete-multiple ui-widget ui-inputtext ui-state-default ui-corner-all\" (click)=\"multiIn.focus()\">\n                <li #token *ngFor=\"let val of value\" class=\"ui-autocomplete-token ui-state-highlight ui-corner-all\">\n                    <span class=\"ui-autocomplete-token-icon fa fa-fw fa-close\" (click)=\"removeItem(token)\"></span>\n                    <span class=\"ui-autocomplete-token-label\">{{field ? val[field] : val}}</span>\n                </li>\n                <li class=\"ui-autocomplete-input-token\">\n                    <input #multiIn type=\"text\" pInputText (input)=\"onInput($event)\" (keydown)=\"onKeydown($event)\" (blur)=\"onModelTouched()\">\n                </li>\n            </ul\n            ><button type=\"button\" pButton icon=\"fa-fw fa-caret-down\" class=\"ui-autocomplete-dropdown\" [disabled]=\"disabled\"\n                (click)=\"handleDropdownClick($event)\" *ngIf=\"dropdown\"></button>\n            <div class=\"ui-autocomplete-panel ui-widget-content ui-corner-all ui-shadow\" [style.display]=\"panelVisible ? 'block' : 'none'\" [style.width]=\"'100%'\" [style.max-height]=\"scrollHeight\">\n                <ul class=\"ui-autocomplete-items ui-autocomplete-list ui-widget-content ui-widget ui-corner-all ui-helper-reset\" \n                    (mouseover)=\"onItemMouseover($event)\" (mouseout)=\"onItemMouseout($event)\" (click)=\"onItemClick($event)\" *ngIf=\"!itemTemplate\">\n                    <li class=\"ui-autocomplete-list-item ui-corner-all\" *ngFor=\"let item of suggestions\">{{field ? item[field] : item}}</li>\n                </ul>\n                <ul class=\"ui-autocomplete-items ui-autocomplete-list ui-widget-content ui-widget ui-corner-all ui-helper-reset\" \n                    (mouseover)=\"onItemMouseover($event)\" (mouseout)=\"onItemMouseout($event)\" (click)=\"onItemClick($event)\"*ngIf=\"itemTemplate\">\n                    <template ngFor [ngForOf]=\"suggestions\" [ngForTemplate]=\"itemTemplate\"></template>\n                </ul>\n            </div>\n        </span>\n    ",
            directives: [inputtext_1.InputText, button_1.Button],
            providers: [domhandler_1.DomHandler, AUTOCOMPLETE_VALUE_ACCESSOR]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, domhandler_1.DomHandler, core_1.IterableDiffers, core_1.Renderer])
    ], AutoComplete);
    return AutoComplete;
}());
exports.AutoComplete = AutoComplete;
//# sourceMappingURL=autocomplete.js.map