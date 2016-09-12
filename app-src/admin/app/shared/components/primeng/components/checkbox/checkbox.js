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
var CHECKBOX_VALUE_ACCESSOR = new core_1.Provider(forms_1.NG_VALUE_ACCESSOR, {
    useExisting: core_1.forwardRef(function () { return Checkbox; }),
    multi: true
});
var Checkbox = (function () {
    function Checkbox() {
        this.onChange = new core_1.EventEmitter();
        this.onModelChange = function () { };
        this.onModelTouched = function () { };
        this.focused = false;
        this.checked = false;
    }
    Checkbox.prototype.onClick = function (event, checkbox, focus) {
        event.preventDefault();
        if (this.disabled) {
            return;
        }
        this.checked = !this.checked;
        if (this.name) {
            if (this.checked)
                this.addValue(this.value);
            else
                this.removeValue(this.value);
            this.onModelChange(this.model);
        }
        else {
            this.onModelChange(this.checked);
        }
        this.onChange.emit(this.checked);
        if (focus) {
            checkbox.focus();
        }
    };
    Checkbox.prototype.isChecked = function () {
        if (this.name)
            return this.findValueIndex(this.value) !== -1;
        else
            return this.model;
    };
    Checkbox.prototype.removeValue = function (value) {
        var index = this.findValueIndex(value);
        if (index >= 0) {
            this.model.splice(index, 1);
        }
    };
    Checkbox.prototype.addValue = function (value) {
        this.model.push(value);
    };
    Checkbox.prototype.onFocus = function (event) {
        this.focused = true;
    };
    Checkbox.prototype.onBlur = function (event) {
        this.focused = false;
        this.onModelTouched();
    };
    Checkbox.prototype.findValueIndex = function (value) {
        var index = -1;
        if (this.model) {
            for (var i = 0; i < this.model.length; i++) {
                if (this.model[i] == value) {
                    index = i;
                    break;
                }
            }
        }
        return index;
    };
    Checkbox.prototype.writeValue = function (model) {
        this.model = model;
        this.checked = this.isChecked();
    };
    Checkbox.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    Checkbox.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Checkbox.prototype, "value", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Checkbox.prototype, "name", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Checkbox.prototype, "disabled", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Checkbox.prototype, "onChange", void 0);
    Checkbox = __decorate([
        core_1.Component({
            selector: 'p-checkbox',
            template: "\n        <div class=\"ui-chkbox ui-widget\">\n            <div class=\"ui-helper-hidden-accessible\">\n                <input #cb type=\"checkbox\" name=\"{{name}}\" value=\"{{value}}\" [checked]=\"checked\" (focus)=\"onFocus($event)\" (blur)=\"onBlur($event)\"\n                [ngClass]=\"{'ui-state-focus':focused}\" (keydown.space)=\"onClick($event,cb,false)\">\n            </div>\n            <div class=\"ui-chkbox-box ui-widget ui-corner-all ui-state-default\" (click)=\"onClick($event,cb,true)\"\n                        (mouseover)=\"hover=true\" (mouseout)=\"hover=false\" \n                        [ngClass]=\"{'ui-state-hover':hover&&!disabled,'ui-state-active':checked,'ui-state-disabled':disabled,'ui-state-focus':focused}\">\n                <span class=\"ui-chkbox-icon ui-c\" [ngClass]=\"{'fa fa-fw fa-check':checked}\"></span>\n            </div>\n        </div>\n    ",
            providers: [CHECKBOX_VALUE_ACCESSOR]
        }), 
        __metadata('design:paramtypes', [])
    ], Checkbox);
    return Checkbox;
}());
exports.Checkbox = Checkbox;
//# sourceMappingURL=checkbox.js.map