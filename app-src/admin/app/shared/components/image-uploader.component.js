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
var enum_config_1 = require("../configs/enum.config");
var general_config_1 = require("../configs/general.config");
var forms_1 = require("@angular/forms");
var control_valdation_message_component_1 = require("./control-valdation-message.component");
var ImageUploader = (function () {
    function ImageUploader() {
        this.fileSelectedEvent = new core_1.EventEmitter();
        this.deleteImageEvent = new core_1.EventEmitter();
        this.isValidImage = true;
        this.isFresh = false;
        this.allowedExt = ['jpeg', 'jpg', 'png', 'webp'];
        this.allowedSize = 1; // In MB
    }
    ImageUploader.prototype.ngAfterViewInit = function () {
        this.allowedExtMessage = this.allowedExt.join(',');
        if (this.drawImagePath)
            switch (this.canvasSize) {
                case enum_config_1.ImageCanvasSizeEnum.small:
                    this.canvasHeight = 170;
                    this.canvasWidth = 150;
                    break;
                case enum_config_1.ImageCanvasSizeEnum.wide:
                    this.canvasHeight = 170;
                    this.canvasWidth = 300;
                    break;
                default:
                    this.canvasHeight = 170;
                    this.canvasWidth = 150;
                    break;
            }
        this.drawImageToCanvas(this.drawImagePath);
    };
    /*Image handler */
    ImageUploader.prototype.drawImageToCanvas = function (path) {
        var canvas = this.previewCanvas.nativeElement;
        this.context = canvas.getContext("2d");
        canvas.width = this.canvasWidth;
        canvas.height = this.canvasHeight;
        var ctx = this.context;
        var img = new Image();
        img.onload = function () {
            var hRatio = canvas.width / img.width;
            var vRatio = canvas.height / img.height;
            var ratio = Math.min(hRatio, vRatio);
            var centerShift_x = (canvas.width - img.width * ratio) / 2;
            var centerShift_y = (canvas.height - img.height * ratio) / 2;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, img.width, img.height, centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
        };
        img.src = path; //http://res.cloudinary.com/bitsbeat-it-solution/image/upload/c_fill,h_150,w_300/imageName-1465885928713.webp";
    };
    ImageUploader.prototype.onFileSelect = function (e) {
        this.file = e.target.files[0];
        this.isValidImage = validation_service_1.ValidationService.imageValidation(this.file, this.allowedExt, this.allowedSize);
        var canvas = this.previewCanvas.nativeElement;
        this.context = canvas.getContext("2d");
        canvas.width = this.canvasWidth;
        canvas.height = this.canvasHeight;
        var ctx = this.context;
        var reader = new FileReader();
        if (this.isValidImage) {
            this.imageFormControl.updateValue(this.file.name);
            if (!this.imageName)
                this.isFresh = true;
            this.imageName = this.file.name;
            reader.onload = function (event) {
                var img = new Image();
                img.onload = function () {
                    var hRatio = canvas.width / img.width;
                    var vRatio = canvas.height / img.height;
                    var ratio = Math.min(hRatio, vRatio);
                    var centerShift_x = (canvas.width - img.width * ratio) / 2;
                    var centerShift_y = (canvas.height - img.height * ratio) / 2;
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.drawImage(img, 0, 0, img.width, img.height, centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(e.target.files[0]);
            this.fileSelectedEvent.emit(this.file);
        }
        else {
            this.imageFormControl.updateValue("");
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            this.drawImageToCanvas(general_config_1.Config.InvalidImage);
        }
    };
    ImageUploader.prototype.onDeleteFile = function (imageId) {
        this.file = null;
        this.imageName = "";
        this.imageFormControl.updateValue("");
        this.inputFile.nativeElement.value = "";
        this.drawImageToCanvas(this.drawImagePath);
        if (!this.isFresh)
            this.deleteImageEvent.emit(imageId);
    };
    ImageUploader.prototype.ngOnChanges = function () {
        if (this.imageName)
            this.imageFormControl.updateValue(this.imageName);
        if (this.previewCanvas && !this.isSubmitted)
            this.drawImageToCanvas(this.drawImagePath);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', forms_1.FormControl)
    ], ImageUploader.prototype, "imageFormControl", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ImageUploader.prototype, "imageName", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ImageUploader.prototype, "drawImagePath", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], ImageUploader.prototype, "isSubmitted", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], ImageUploader.prototype, "canvasSize", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], ImageUploader.prototype, "fileSelectedEvent", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], ImageUploader.prototype, "deleteImageEvent", void 0);
    __decorate([
        core_1.ViewChild('previewCanvas'), 
        __metadata('design:type', Object)
    ], ImageUploader.prototype, "previewCanvas", void 0);
    __decorate([
        core_1.ViewChild('inputFile'), 
        __metadata('design:type', Object)
    ], ImageUploader.prototype, "inputFile", void 0);
    ImageUploader = __decorate([
        core_1.Component({
            selector: 'image-uploader',
            template: "<canvas #previewCanvas></canvas>\n                    <a *ngIf=\"imageName && isValidImage\" href=\"javascript:void(0)\" (click)=\"onDeleteFile()\"><i\n                            class=\"fa fa-trash\"\n                            aria-hidden=\"true\"></i></a>\n                    <div class=\"clearfix\"></div>\n                    <input type=\"file\" class=\"inputfile\" id=\"file\" #inputFile (change)=\"onFileSelect($event)\">\n                    <label for=\"file\"><i class=\"fa fa-upload\" aria-hidden=\"true\"> {{imageName?imageName:\"Choose an Image...\"}}</i></label>\n                    <div class=\"error-msg\" *ngIf=\"!isValidImage\">*Supported Extensions : {{allowedExtMessage}} and max size : {{allowedSize}} MB</div>               \n                  <control-messages [isSubmitted]=\"isSubmitted\"\n                         [control]=\"imageFormControl\"></control-messages>",
            directives: [forms_1.REACTIVE_FORM_DIRECTIVES, control_valdation_message_component_1.FormControlMessages]
        }), 
        __metadata('design:paramtypes', [])
    ], ImageUploader);
    return ImageUploader;
}());
exports.ImageUploader = ImageUploader;
//# sourceMappingURL=image-uploader.component.js.map