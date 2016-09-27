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
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var TinyEditor = (function () {
    function TinyEditor(elementRef) {
        this.value = "";
        this.valueChange = new core_1.EventEmitter();
        this.isChanged = false;
        this.elementRef = elementRef;
    }
    TinyEditor.prototype.ngAfterViewInit = function () {
        var that = this;
        tinymce.remove();
        tinymce.init({
            selector: ".tinyMCE",
            forced_root_block: "p",
            verify_html: false,
            plugins: ["code", 'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table contextmenu paste code'
            ],
            toolbar1: 'code insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
            toolbar2: 'print preview  | forecolor backcolor',
            setup: function (editor) {
                editor.on('init', function (e, l) {
                    editor.getBody().style.fontSize = '15px';
                    if (typeof that.value != "undefined") {
                        editor.setContent(that.value);
                        that.editorFormControl.patchValue(that.value);
                    }
                });
                editor.on('keyup', function (e, l) {
                    var content = editor.getContent();
                    //  that.editorFormControl.updateValue(content);
                    that.isChanged = true;
                    that.valueChange.emit(content);
                });
                editor.on('blur', function (e, l) {
                    var content = editor.getContent();
                    //  that.editorFormControl.updateValue(content);
                    that.isChanged = true;
                    that.valueChange.emit(content);
                });
            },
            file_browser_callback: RoxyFileBrowser
        });
        function RoxyFileBrowser(field_name, url, type, win) {
            win.getSelection().removeAllRanges();
            var roxyFileman = url + '/plugins/tinymce/plugins/fileman/index.html';
            //var roxyFileman = '/fileman/index.html';
            if (roxyFileman.indexOf("?") < 0) {
                roxyFileman += "?type=" + type;
            }
            else {
                roxyFileman += "&type=" + type;
            }
            roxyFileman += '&input=' + field_name + '&value=' + win.document.getElementById(field_name).value;
            if (that.module)
                roxyFileman += "&module=" + that.module;
            if (tinymce.activeEditor.settings.language) {
                roxyFileman += '&langCode=' + tinymce.activeEditor.settings.language;
            }
            tinymce.activeEditor.windowManager.open({
                file: roxyFileman,
                title: 'Fileman',
                width: 850,
                height: 500,
                resizable: "yes",
                plugins: "media",
                inline: "yes",
                close_previous: "no"
            }, { window: win, input: field_name });
            return false;
        }
    };
    TinyEditor.prototype.ngOnChanges = function (changes) {
        if (tinymce.activeEditor && typeof this.value != "undefined") {
            tinymce.activeEditor.setContent(this.value);
            this.editorFormControl.patchValue(this.value);
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', forms_1.FormControl)
    ], TinyEditor.prototype, "editorFormControl", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], TinyEditor.prototype, "isSubmitted", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], TinyEditor.prototype, "value", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], TinyEditor.prototype, "valueChange", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], TinyEditor.prototype, "module", void 0);
    TinyEditor = __decorate([
        core_1.Component({
            selector: 'tiny-editor',
            template: "<textarea class=\"tinyMCE\" [formControl]=\"editorFormControl\" #editor=\"ngForm\" style=\"height:300px\"></textarea>\n                <div class=\"error-msg\" *ngIf=\"editor.control.hasError('required') && (isChanged ||isSubmitted)\">Required</div>"
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], TinyEditor);
    return TinyEditor;
}());
exports.TinyEditor = TinyEditor;
//# sourceMappingURL=tinymce.component.js.map