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
var forms_1 = require("@angular/forms");
var CKEditor = (function () {
    function CKEditor(_elm) {
        this.valueChange = new core_1.EventEmitter();
        this.isChanged = false;
    }
    CKEditor.prototype.ngOnInit = function () {
        //  (<FormControl>this._formDir.form.find('ckFormControl')).updateValue(this.value);
        // this.areaValue = typeof this.value != "undefined" ? this.value : "";
        var that = this;
        CKEDITOR.replace("editor1");
        for (var i in CKEDITOR.instances) {
            CKEDITOR.instances[i].on('change', function (e) {
                that.valueChange.emit(e.editor.getData());
                this.isChanged = true;
            });
            CKEDITOR.instances[i].on('blur', function (e) {
                that.valueChange.emit(e.editor.getData());
                this.isChanged = true;
            });
        }
    };
    CKEditor.prototype.ngOnChanges = function () {
        if (CKEDITOR.instances && this.value != "" && this.value != "undefined")
            CKEDITOR.instances['editor1'].setData(this.value, function () {
                //  this.checkDirty();  // true
            });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], CKEditor.prototype, "value", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', forms_1.FormControl)
    ], CKEditor.prototype, "ckFormControl", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], CKEditor.prototype, "valueChange", void 0);
    CKEditor = __decorate([
        core_1.Component({
            selector: 'ckeditor',
            template: "<textarea name=\"editor1\" id=\"editor1\" [formFormControl]=\"ckFormControl\" #ckCont=\"ngForm\" ></textarea>\n    <div class=\"error-msg\" *ngIf=\"ckCont.control.hasError('required')\">Required Field</div>"
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], CKEditor);
    return CKEditor;
}());
exports.CKEditor = CKEditor;
//# sourceMappingURL=ckeditor.component.js.map