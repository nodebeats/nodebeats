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
var cloudinary_service_1 = require("./cloudinary.service");
var cloudinary_model_1 = require("./cloudinary.model");
var control_valdation_message_component_1 = require("../../../shared/components/control-valdation-message.component");
var alert_model_1 = require("../../../shared/models/alert.model");
var alert_1 = require("../../../shared/components/alert/alert");
var forms_1 = require("@angular/forms");
var general_config_1 = require("../../../shared/configs/general.config");
var CloudinarySettingComponent = (function () {
    function CloudinarySettingComponent(_objService, _formBuilder) {
        this._objService = _objService;
        this._formBuilder = _formBuilder;
        this.objCloudinary = new cloudinary_model_1.CloudinaryModel();
        this.isSubmitted = false;
        this.objAlert = new alert_model_1.AlertModel();
        this.cloudinaryForm = this._formBuilder.group({
            "cloudinaryCloudName": ['', forms_1.Validators.required],
            "cloudinaryApiKey": ['', forms_1.Validators.required],
            "cloudinaryApiSecret": ['', forms_1.Validators.required]
        });
    }
    CloudinarySettingComponent.prototype.ngOnInit = function () {
        this.getClouindarySetting();
    };
    CloudinarySettingComponent.prototype.getClouindarySetting = function () {
        var _this = this;
        this._objService.getCloudinarySettings()
            .subscribe(function (res) { return _this.bindInfo(res); }, function (error) { return _this.errorMessage(error); });
    };
    CloudinarySettingComponent.prototype.bindInfo = function (objRes) {
        this.objCloudinary = objRes;
    };
    CloudinarySettingComponent.prototype.saveCloudinarySetting = function () {
        var _this = this;
        this.isSubmitted = true;
        if (this.cloudinaryForm.valid) {
            if (!this.objCloudinary._id) {
                this.isPost = true;
                this._objService.saveCloudinarySettings(this.objCloudinary)
                    .subscribe(function (res) { return _this.resStatusMessage(res); }, function (error) { return _this.errorMessage(error); });
            }
            else {
                this.isPost = false;
                this._objService.updateCloudinarySettings(this.objCloudinary)
                    .subscribe(function (res) { return _this.resStatusMessage(res); }, function (error) { return _this.errorMessage(error); });
            }
        }
        else {
            this.objAlert.showAlert("danger", "Alert !!", "Please fill all the mandatory field", true);
        }
    };
    CloudinarySettingComponent.prototype.closeAlert = function (event) {
        this.objAlert.hideAlert();
    };
    CloudinarySettingComponent.prototype.resStatusMessage = function (res) {
        general_config_1.Config.setCloudinary(this.objCloudinary.cloudinaryCloudName);
        if (this.isPost)
            this.getClouindarySetting();
        this.objAlert.hideAlert();
        jQuery.jAlert({
            'title': 'Success',
            'content': res.message,
            'theme': 'green'
        });
    };
    CloudinarySettingComponent.prototype.errorMessage = function (objResponse) {
        this.objAlert.showAlert("danger", "Alert !!", objResponse.message, true);
    };
    CloudinarySettingComponent.prototype.triggerCancelForm = function () {
        var isEdit = false;
        //this.editCancelEvent.emit(false);
    };
    CloudinarySettingComponent = __decorate([
        core_1.Component({
            selector: 'cloudinary-settings',
            templateUrl: 'admin-templates/cloudinary/cloudinary.html',
            providers: [cloudinary_service_1.CloudinaryService],
            directives: [control_valdation_message_component_1.FormControlMessages, alert_1.Alert]
        }), 
        __metadata('design:paramtypes', [cloudinary_service_1.CloudinaryService, forms_1.FormBuilder])
    ], CloudinarySettingComponent);
    return CloudinarySettingComponent;
}());
exports.CloudinarySettingComponent = CloudinarySettingComponent;
//# sourceMappingURL=cloudinary.component.js.map