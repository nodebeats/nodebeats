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
var common_1 = require('../common');
var domhandler_1 = require('../dom/domhandler');
var forms_1 = require('@angular/forms');
var EDITOR_VALUE_ACCESSOR = new core_1.Provider(forms_1.NG_VALUE_ACCESSOR, {
    useExisting: core_1.forwardRef(function () { return Editor; }),
    multi: true
});
var Editor = (function () {
    function Editor(el, domHandler) {
        this.el = el;
        this.domHandler = domHandler;
        this.onTextChange = new core_1.EventEmitter();
        this.onSelectionChange = new core_1.EventEmitter();
        this.onModelChange = function () { };
        this.onModelTouched = function () { };
    }
    Editor.prototype.ngAfterViewInit = function () {
        var _this = this;
        var editorElement = this.domHandler.findSingle(this.el.nativeElement, 'div.ui-editor-content');
        var toolbarElement = this.domHandler.findSingle(this.el.nativeElement, 'div.ui-editor-toolbar');
        this.quill = new Quill(editorElement, {
            modules: {
                toolbar: toolbarElement
            },
            placeholder: this.placeholder,
            readOnly: this.readOnly,
            theme: 'snow'
        });
        if (this.value) {
            this.quill.pasteHTML(this.value);
        }
        this.quill.on('text-change', function (delta, source) {
            _this.selfChange = true;
            var html = editorElement.children[0].innerHTML;
            var text = _this.quill.getText();
            if (html == '<p><br></p>') {
                html = null;
            }
            _this.onTextChange.emit({
                htmlValue: html,
                textValue: text,
                delta: delta,
                source: source
            });
            _this.onModelChange(html);
        });
        this.quill.on('selection-change', function (range, oldRange, source) {
            _this.onSelectionChange.emit({
                range: range,
                oldRange: oldRange,
                source: source
            });
        });
    };
    Editor.prototype.writeValue = function (value) {
        this.value = value;
        if (this.quill) {
            if (this.selfChange) {
                this.selfChange = false;
            }
            else {
                if (value)
                    this.quill.pasteHTML(value);
                else
                    this.quill.setText('');
            }
        }
    };
    Editor.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    Editor.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Editor.prototype, "onTextChange", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Editor.prototype, "onSelectionChange", void 0);
    __decorate([
        core_1.ContentChild(common_1.Header), 
        __metadata('design:type', Object)
    ], Editor.prototype, "toolbar", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Editor.prototype, "style", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Editor.prototype, "styleClass", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Editor.prototype, "placeholder", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Editor.prototype, "readOnly", void 0);
    Editor = __decorate([
        core_1.Component({
            selector: 'p-editor',
            template: "\n        <div [ngClass]=\"'ui-widget ui-editor-container ui-corner-all'\" [class]=\"styleClass\">\n            <div class=\"ui-editor-toolbar ui-widget-header ui-corner-top\" *ngIf=\"toolbar\">\n                <ng-content select=\"header\"></ng-content>\n            </div>\n            <div class=\"ui-editor-toolbar ui-widget-header ui-corner-top\" *ngIf=\"!toolbar\">\n                <span class=\"ql-formats\">\n                    <select class=\"ql-header\">\n                      <option value=\"1\">Heading</option>\n                      <option value=\"2\">Subheading</option>\n                      <option selected>Normal</option>\n                    </select>\n                    <select class=\"ql-font\">\n                      <option selected>Sans Serif</option>\n                      <option value=\"serif\">Serif</option>\n                      <option value=\"monospace\">Monospace</option>\n                    </select>\n                </span>\n                <span class=\"ql-formats\">\n                    <button class=\"ql-bold\"></button>\n                    <button class=\"ql-italic\"></button>\n                    <button class=\"ql-underline\"></button>\n                </span>\n                <span class=\"ql-formats\">\n                    <select class=\"ql-color\"></select>\n                    <select class=\"ql-background\"></select>\n                </span>\n                <span class=\"ql-formats\">\n                    <button class=\"ql-list\" value=\"ordered\"></button>\n                    <button class=\"ql-list\" value=\"bullet\"></button>\n                    <select class=\"ql-align\">\n                        <option selected></option>\n                        <option value=\"center\"></option>\n                        <option value=\"right\"></option>\n                        <option value=\"justify\"></option>\n                    </select>\n                </span>\n                <span class=\"ql-formats\">\n                    <button class=\"ql-link\"></button>\n                    <button class=\"ql-image\"></button>\n                    <button class=\"ql-code-block\"></button>\n                </span>\n                <span class=\"ql-formats\">\n                    <button class=\"ql-clean\"></button>\n                </span>\n            </div>\n            <div class=\"ui-editor-content\" [ngStyle]=\"style\"></div>\n        </div>\n    ",
            directives: [common_1.Header],
            providers: [domhandler_1.DomHandler, EDITOR_VALUE_ACCESSOR]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, domhandler_1.DomHandler])
    ], Editor);
    return Editor;
}());
exports.Editor = Editor;
//# sourceMappingURL=editor.js.map