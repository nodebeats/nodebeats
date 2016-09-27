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
var testimonial_model_1 = require("./testimonial.model");
var testimonial_service_1 = require("./testimonial.service");
var general_config_1 = require("../../../shared/configs/general.config");
var enum_config_1 = require("../../../shared/configs/enum.config");
var validation_service_1 = require("../../../shared/services/validation.service");
var forms_1 = require("@angular/forms");
var TestimonialEditorComponent = (function () {
    /* End Image Upload handle */
    function TestimonialEditorComponent(_objService, _formBuilder) {
        this._objService = _objService;
        this._formBuilder = _formBuilder;
        this.objTestimonial = new testimonial_model_1.TestimonialModel();
        this.showListEvent = new core_1.EventEmitter();
        this.isSubmitted = false;
        /* Image Upload Handle*/
        this.imageDeleted = false;
        this.fileName = "";
        this.drawImagePath = general_config_1.Config.DefaultAvatar;
        this.imageFormControl = new forms_1.FormControl('', forms_1.Validators.required);
        this.canvasSize = enum_config_1.ImageCanvasSizeEnum.small;
        this.objTestimonial.testimonialDate = new Date().toLocaleDateString();
        this.testimonialForm = this._formBuilder.group({
            "personName": ['', forms_1.Validators.required],
            "organization": ['', forms_1.Validators.required],
            "testimonialContent": ['', forms_1.Validators.required],
            "email": ['', validation_service_1.ValidationService.emailValidator],
            "imageFormControl": this.imageFormControl,
            designation: [''],
            fbUrl: ['', validation_service_1.ValidationService.urlValidator],
            twitterUrl: ['', validation_service_1.ValidationService.urlValidator],
            gplusUrl: ['', validation_service_1.ValidationService.urlValidator],
            linkendinUrl: ['', validation_service_1.ValidationService.urlValidator],
            active: ['']
        });
    }
    TestimonialEditorComponent.prototype.ngAfterViewInit = function () {
        if (!this.testimonialId)
            this.drawImageToCanvas(general_config_1.Config.DefaultAvatar);
    };
    TestimonialEditorComponent.prototype.ngOnInit = function () {
        if (this.testimonialId)
            this.getTestimonialDetail();
    };
    TestimonialEditorComponent.prototype.getTestimonialDetail = function () {
        var _this = this;
        this._objService.getTestimonialDetail(this.testimonialId)
            .subscribe(function (res) { return _this.bindDetail(res); }, function (error) { return _this.errorMessage(error); });
    };
    TestimonialEditorComponent.prototype.bindDetail = function (objRes) {
        this.objTestimonial = objRes;
        this.objTestimonial.testimonialDate = new Date(this.objTestimonial.testimonialDate).toLocaleDateString();
        var path = "";
        if (this.objTestimonial.imageName) {
            var cl = general_config_1.Config.Cloudinary;
            path = cl.url(this.objTestimonial.imageName);
        }
        else
            path = general_config_1.Config.DefaultAvatar;
        this.drawImageToCanvas(path);
    };
    TestimonialEditorComponent.prototype.saveTestimonial = function () {
        var _this = this;
        this.isSubmitted = true;
        if (this.testimonialForm.valid) {
            if (!this.testimonialId) {
                this._objService.saveTestimonial(this.objTestimonial, this.file)
                    .subscribe(function (res) { return _this.resStatusMessage(res); }, function (error) { return _this.errorMessage(error); });
            }
            else {
                this._objService.updateTestimonial(this.objTestimonial, this.file, this.imageDeleted)
                    .subscribe(function (res) { return _this.resStatusMessage(res); }, function (error) { return _this.errorMessage(error); });
            }
        }
    };
    TestimonialEditorComponent.prototype.resStatusMessage = function (objSave) {
        this.showListEvent.emit(false); // is Form Canceled
        jQuery.jAlert({
            'title': 'Success',
            'content': objSave.message,
            'theme': 'green'
        });
    };
    TestimonialEditorComponent.prototype.triggerCancelForm = function () {
        var isCanceled = true;
        this.showListEvent.emit(isCanceled);
    };
    TestimonialEditorComponent.prototype.errorMessage = function (objResponse) {
        jQuery.jAlert({
            'title': 'Alert',
            'content': objResponse.message,
            'theme': 'red'
        });
    };
    /*Image handler */
    TestimonialEditorComponent.prototype.deleteImage = function (id) {
        var _this = this;
        jQuery.jAlert({
            'type': 'confirm',
            'title': 'Alert',
            'confirmQuestion': 'Are you sure to delete the Image ?',
            'theme': 'red',
            'onConfirm': function (e, btn) {
                e.preventDefault();
                _this._objService.deleteImage(_this.objTestimonial.imageName, _this.objTestimonial.imageProperties.imageExtension, _this.objTestimonial.imageProperties.imagePath)
                    .subscribe(function (res) {
                    _this.imageDeleted = true;
                    _this.drawImageToCanvas(general_config_1.Config.DefaultAvatar);
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
    TestimonialEditorComponent.prototype.changeFile = function (args) {
        this.file = args;
        if (this.file)
            this.fileName = this.file.name;
    };
    TestimonialEditorComponent.prototype.drawImageToCanvas = function (path) {
        this.drawImagePath = path;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], TestimonialEditorComponent.prototype, "testimonialId", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], TestimonialEditorComponent.prototype, "showListEvent", void 0);
    TestimonialEditorComponent = __decorate([
        core_1.Component({
            selector: 'testimonial-editor',
            templateUrl: 'admin-templates/testimonial/testimonial-editor.html'
        }), 
        __metadata('design:paramtypes', [testimonial_service_1.TestimonialService, forms_1.FormBuilder])
    ], TestimonialEditorComponent);
    return TestimonialEditorComponent;
}());
exports.TestimonialEditorComponent = TestimonialEditorComponent;
//# sourceMappingURL=testimonial-editor.component.js.map