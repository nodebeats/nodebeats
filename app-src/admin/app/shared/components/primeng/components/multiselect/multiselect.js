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
var MULTISELECT_VALUE_ACCESSOR = new core_1.Provider(forms_1.NG_VALUE_ACCESSOR, {
    useExisting: core_1.forwardRef(function () { return MultiSelect; }),
    multi: true
});
var MultiSelect = (function () {
    function MultiSelect(el, domHandler, renderer, differs) {
        this.el = el;
        this.domHandler = domHandler;
        this.renderer = renderer;
        this.onChange = new core_1.EventEmitter();
        this.scrollHeight = '200px';
        this.defaultLabel = 'Choose';
        this.onModelChange = function () { };
        this.onModelTouched = function () { };
        this.differ = differs.find([]).create(null);
    }
    MultiSelect.prototype.ngOnInit = function () {
        var _this = this;
        this.updateLabel();
        this.documentClickListener = this.renderer.listenGlobal('body', 'click', function () {
            if (!_this.selfClick && _this.overlayVisible) {
                _this.hide();
            }
            _this.selfClick = false;
            _this.panelClick = false;
        });
    };
    MultiSelect.prototype.ngAfterViewInit = function () {
        this.container = this.el.nativeElement.children[0];
        this.panel = this.domHandler.findSingle(this.el.nativeElement, 'div.ui-multiselect-panel');
        if (this.overlayVisible) {
            this.show();
        }
    };
    MultiSelect.prototype.ngAfterViewChecked = function () {
        if (this.filtered) {
            this.domHandler.relativePosition(this.panel, this.container);
            this.filtered = false;
        }
    };
    MultiSelect.prototype.ngDoCheck = function () {
        var changes = this.differ.diff(this.value);
        if (changes) {
            this.updateLabel();
        }
    };
    MultiSelect.prototype.writeValue = function (value) {
        this.value = value;
    };
    MultiSelect.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    MultiSelect.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    MultiSelect.prototype.onItemClick = function (event, value) {
        var selectionIndex = this.findSelectionIndex(value);
        if (selectionIndex != -1) {
            this.value.splice(selectionIndex, 1);
        }
        else {
            this.value = this.value || [];
            this.value.push(value);
        }
        this.onModelChange(this.value);
        this.onChange.emit({ originalEvent: event, value: this.value });
    };
    MultiSelect.prototype.isSelected = function (value) {
        return this.findSelectionIndex(value) != -1;
    };
    MultiSelect.prototype.findSelectionIndex = function (val) {
        var index = -1;
        if (this.value) {
            for (var i = 0; i < this.value.length; i++) {
                if (this.value[i] == val) {
                    index = i;
                    break;
                }
            }
        }
        return index;
    };
    MultiSelect.prototype.toggleAll = function (event, checkbox) {
        if (checkbox.checked) {
            this.value = [];
        }
        else {
            var opts = this.getVisibleOptions();
            if (opts) {
                this.value = [];
                for (var i = 0; i < opts.length; i++) {
                    this.value.push(opts[i].value);
                }
            }
        }
        checkbox.checked = !checkbox.checked;
        this.onModelChange(this.value);
        this.onChange.emit({ originalEvent: event, value: this.value });
    };
    MultiSelect.prototype.isAllChecked = function () {
        if (this.filterValue && this.filterValue.trim().length)
            return this.value && this.visibleOptions && (this.value.length == this.visibleOptions.length);
        else
            return this.value && this.options && (this.value.length == this.options.length);
    };
    MultiSelect.prototype.show = function () {
        this.overlayVisible = true;
        this.panel.style.zIndex = ++domhandler_1.DomHandler.zindex;
        this.domHandler.relativePosition(this.panel, this.container);
        this.domHandler.fadeIn(this.panel, 250);
    };
    MultiSelect.prototype.hide = function () {
        this.overlayVisible = false;
    };
    MultiSelect.prototype.close = function (event) {
        this.hide();
        event.preventDefault();
    };
    MultiSelect.prototype.onMouseenter = function (event) {
        if (!this.disabled) {
            this.hover = true;
        }
    };
    MultiSelect.prototype.onMouseleave = function (event) {
        this.hover = false;
    };
    MultiSelect.prototype.onMouseclick = function (event, input) {
        if (this.disabled) {
            return;
        }
        if (!this.panelClick) {
            if (this.overlayVisible) {
                this.hide();
            }
            else {
                input.focus();
                this.show();
            }
        }
        this.selfClick = true;
    };
    MultiSelect.prototype.onFocus = function (event) {
        this.focus = true;
    };
    MultiSelect.prototype.onBlur = function (event) {
        this.focus = false;
        this.onModelTouched();
    };
    MultiSelect.prototype.updateLabel = function () {
        if (this.value && this.value.length) {
            var label = '';
            for (var i = 0; i < this.value.length; i++) {
                if (i != 0) {
                    label = label + ',';
                }
                label = label + this.findLabelByValue(this.value[i]);
            }
            this.valuesAsString = label;
        }
        else {
            this.valuesAsString = this.defaultLabel;
        }
    };
    MultiSelect.prototype.findLabelByValue = function (val) {
        var label = null;
        for (var i = 0; i < this.options.length; i++) {
            var option = this.options[i];
            if (option.value == val) {
                label = option.label;
                break;
            }
        }
        return label;
    };
    MultiSelect.prototype.onFilter = function (event) {
        this.filterValue = event.target.value.trim().toLowerCase();
        this.visibleOptions = [];
        for (var i = 0; i < this.options.length; i++) {
            var option = this.options[i];
            if (option.label.toLowerCase().startsWith(this.filterValue.toLowerCase())) {
                this.visibleOptions.push(option);
            }
        }
        this.filtered = true;
    };
    MultiSelect.prototype.isItemVisible = function (option) {
        if (this.filterValue && this.filterValue.trim().length) {
            for (var i = 0; i < this.visibleOptions.length; i++) {
                if (this.visibleOptions[i].value == option.value) {
                    return true;
                }
            }
        }
        else {
            return true;
        }
    };
    MultiSelect.prototype.getVisibleOptions = function () {
        if (this.filterValue && this.filterValue.trim().length) {
            var items = [];
            for (var i = 0; i < this.options.length; i++) {
                var option = this.options[i];
                if (option.label.toLowerCase().startsWith(this.filterValue.toLowerCase())) {
                    items.push(option);
                }
            }
            return items;
        }
        else {
            return this.options;
        }
    };
    MultiSelect.prototype.ngOnDestroy = function () {
        this.documentClickListener();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], MultiSelect.prototype, "options", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], MultiSelect.prototype, "onChange", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], MultiSelect.prototype, "scrollHeight", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], MultiSelect.prototype, "defaultLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], MultiSelect.prototype, "style", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], MultiSelect.prototype, "styleClass", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], MultiSelect.prototype, "disabled", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], MultiSelect.prototype, "overlayVisible", void 0);
    MultiSelect = __decorate([
        core_1.Component({
            selector: 'p-multiSelect',
            template: "\n        <div [ngClass]=\"{'ui-multiselect ui-widget ui-state-default ui-corner-all':true,'ui-state-focus': focus,'ui-state-disabled': disabled}\" [ngStyle]=\"style\" [class]=\"styleClass\"\n            (mouseenter)=\"onMouseenter($event)\" (mouseleave)=\"onMouseleave($event)\" (click)=\"onMouseclick($event,in)\">\n            <div class=\"ui-helper-hidden-accessible\">\n                <input #in type=\"text\" readonly=\"readonly\" (focus)=\"onFocus($event)\" (blur)=\"onBlur($event)\">\n            </div>\n            <div class=\"ui-multiselect-label-container\" [title]=\"valuesAsString\">\n                <label [ngClass]=\"{'ui-multiselect-label ui-corner-all':true,'ui-state-hover':hover,'ui-state-focus':focus}\">{{valuesAsString}}</label>\n            </div>\n            <div [ngClass]=\"{'ui-multiselect-trigger ui-state-default ui-corner-right':true,'ui-state-hover':hover,'ui-state-focus':focus}\">\n                <span class=\"fa fa-fw fa-caret-down\"></span>\n            </div>\n            <div class=\"ui-multiselect-panel ui-widget ui-widget-content ui-corner-all ui-shadow\" [style.display]=\"overlayVisible ? 'block' : 'none'\" (click)=\"panelClick=true\">\n                <div class=\"ui-widget-header ui-corner-all ui-multiselect-header ui-helper-clearfix\">\n                    <div class=\"ui-chkbox ui-widget\">\n                        <div class=\"ui-helper-hidden-accessible\">\n                            <input #cb type=\"checkbox\" readonly=\"readonly\" [checked]=\"isAllChecked()\">\n                        </div>\n                        <div class=\"ui-chkbox-box ui-widget ui-corner-all ui-state-default\" [ngClass]=\"{'ui-state-hover':hoverToggleAll}\"\n                            (mouseenter)=\"hoverToggleAll=true\" (mouseleave)=\"hoverToggleAll=false\" (click)=\"toggleAll($event,cb)\">\n                            <span class=\"ui-chkbox-icon ui-c\" [ngClass]=\"{'fa fa-fw fa-check':isAllChecked()}\"></span>\n                        </div>\n                    </div>\n                    <div class=\"ui-multiselect-filter-container\">\n                        <input type=\"text\" role=\"textbox\" (input)=\"onFilter($event)\"\n                                    class=\"ui-inputtext ui-widget ui-state-default ui-corner-all\">\n                        <span class=\"fa fa-fw fa-search\"></span>\n                    </div>\n                    <a class=\"ui-multiselect-close ui-corner-all\" href=\"#\" (click)=\"close($event)\">\n                        <span class=\"fa fa-close\"></span>\n                    </a>\n                </div>\n                <div class=\"ui-multiselect-items-wrapper\">\n                    <ul class=\"ui-multiselect-items ui-multiselect-list ui-widget-content ui-widget ui-corner-all ui-helper-reset\" [style.max-height]=\"scrollHeight||'auto'\">\n                        <li #item *ngFor=\"let option of options\" class=\"ui-multiselect-item ui-corner-all\" (click)=\"onItemClick($event,option.value)\" \n                            [style.display]=\"isItemVisible(option) ? 'block' : 'none'\"\n                            [ngClass]=\"{'ui-state-highlight':isSelected(option.value),'ui-state-hover':hoveredItem==item}\" (mouseenter)=\"hoveredItem=item\" (mouseleave)=\"hoveredItem=null\">\n                            <div class=\"ui-chkbox ui-widget\">\n                                <div class=\"ui-helper-hidden-accessible\">\n                                    <input type=\"checkbox\" readonly=\"readonly\" [checked]=\"isSelected(option.value)\">\n                                </div>\n                                <div class=\"ui-chkbox-box ui-widget ui-corner-all ui-state-default\" [ngClass]=\"{'ui-state-active':isSelected(option.value)}\">\n                                    <span class=\"ui-chkbox-icon ui-c\" [ngClass]=\"{'fa fa-fw fa-check':isSelected(option.value)}\"></span>\n                                </div>\n                            </div>\n                            <label>{{option.label}}</label>\n                        </li>\n                    </ul>\n                </div>\n            </div>\n        </div>\n    ",
            providers: [domhandler_1.DomHandler, MULTISELECT_VALUE_ACCESSOR]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, domhandler_1.DomHandler, core_1.Renderer, core_1.IterableDiffers])
    ], MultiSelect);
    return MultiSelect;
}());
exports.MultiSelect = MultiSelect;
//# sourceMappingURL=multiselect.js.map