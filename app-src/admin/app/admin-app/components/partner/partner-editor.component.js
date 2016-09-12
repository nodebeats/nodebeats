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
var control_valdation_message_component_1 = require("../../../shared/components/control-valdation-message.component");
var partner_model_1 = require("./partner.model");
var partner_service_1 = require("./partner.service");
var general_config_1 = require("../../../shared/configs/general.config");
var enum_config_1 = require("../../../shared/configs/enum.config");
var image_uploader_component_1 = require("../../../shared/components/image-uploader.component");
var forms_1 = require("@angular/forms");
var validation_service_1 = require("../../../shared/services/validation.service");
//declare var require;
//const styles:string = require('../../../shared/components/datepicker/src/my-date-picker/my-date-picker.component.css');
var PartnerEditorComponent = (function () {
    /* End Image Upload handle */
    function PartnerEditorComponent(_objService, _formBuilder) {
        this._objService = _objService;
        this._formBuilder = _formBuilder;
        this.objPartner = new partner_model_1.PartnerModel();
        this.showPartnerListEvent = new core_1.EventEmitter();
        this.isSubmitted = false;
        /* Image Upload Handle*/
        this.imageDeleted = false;
        this.fileName = "";
        this.drawImagePath = general_config_1.Config.DefaultImage;
        this.imageFormControl = new forms_1.FormControl('', forms_1.Validators.required);
        this.canvasSize = enum_config_1.ImageCanvasSizeEnum.small;
        this.partnerForm = _formBuilder.group({
            "partnerName": ['', forms_1.Validators.required],
            "imageAltText": ['', forms_1.Validators.required],
            "linkURL": ['', forms_1.Validators.compose([forms_1.Validators.required, validation_service_1.ValidationService.urlValidator])],
            "active": [''],
            "imageFormControl": this.imageFormControl
        });
    }
    PartnerEditorComponent.prototype.ngAfterViewInit = function () {
        if (!this.partnerId)
            this.drawImageToCanvas(general_config_1.Config.DefaultImage);
    };
    PartnerEditorComponent.prototype.ngOnInit = function () {
        if (this.partnerId)
            this.getImageDetail();
    };
    PartnerEditorComponent.prototype.getImageDetail = function () {
        var _this = this;
        this._objService.getPartnerDetail(this.partnerId)
            .subscribe(function (res) { return _this.bindDetail(res); }, function (error) { return _this.errorMessage(error); });
    };
    PartnerEditorComponent.prototype.bindDetail = function (objRes) {
        this.objPartner = objRes;
        this.fileName = this.objPartner.imageName;
        this.partnerForm.controls['imageFormControl'].updateValue(this.fileName);
        var path = "";
        if (this.objPartner.imageName) {
            var cl = general_config_1.Config.Cloudinary;
            path = cl.url(this.objPartner.imageName);
        }
        else
            path = general_config_1.Config.DefaultImage;
        this.drawImageToCanvas(path);
    };
    PartnerEditorComponent.prototype.savePartner = function () {
        var _this = this;
        this.isSubmitted = true;
        this.partnerForm.controls['imageFormControl'].updateValue(this.fileName);
        if (this.partnerForm.valid) {
            if (!this.partnerId) {
                this._objService.savePartner(this.objPartner, this.file)
                    .subscribe(function (res) { return _this.resStatusMessage(res); }, function (error) { return _this.errorMessage(error); });
            }
            else {
                this._objService.updatePartner(this.objPartner, this.file, this.imageDeleted)
                    .subscribe(function (res) { return _this.resStatusMessage(res); }, function (error) { return _this.errorMessage(error); });
            }
        }
    };
    PartnerEditorComponent.prototype.resStatusMessage = function (objSave) {
        this.showPartnerListEvent.emit(false); // is Form Canceled
        jQuery.jAlert({
            'title': 'Success',
            'content': objSave.message,
            'theme': 'green'
        });
    };
    PartnerEditorComponent.prototype.triggerCancelForm = function () {
        var isCanceled = true;
        this.showPartnerListEvent.emit(isCanceled);
    };
    PartnerEditorComponent.prototype.errorMessage = function (objResponse) {
        jQuery.jAlert({
            'title': 'Alert',
            'content': objResponse.message,
            'theme': 'red'
        });
    };
    /*Image handler */
    PartnerEditorComponent.prototype.changeFile = function (args) {
        this.file = args;
        if (this.file)
            this.fileName = this.file.name;
    };
    PartnerEditorComponent.prototype.drawImageToCanvas = function (path) {
        this.drawImagePath = path;
    };
    PartnerEditorComponent.prototype.deleteImage = function (id) {
        var _this = this;
        jQuery.jAlert({
            'type': 'confirm',
            'title': 'Alert',
            'confirmQuestion': 'Are you sure to delete the Image ?',
            'theme': 'red',
            'onConfirm': function (e, btn) {
                e.preventDefault();
                _this._objService.deleteImage(_this.objPartner.imageName, _this.objPartner.imageProperties.imageExtension, _this.objPartner.imageProperties.imagePath)
                    .subscribe(function (res) {
                    _this.imageDeleted = true;
                    _this.drawImageToCanvas(general_config_1.Config.DefaultImage);
                    jQuery.jAlert({
                        'title': 'Success',
                        'content': res.message,
                        'theme': 'green'
                    });
                }, function (error) {
                    jQuery.jAlert({
                        'title': 'Alert',
                        'content': error.message,
                        'theme': 'red'
                    });
                });
            }
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], PartnerEditorComponent.prototype, "partnerId", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], PartnerEditorComponent.prototype, "showPartnerListEvent", void 0);
    PartnerEditorComponent = __decorate([
        core_1.Component({
            selector: 'partner-editor',
            templateUrl: 'admin-templates/partner/partner-editor.html',
            directives: [control_valdation_message_component_1.FormControlMessages, image_uploader_component_1.ImageUploader],
        }), 
        __metadata('design:paramtypes', [partner_service_1.PartnerService, forms_1.FormBuilder])
    ], PartnerEditorComponent);
    return PartnerEditorComponent;
}());
exports.PartnerEditorComponent = PartnerEditorComponent;
//# sourceMappingURL=partner-editor.component.js.map