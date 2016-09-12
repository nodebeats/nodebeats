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
var DROPDOWN_VALUE_ACCESSOR = new core_1.Provider(forms_1.NG_VALUE_ACCESSOR, {
    useExisting: core_1.forwardRef(function () { return Dropdown; }),
    multi: true
});
var Dropdown = (function () {
    function Dropdown(el, domHandler, renderer, differs) {
        this.el = el;
        this.domHandler = domHandler;
        this.renderer = renderer;
        this.onChange = new core_1.EventEmitter();
        this.scrollHeight = '200px';
        this.autoWidth = true;
        this.onModelChange = function () { };
        this.onModelTouched = function () { };
        this.panelVisible = false;
        this.differ = differs.find([]).create(null);
    }
    Dropdown.prototype.ngOnInit = function () {
        var _this = this;
        this.optionsToDisplay = this.options;
        this.documentClickListener = this.renderer.listenGlobal('body', 'click', function () {
            if (!_this.selfClick && !_this.itemClick) {
                _this.panelVisible = false;
            }
            _this.selfClick = false;
            _this.itemClick = false;
        });
        this.updateLabel();
    };
    Dropdown.prototype.ngDoCheck = function () {
        var changes = this.differ.diff(this.options);
        if (changes && this.initialized) {
            this.optionsToDisplay = this.options;
            this.optionsChanged = true;
        }
    };
    Dropdown.prototype.ngAfterViewInit = function () {
        this.container = this.el.nativeElement.children[0];
        this.panel = this.domHandler.findSingle(this.el.nativeElement, 'div.ui-dropdown-panel');
        this.itemsWrapper = this.domHandler.findSingle(this.el.nativeElement, 'div.ui-dropdown-items-wrapper');
        this.highlightValue(true);
        this.updateDimensions();
        this.initialized = true;
    };
    Dropdown.prototype.ngAfterViewChecked = function () {
        if (this.optionsChanged) {
            this.highlightValue();
            this.domHandler.relativePosition(this.panel, this.container);
            this.optionsChanged = false;
        }
    };
    Dropdown.prototype.writeValue = function (value) {
        this.value = value;
        this.updateLabel();
        if (this.initialized && !this.optionsChanged) {
            this.highlightValue();
        }
    };
    Dropdown.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    Dropdown.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    Dropdown.prototype.updateLabel = function () {
        if (this.optionsToDisplay && this.optionsToDisplay.length) {
            var selectedIndex = this.findItemIndex(this.value, this.optionsToDisplay);
            if (selectedIndex == -1)
                this.label = this.optionsToDisplay[0].label;
            else
                this.label = this.optionsToDisplay[selectedIndex].label;
        }
        else {
            this.label = '&nbsp;';
        }
    };
    Dropdown.prototype.highlightValue = function (fallbackToFirst) {
        var items = this.domHandler.find(this.el.nativeElement, '.ui-dropdown-items > li');
        var currentSelectedItem = this.domHandler.findSingle(this.panel, 'li.ui-state-highlight');
        if (currentSelectedItem) {
            this.domHandler.removeClass(currentSelectedItem, 'ui-state-highlight');
        }
        if (this.optionsToDisplay && this.optionsToDisplay.length) {
            var selectedIndex = this.findItemIndex(this.value, this.optionsToDisplay);
            if (selectedIndex == -1 && fallbackToFirst) {
                selectedIndex = 0;
            }
            if (selectedIndex != -1) {
                this.domHandler.addClass(items[selectedIndex], 'ui-state-highlight');
            }
        }
    };
    Dropdown.prototype.updateDimensions = function () {
        if (this.autoWidth) {
            var select = this.domHandler.findSingle(this.el.nativeElement, 'select');
            if (!this.style || (!this.style['width'] && !this.style['min-width'])) {
                this.el.nativeElement.children[0].style.width = select.offsetWidth + 30 + 'px';
            }
        }
    };
    Dropdown.prototype.onMouseenter = function (event) {
        this.hover = true;
    };
    Dropdown.prototype.onMouseleave = function (event) {
        this.hover = false;
    };
    Dropdown.prototype.onMouseclick = function (event, input) {
        if (this.disabled) {
            return;
        }
        this.selfClick = true;
        if (!this.itemClick) {
            input.focus();
            if (this.panelVisible)
                this.hide();
            else {
                this.show(this.panel, this.container);
            }
        }
    };
    Dropdown.prototype.show = function (panel, container) {
        if (this.options && this.options.length) {
            this.panelVisible = true;
            panel.style.zIndex = ++domhandler_1.DomHandler.zindex;
            this.domHandler.relativePosition(panel, container);
            this.domHandler.fadeIn(panel, 250);
        }
    };
    Dropdown.prototype.hide = function () {
        this.panelVisible = false;
    };
    Dropdown.prototype.onFocus = function (event) {
        this.focus = true;
    };
    Dropdown.prototype.onBlur = function (event) {
        this.focus = false;
        this.onModelTouched();
    };
    Dropdown.prototype.onKeydown = function (event) {
        var highlightedItem = this.domHandler.findSingle(this.panel, 'li.ui-state-highlight');
        switch (event.which) {
            //down
            case 40:
                if (!this.panelVisible && event.altKey) {
                    this.show(this.panel, this.container);
                }
                else {
                    if (highlightedItem) {
                        var nextItem = highlightedItem.nextElementSibling;
                        if (nextItem) {
                            this.selectItem(event, nextItem);
                            this.domHandler.scrollInView(this.itemsWrapper, nextItem);
                        }
                    }
                    else {
                        var firstItem = this.domHandler.findSingle(this.panel, 'li:first-child');
                        this.selectItem(event, firstItem);
                    }
                }
                event.preventDefault();
                break;
            //up
            case 38:
                if (highlightedItem) {
                    var prevItem = highlightedItem.previousElementSibling;
                    if (prevItem) {
                        this.selectItem(event, prevItem);
                        this.domHandler.scrollInView(this.itemsWrapper, prevItem);
                    }
                }
                event.preventDefault();
                break;
            //enter
            case 13:
                this.panelVisible = false;
                event.preventDefault();
                break;
            //escape and tab
            case 27:
            case 9:
                this.panelVisible = false;
                break;
        }
    };
    Dropdown.prototype.findListItem = function (element) {
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
    Dropdown.prototype.onListMouseover = function (event) {
        if (this.disabled) {
            return;
        }
        var element = event.target;
        if (element.nodeName != 'UL') {
            var item = this.findListItem(element);
            this.domHandler.addClass(item, 'ui-state-hover');
        }
    };
    Dropdown.prototype.onListMouseout = function (event) {
        if (this.disabled) {
            return;
        }
        var element = event.target;
        if (element.nodeName != 'UL') {
            var item = this.findListItem(element);
            this.domHandler.removeClass(item, 'ui-state-hover');
        }
    };
    Dropdown.prototype.onListClick = function (event) {
        if (this.disabled) {
            return;
        }
        this.itemClick = true;
        var element = event.target;
        if (element.nodeName != 'UL') {
            var item = this.findListItem(element);
            this.selectItem(event, item);
        }
        this.hide();
    };
    Dropdown.prototype.selectItem = function (event, item) {
        var currentSelectedItem = this.domHandler.findSingle(item.parentNode, 'li.ui-state-highlight');
        if (currentSelectedItem != item) {
            if (currentSelectedItem) {
                this.domHandler.removeClass(currentSelectedItem, 'ui-state-highlight');
            }
            this.domHandler.addClass(item, 'ui-state-highlight');
            var selectedOption = this.options[this.findItemIndex(item.dataset.value, this.options)];
            this.label = selectedOption.label;
            this.value = selectedOption.value;
            this.onModelChange(this.value);
            this.onChange.emit({
                originalEvent: event,
                value: this.value
            });
        }
    };
    Dropdown.prototype.findItemIndex = function (val, opts) {
        var index = -1;
        if (opts) {
            if (val !== null && val !== undefined) {
                for (var i = 0; i < opts.length; i++) {
                    if (opts[i].value == val) {
                        index = i;
                        break;
                    }
                }
            }
        }
        return index;
    };
    Dropdown.prototype.onFilter = function (event) {
        if (this.options && this.options.length) {
            var val = event.target.value.toLowerCase();
            this.optionsToDisplay = [];
            for (var i = 0; i < this.options.length; i++) {
                var option = this.options[i];
                if (option.label.toLowerCase().startsWith(val)) {
                    this.optionsToDisplay.push(option);
                }
            }
            this.optionsChanged = true;
        }
    };
    Dropdown.prototype.ngOnDestroy = function () {
        this.documentClickListener();
        this.initialized = false;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], Dropdown.prototype, "options", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Dropdown.prototype, "onChange", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Dropdown.prototype, "scrollHeight", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Dropdown.prototype, "filter", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Dropdown.prototype, "style", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Dropdown.prototype, "styleClass", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Dropdown.prototype, "disabled", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Dropdown.prototype, "autoWidth", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Dropdown.prototype, "required", void 0);
    __decorate([
        core_1.ContentChild(core_1.TemplateRef), 
        __metadata('design:type', core_1.TemplateRef)
    ], Dropdown.prototype, "itemTemplate", void 0);
    Dropdown = __decorate([
        core_1.Component({
            selector: 'p-dropdown',
            template: "\n        <div [ngClass]=\"{'ui-dropdown ui-widget ui-state-default ui-corner-all ui-helper-clearfix':true,'ui-state-hover':hover&&!disabled,'ui-state-focus':focus,'ui-state-disabled':disabled}\" \n            (mouseenter)=\"onMouseenter($event)\" (mouseleave)=\"onMouseleave($event)\" (click)=\"onMouseclick($event,in)\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <div class=\"ui-helper-hidden-accessible\">\n                <select [required]=\"required\" tabindex=\"-1\">\n                    <option *ngFor=\"let option of options\" [value]=\"option.value\" [selected]=\"value == option.value\">{{option.label}}</option>\n                </select>\n            </div>\n            <div class=\"ui-helper-hidden-accessible\">\n                <input #in type=\"text\" readonly (focus)=\"onFocus($event)\" (blur)=\"onBlur($event)\" (keydown)=\"onKeydown($event)\">\n            </div>\n            <label class=\"ui-dropdown-label ui-inputtext ui-corner-all\" [innerHTML]=\"label\"></label>\n            <div class=\"ui-dropdown-trigger ui-state-default ui-corner-right\" [ngClass]=\"{'ui-state-hover':hover&&!disabled,'ui-state-focus':focus}\">\n                <span class=\"fa fa-fw fa-caret-down\"></span>\n            </div>\n            <div class=\"ui-dropdown-panel ui-widget-content ui-corner-all ui-helper-hidden ui-shadow\" \n                [style.display]=\"panelVisible ? 'block' : 'none'\">\n                <div *ngIf=\"filter\" class=\"ui-dropdown-filter-container\" (input)=\"onFilter($event)\" (click)=\"$event.stopPropagation()\">\n                    <input type=\"text\" autocomplete=\"off\" class=\"ui-dropdown-filter ui-inputtext ui-widget ui-state-default ui-corner-all\">\n                    <span class=\"fa fa-search\"></span>\n                </div>\n                <div class=\"ui-dropdown-items-wrapper\" [style.max-height]=\"scrollHeight||'auto'\">\n                    <ul *ngIf=\"!itemTemplate\" class=\"ui-dropdown-items ui-dropdown-list ui-widget-content ui-widget ui-corner-all ui-helper-reset\"\n                        (mouseover)=\"onListMouseover($event)\" (mouseout)=\"onListMouseout($event)\">\n                        <li *ngFor=\"let option of optionsToDisplay;let i=index\" [attr.data-label]=\"option.label\" [attr.data-value]=\"option.value\" (click)=\"onListClick($event)\"\n                            class=\"ui-dropdown-item ui-corner-all\">{{option.label}}</li>\n                    </ul>\n                    <ul *ngIf=\"itemTemplate\" class=\"ui-dropdown-items ui-dropdown-list ui-widget-content ui-widget ui-corner-all ui-helper-reset\"\n                        (mouseover)=\"onListMouseover($event)\" (mouseout)=\"onListMouseout($event)\" (click)=\"onListClick($event)\">\n                        <template ngFor [ngForOf]=\"optionsToDisplay\" [ngForTemplate]=\"itemTemplate\"></template>\n                    </ul>\n                </div>\n            </div>\n        </div>\n    ",
            providers: [domhandler_1.DomHandler, DROPDOWN_VALUE_ACCESSOR]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, domhandler_1.DomHandler, core_1.Renderer, core_1.IterableDiffers])
    ], Dropdown);
    return Dropdown;
}());
exports.Dropdown = Dropdown;
//# sourceMappingURL=dropdown.js.map