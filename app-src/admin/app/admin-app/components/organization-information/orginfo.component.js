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
var orginfo_service_1 = require("./orginfo.service");
var orginfo_model_1 = require("./orginfo.model");
var alert_model_1 = require("../../../shared/models/alert.model");
var validation_service_1 = require("../../../shared/services/validation.service");
var countrylist_service_1 = require("../../../shared/services/countrylist.service");
var general_config_1 = require("../../../shared/configs/general.config");
var forms_1 = require("@angular/forms");
var enum_config_1 = require("../../../shared/configs/enum.config");
var OrganizationInfoComponent = (function () {
    /* End Image Upload handle */
    function OrganizationInfoComponent(_objService, _formBuilder, countryService) {
        this._objService = _objService;
        this._formBuilder = _formBuilder;
        this.countryService = countryService;
        this.objOrg = new orginfo_model_1.OrganizationModel();
        this.objAlert = new alert_model_1.AlertModel();
        this.isSubmitted = false;
        /* Image Upload Handle*/
        this.imageDeleted = false;
        this.fileName = "";
        this.drawImagePath = general_config_1.Config.DefaultImage;
        this.imageFormControl = new forms_1.FormControl('', forms_1.Validators.required);
        this.canvasSize = enum_config_1.ImageCanvasSizeEnum.small;
        this.orgInfoForm = this._formBuilder.group({
            orgName: ['', forms_1.Validators.required],
            "country": ['', forms_1.Validators.required],
            "city": ['', forms_1.Validators.required],
            "streetAddress": ['', forms_1.Validators.required],
            "organizationEmail": ['', forms_1.Validators.compose([forms_1.Validators.required, validation_service_1.ValidationService.emailValidator])],
            "imageFormControl": this.imageFormControl,
            region: [''],
            state: [''],
            addressLine: [''],
            zipAddress: [''],
            postalCode: [''],
            faxNumber: [''],
            phoneNumber: [''],
            mobileNumber: [''],
            fbUrl: ['', validation_service_1.ValidationService.urlValidator],
            twitterUrl: ['', validation_service_1.ValidationService.urlValidator],
            gplusUrl: ['', validation_service_1.ValidationService.urlValidator],
            linkendinUrl: ['', validation_service_1.ValidationService.urlValidator],
            youtubeURL: ['', validation_service_1.ValidationService.urlValidator],
            instagramURL: ['', validation_service_1.ValidationService.urlValidator],
            slogan: ['']
        });
    }
    OrganizationInfoComponent.prototype.ngOnInit = function () {
        this.getCountryList();
        this.getOrgInfo();
        this.objAlert.showAlert("info", "Information", "Please fill the necessary information about the organization.");
    };
    OrganizationInfoComponent.prototype.ngAfterViewInit = function () {
        //let path = Config.DefaultImage;
        //this.drawImageToCanvas(path);
    };
    OrganizationInfoComponent.prototype.getCountryList = function () {
        var _this = this;
        this.countryService.getCountryList()
            .subscribe(function (res) {
            _this.objCountyList = res;
        });
    };
    OrganizationInfoComponent.prototype.getOrgInfo = function () {
        var _this = this;
        this._objService.getOrgInfoDetail()
            .subscribe(function (res) { return _this.bindInfo(res); }, function (error) { return _this.errorMessage(error); });
    };
    OrganizationInfoComponent.prototype.bindInfo = function (objOrg) {
        var path = general_config_1.Config.DefaultImage;
        if (objOrg) {
            this.objOrg = objOrg;
            if (this.objOrg.logoImageName) {
                this.fileName = this.objOrg.logoImageName;
                var cl = general_config_1.Config.Cloudinary;
                path = cl.url(this.objOrg.logoImageName);
            }
        }
        this.drawImageToCanvas(path);
    };
    OrganizationInfoComponent.prototype.saveOrgInfo = function () {
        var _this = this;
        this.isSubmitted = true;
        if (this.orgInfoForm.valid) {
            if (!this.objOrg._id) {
                this.isPost = true;
                this._objService.saveOrgInfo(this.objOrg, this.file)
                    .subscribe(function (res) { return _this.resStatusMessage(res); }, function (error) { return _this.errorMessage(error); });
            }
            else {
                this.isPost = this.file ? true : false;
                this._objService.updateOrgInfo(this.objOrg, this.file, this.imageDeleted)
                    .subscribe(function (res) { return _this.resStatusMessage(res); }, function (error) { return _this.errorMessage(error); });
            }
        }
    };
    // validateForm() {
    //     if ((this.objOrg.api_Key != "" && typeof this.objOrg.api_Key != "undefined") || (this.objOrg.host != "" && typeof this.objOrg.host != "undefined"))
    //         return true;
    //     else {
    //         this.objAlert.showAlert("danger", "Alert !!", "Please Enter Either Host or API Key");
    //
    //     }
    // }
    OrganizationInfoComponent.prototype.resStatusMessage = function (res) {
        if (this.isPost)
            this.getOrgInfo();
        this.file = null;
        jQuery.jAlert({
            'title': 'Success',
            'content': res.message,
            'theme': 'green'
        });
    };
    OrganizationInfoComponent.prototype.errorMessage = function (objResponse) {
        this.objAlert.showAlert("danger", "Alert !!", objResponse.message, true);
    };
    /*Image handler */
    OrganizationInfoComponent.prototype.changeFile = function (args) {
        this.file = args;
        if (this.file)
            this.fileName = this.file.name;
    };
    OrganizationInfoComponent.prototype.drawImageToCanvas = function (path) {
        this.drawImagePath = path;
    };
    OrganizationInfoComponent.prototype.deleteImage = function (id) {
        var _this = this;
        jQuery.jAlert({
            'type': 'confirm',
            'title': 'Alert',
            'confirmQuestion': 'Are you sure to delete the Image ?',
            'theme': 'red',
            'onConfirm': function (e, btn) {
                e.preventDefault();
                _this._objService.deleteImage(_this.objOrg.logoImageName, _this.objOrg.imageProperties.imageExtension, _this.objOrg.imageProperties.imagePath)
                    .subscribe(function (res) {
                    _this.imageDeleted = true;
                    _this.objOrg.logoImageName = "";
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
    OrganizationInfoComponent = __decorate([
        core_1.Component({
            selector: 'google-analytics',
            templateUrl: 'admin-templates/organization-information/orginfo.html'
        }), 
        __metadata('design:paramtypes', [orginfo_service_1.OrganizationInfoService, forms_1.FormBuilder, countrylist_service_1.CountryListService])
    ], OrganizationInfoComponent);
    return OrganizationInfoComponent;
}());
exports.OrganizationInfoComponent = OrganizationInfoComponent;
//# sourceMappingURL=orginfo.component.js.map