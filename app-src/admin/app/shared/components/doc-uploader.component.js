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
var validation_service_1 = require("../services/validation.service");
var forms_1 = require("@angular/forms");
var DocumentUploader = (function () {
    function DocumentUploader() {
        this.fileSelectedEvent = new core_1.EventEmitter();
        this.deleteFileEvent = new core_1.EventEmitter();
        this.isValidFile = true;
        this.isFresh = false;
    }
    DocumentUploader.prototype.ngOnInit = function () {
        this.allowedExtMessage = this.allowedExt.join(',');
    };
    DocumentUploader.prototype.onFileSelect = function (e) {
        this.file = e.target.files[0];
        var allowedExt = this.allowedExt;
        var allowedSize = this.allowedSize;
        this.isValidFile = validation_service_1.ValidationService.documentValidation(this.file, allowedExt, allowedSize);
        if (this.isValidFile) {
            this.docFormControl.patchValue(this.file.name);
            if (!this.fileName)
                this.isFresh = true;
            this.fileName = this.file.name;
            this.fileSelectedEvent.emit(this.file);
        }
        else {
            this.docFormControl.patchValue("");
            this.inputFile.nativeElement.value = "";
        }
    };
    DocumentUploader.prototype.onDeleteFile = function (docId) {
        if (!this.isFresh) {
            this.deleteFileEvent.emit(docId);
        }
        this.clearValue();
    };
    DocumentUploader.prototype.clearValue = function () {
        this.file = null;
        this.fileName = "";
        this.docFormControl.patchValue("");
        this.inputFile.nativeElement.value = "";
    };
    DocumentUploader.prototype.ngOnChanges = function () {
        if (this.fileName) {
            this.docFormControl.patchValue(this.fileName);
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', forms_1.FormControl)
    ], DocumentUploader.prototype, "docFormControl", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DocumentUploader.prototype, "fileName", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], DocumentUploader.prototype, "allowedExt", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DocumentUploader.prototype, "allowedSize", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DocumentUploader.prototype, "isSubmitted", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DocumentUploader.prototype, "fileSelectedEvent", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DocumentUploader.prototype, "deleteFileEvent", void 0);
    __decorate([
        core_1.ViewChild('inputFile'), 
        __metadata('design:type', Object)
    ], DocumentUploader.prototype, "inputFile", void 0);
    DocumentUploader = __decorate([
        core_1.Component({
            selector: 'doc-uploader',
            template: " <label class=\"lbl-file-name\" *ngIf=\"fileName\">{{fileName}}</label>\n                    <a *ngIf=\"fileName && isValidFile\" href=\"javascript:void(0)\" (click)=\"onDeleteFile()\">\n                    <i class=\"fa fa-trash\" aria-hidden=\"true\"></i></a>\n                    <div class=\"clearfix\"></div>\n                    <input type=\"file\" class=\"inputfile\" id=\"file\" #inputFile (change)=\"onFileSelect($event)\">\n                    <label for=\"file\"><i class=\"fa fa-upload\" aria-hidden=\"true\"> {{fileName?fileName:\"Choose a File...\"}}</i></label>\n                     <div class=\"error-msg\" *ngIf=\"!isValidFile \">*Supported Extension : {{allowedExtMessage}} and max size : {{allowedSize}} MB</div>\n                    <control-messages [isSubmitted]=\"isSubmitted\"\n                     [control]=\"docFormControl\"></control-messages>"
        }), 
        __metadata('design:paramtypes', [])
    ], DocumentUploader);
    return DocumentUploader;
}());
exports.DocumentUploader = DocumentUploader;
//# sourceMappingURL=doc-uploader.component.js.map