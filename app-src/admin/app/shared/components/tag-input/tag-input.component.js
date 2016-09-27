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
var forms_1 = require('@angular/forms');
// import {isBlank} from '@angular/common/src/facade/lang';
var KEYS = {
    backspace: 8,
    comma: 188,
    enter: 13,
    space: 32
};
var TagInputComponent = (function () {
    function TagInputComponent() {
        this.addOnBlur = true;
        this.addOnComma = true;
        this.addOnEnter = true;
        this.addOnPaste = true;
        this.addOnSpace = false;
        this.allowedTagsPattern = /.+/;
        this.pasteSplitPattern = ',';
        this.placeholder = 'Add a tag';
        this.tagsList = [];
        this.inputValue = '';
        /** Implemented as part of ControlValueAccessor. */
        this.onChange = function () {
        };
        this.onTouched = function () {
        };
    }
    TagInputComponent.prototype.ngOnInit = function () {
        if (this.ngModel) {
            this.tagsList = this.ngModel;
        }
        this.onChange(this.tagsList);
        this.splitRegExp = new RegExp(this.pasteSplitPattern);
    };
    TagInputComponent.prototype.ngOnChanges = function () {
        if (this.ngModel)
            this.tagsList = this.ngModel;
    };
    TagInputComponent.prototype.inputChanged = function (event) {
        console.log(this.tagInputForm.controls);
        var key = event.keyCode;
        switch (key) {
            case KEYS.backspace:
                this._handleBackspace();
                break;
            case KEYS.enter:
                if (this.addOnEnter) {
                    this._addTags([this.inputValue.toLowerCase()]);
                    /*Custom for Nodebeats*/
                    // this._addTags([this.inputValue]);
                    event.preventDefault();
                }
                break;
            case KEYS.comma:
                if (this.addOnComma) {
                    this._addTags([this.inputValue.toLowerCase()]);
                    /*Custom for Nodebeats*/
                    event.preventDefault();
                }
                break;
            case KEYS.space:
                if (this.addOnSpace) {
                    this._addTags([this.inputValue.toLowerCase()]);
                    /*Custom for Nodebeats*/
                    event.preventDefault();
                }
                break;
            default:
                break;
        }
    };
    TagInputComponent.prototype.inputBlurred = function (event) {
        if (this.addOnBlur) {
            this._addTags([this.inputValue.toLowerCase()]);
        }
        this.isFocused = false;
    };
    TagInputComponent.prototype.inputFocused = function (event) {
        this.isFocused = true;
    };
    TagInputComponent.prototype.inputPaste = function (event) {
        var _this = this;
        var clipboardData = event.clipboardData || (event.originalEvent && event.originalEvent.clipboardData);
        var pastedString = clipboardData.getData('text/plain');
        var tags = this._splitString(pastedString);
        var tagsToAdd = tags.filter(function (tag) { return _this._isTagValid(tag); });
        this._addTags(tagsToAdd);
        setTimeout(function () { return _this._resetInput(); });
    };
    TagInputComponent.prototype._splitString = function (tagString) {
        tagString = tagString.trim();
        var tags = tagString.split(this.splitRegExp);
        return tags.filter(function (tag) { return !!tag; });
    };
    TagInputComponent.prototype._isTagValid = function (tagString) {
        /*Custom for Nodebeats*/
        if (this.tagsList.indexOf(tagString.toLowerCase()) == -1)
            return this.allowedTagsPattern.test(tagString.toLowerCase());
        else
            return false;
        // return this.allowedTagsPattern.test(tagString);
    };
    TagInputComponent.prototype._addTags = function (tags) {
        var _this = this;
        var validTags = tags.filter(function (tag) { return _this._isTagValid(tag); });
        this.tagsList = this.tagsList.concat(validTags.map(function (tag) { return tag.trim(); }));
        this._resetSelected();
        this._resetInput();
        this.onChange(this.tagsList);
    };
    TagInputComponent.prototype._removeTag = function (tagIndexToRemove) {
        this.tagsList.splice(tagIndexToRemove, 1);
        this._resetSelected();
        this.onChange(this.tagsList);
    };
    TagInputComponent.prototype._handleBackspace = function () {
        if (!this.inputValue.length && this.tagsList.length) {
            if (this.selectedTag) {
                this._removeTag(this.selectedTag);
            }
            else {
                this.selectedTag = this.tagsList.length - 1;
            }
        }
    };
    TagInputComponent.prototype._resetSelected = function () {
        this.selectedTag = null;
    };
    TagInputComponent.prototype._resetInput = function () {
        this.tagInputForm.controls['tagInputField'].setValue('');
    };
    TagInputComponent.prototype.writeValue = function (value) {
    };
    TagInputComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    TagInputComponent.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], TagInputComponent.prototype, "addOnBlur", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], TagInputComponent.prototype, "addOnComma", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], TagInputComponent.prototype, "addOnEnter", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], TagInputComponent.prototype, "addOnPaste", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], TagInputComponent.prototype, "addOnSpace", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], TagInputComponent.prototype, "autoCompleteData", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', RegExp)
    ], TagInputComponent.prototype, "allowedTagsPattern", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], TagInputComponent.prototype, "ngModel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], TagInputComponent.prototype, "pasteSplitPattern", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], TagInputComponent.prototype, "placeholder", void 0);
    __decorate([
        core_1.HostBinding('class.ng2-tag-input-focus'), 
        __metadata('design:type', Object)
    ], TagInputComponent.prototype, "isFocused", void 0);
    __decorate([
        core_1.ViewChild('tagInputForm'), 
        __metadata('design:type', forms_1.NgForm)
    ], TagInputComponent.prototype, "tagInputForm", void 0);
    TagInputComponent = __decorate([
        core_1.Component({
            selector: 'rl-tag-input',
            template: "<rl-tag-input-item\n    [text]=\"tag\"\n    [index]=\"index\"\n    [selected]=\"selectedTag === index\"\n    (tagRemoved)=\"_removeTag($event)\"\n    *ngFor=\"let tag of tagsList; let index = index\">\n  </rl-tag-input-item>\n  <form #tagInputForm=\"ngForm\" class=\"ng2-tag-input-form\">\n  <input\n    class=\"ng2-tag-input-field\"\n    type=\"text\"\n    [(ngModel)]=\"inputValue\"\n    name=\"tagInputField\"\n    [placeholder]=\"placeholder\"\n    (paste)=\"inputPaste($event)\"\n    (keydown)=\"inputChanged($event)\"\n    (blur)=\"inputBlurred($event)\"\n    (focus)=\"inputFocused()\"\n    [typeahead]=\"autoCompleteData\"\n     >\n  </form>",
            styles: ["\n    :host {\n      display: block;\n      box-shadow: 0 1px #ccc;\n      padding: 5px 0;\n    }\n\n    :host.ng2-tag-input-focus {\n      box-shadow: 0 2px #0d8bff;\n    }\n    \n    .ng2-tag-input-form {\n      display: inline;\n    }\n\n    .ng2-tag-input-field {\n      display: inline-block;\n      width: auto;\n      box-shadow: none;\n      border: 0;\n    }\n  "],
            providers: [
                { provide: forms_1.NG_VALUE_ACCESSOR, useExisting: core_1.forwardRef(function () { return TagInputComponent; }), multi: true },
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], TagInputComponent);
    return TagInputComponent;
}());
exports.TagInputComponent = TagInputComponent;
//# sourceMappingURL=tag-input.component.js.map