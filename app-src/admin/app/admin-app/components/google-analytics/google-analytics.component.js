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
var google_analytics_service_1 = require("./google-analytics.service");
var google_analytics_model_1 = require("./google-analytics.model");
var alert_1 = require("../../../shared/components/alert/alert");
var alert_model_1 = require("../../../shared/models/alert.model");
var validation_service_1 = require("../../../shared/services/validation.service");
var forms_1 = require("@angular/forms");
var control_valdation_message_component_1 = require("../../../shared/components/control-valdation-message.component");
var doc_uploader_component_1 = require("../../../shared/components/doc-uploader.component");
var GoogleAnalyticsComponent = (function () {
    /* End File Upload handle */
    function GoogleAnalyticsComponent(_objService, _formBuilder) {
        this._objService = _objService;
        this._formBuilder = _formBuilder;
        this.objAnalytics = new google_analytics_model_1.GoogleAnalyticsModel();
        this.objAlert = new alert_model_1.AlertModel();
        this.isSubmitted = false;
        /* file upload */
        this.allowedExt = ['json'];
        this.allowedSize = 1; //MB
        this.fileDeleted = false;
        this.fileName = "";
        this.docFormControl = new forms_1.FormControl('', forms_1.Validators.required);
        this.analyticsForm = this._formBuilder.group({
            trackingId: ['', forms_1.Validators.required],
            viewId: ['', forms_1.Validators.required],
            docFormControl: this.docFormControl,
            pollingInterval: ['5', forms_1.Validators.compose([validation_service_1.ValidationService.minValueValidator(1), forms_1.Validators.required])]
        });
    }
    GoogleAnalyticsComponent.prototype.ngOnInit = function () {
        this.getGoogleAnalytics();
    };
    GoogleAnalyticsComponent.prototype.getGoogleAnalytics = function () {
        var _this = this;
        this._objService.getAnalyticsDetail()
            .subscribe(function (res) { return _this.detailView(res); }, function (error) { return _this.errorMessage(error); });
    };
    GoogleAnalyticsComponent.prototype.detailView = function (objRes) {
        objRes.pollingInterval = objRes.pollingInterval / 60000;
        this.objAnalytics = objRes;
        this.fileName = this.objAnalytics.serviceAccountKeyFileName;
        // this.isFresh = false;
    };
    GoogleAnalyticsComponent.prototype.saveAnalytics = function () {
        var _this = this;
        this.isSubmitted = true;
        //this.fileControl.updateValue(this.fileName);
        if (this.analyticsForm.valid) {
            var objAnalyticsSave = new google_analytics_model_1.GoogleAnalyticsModel();
            Object.assign(objAnalyticsSave, this.objAnalytics);
            objAnalyticsSave.pollingInterval = this.analyticsForm.controls['pollingInterval'].value * 60000;
            if (!this.objAnalytics._id) {
                this.isPost = true;
                this._objService.saveGoogleAnalytics(objAnalyticsSave, this.file)
                    .subscribe(function (res) { return _this.resStatusMessage(res); }, function (error) { return _this.errorMessage(error); });
            }
            else {
                this.isPost = false;
                this._objService.updateGoogleAnalytics(objAnalyticsSave, this.file)
                    .subscribe(function (res) { return _this.resStatusMessage(res); }, function (error) { return _this.errorMessage(error); });
            }
        }
    };
    // validateForm() {
    //     if ((this.objAnalytics.api_Key != "" && typeof this.objAnalytics.api_Key != "undefined") || (this.objAnalytics.host != "" && typeof this.objAnalytics.host != "undefined"))
    //         return true;
    //     else {
    //         this.objAlert.showAlert("danger", "Alert !!", "Please Enter Either Host or API Key");
    //
    //     }
    // }
    GoogleAnalyticsComponent.prototype.resStatusMessage = function (objAnalytics) {
        this.objAlert.hideAlert();
        if (this.isPost)
            this.getGoogleAnalytics();
        jQuery.jAlert({
            'title': 'Success',
            'content': objAnalytics.message,
            'theme': 'green'
        });
    };
    GoogleAnalyticsComponent.prototype.errorMessage = function (res) {
        this.objAlert.showAlert("danger", "Alert !!", res.message, true);
    };
    /*
     File Handle
     */
    GoogleAnalyticsComponent.prototype.onFileSelect = function (args) {
        this.file = args;
        if (this.file)
            this.fileName = this.file.name;
    };
    GoogleAnalyticsComponent.prototype.onDeleteFile = function (imageId) {
        var _this = this;
        jQuery.jAlert({
            'type': 'confirm',
            'title': 'Alert',
            'confirmQuestion': 'Are you sure to delete the File ?',
            'theme': 'red',
            'onConfirm': function (e, btn) {
                e.preventDefault();
                _this._objService.deleteFile(_this.objAnalytics.serviceAccountKeyFileName, _this.objAnalytics.docProperties.docPath)
                    .subscribe(function (res) {
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
    GoogleAnalyticsComponent = __decorate([
        core_1.Component({
            selector: 'google-analytics',
            templateUrl: 'admin-templates/google-analytics/google-analytics.html',
            providers: [google_analytics_service_1.GoogleAnalyticsService],
            directives: [control_valdation_message_component_1.FormControlMessages, alert_1.Alert, doc_uploader_component_1.DocumentUploader]
        }), 
        __metadata('design:paramtypes', [google_analytics_service_1.GoogleAnalyticsService, forms_1.FormBuilder])
    ], GoogleAnalyticsComponent);
    return GoogleAnalyticsComponent;
}());
exports.GoogleAnalyticsComponent = GoogleAnalyticsComponent;
//# sourceMappingURL=google-analytics.component.js.map