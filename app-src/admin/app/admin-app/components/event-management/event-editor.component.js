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
var event_model_1 = require("./event.model");
var event_service_1 = require("./event.service");
var general_config_1 = require("../../../shared/configs/general.config");
var enum_config_1 = require("../../../shared/configs/enum.config");
var moment = require('moment');
var forms_1 = require("@angular/forms");
//declare var require;
//const styles:string = require('../../../shared/components/datepicker/src/my-date-picker/my-date-picker.component.css');
var EventEditorComponent = (function () {
    /* End Image Upload handle */
    function EventEditorComponent(_objService, _formBuilder) {
        this._objService = _objService;
        this._formBuilder = _formBuilder;
        this.objEvent = new event_model_1.EventModel();
        this.showListEvent = new core_1.EventEmitter();
        this.isSubmitted = false;
        /* Image Upload Handle*/
        this.imageDeleted = false;
        this.fileName = "";
        this.drawImagePath = general_config_1.Config.DefaultWideImage;
        this.imageFormControl = new forms_1.FormControl('', forms_1.Validators.required);
        this.canvasSize = enum_config_1.ImageCanvasSizeEnum.wide;
        this.eventForm = this._formBuilder.group({
            "eventTitle": ['', forms_1.Validators.required],
            "description": ['', forms_1.Validators.required],
            "venue": ['', forms_1.Validators.required],
            "venueAddress": ['', forms_1.Validators.required],
            "startDate": ['', forms_1.Validators.required],
            "endDate": [''],
            "imageFormControl": this.imageFormControl,
            "active": [''],
        });
    }
    EventEditorComponent.prototype.ngAfterViewInit = function () {
        if (!this.eventId)
            this.drawImageToCanvas(general_config_1.Config.DefaultWideImage);
    };
    EventEditorComponent.prototype.ngOnInit = function () {
        if (this.eventId)
            this.getEventDetail();
    };
    EventEditorComponent.prototype.getEventDetail = function () {
        var _this = this;
        this._objService.getEventById(this.eventId)
            .subscribe(function (res) { return _this.bindDetail(res); }, function (error) { return _this.errorMessage(error); });
    };
    EventEditorComponent.prototype.bindDetail = function (objRes) {
        this.objEvent = objRes;
        this.objEvent.startDate = this.changeDateFormatToView(this.objEvent.startDate);
        this.objEvent.endDate = this.changeDateFormatToView(this.objEvent.endDate);
        this.fileName = this.objEvent.imageName;
        var path = "";
        if (this.objEvent.imageName) {
            var cl = general_config_1.Config.Cloudinary;
            path = cl.url(this.objEvent.imageName, { width: 300, height: 150, crop: 'fill' });
        }
        else
            path = general_config_1.Config.DefaultWideImage;
        this.drawImageToCanvas(path);
    };
    EventEditorComponent.prototype.saveEvent = function () {
        var _this = this;
        this.isSubmitted = true;
        this.eventForm.controls['imageFormControl'].patchValue(this.fileName);
        if (this.eventForm.valid) {
            if (!this.eventId) {
                this._objService.saveEvent(this.objEvent, this.file)
                    .subscribe(function (res) { return _this.resStatusMessage(res); }, function (error) { return _this.errorMessage(error); });
            }
            else {
                this._objService.updateEvent(this.objEvent, this.file, this.imageDeleted)
                    .subscribe(function (res) { return _this.resStatusMessage(res); }, function (error) { return _this.errorMessage(error); });
            }
        }
    };
    EventEditorComponent.prototype.resStatusMessage = function (objSave) {
        this.showListEvent.emit(false); // is Form Canceled
        jQuery.jAlert({
            'title': 'Success',
            'content': objSave.message,
            'theme': 'green'
        });
    };
    EventEditorComponent.prototype.triggerCancelForm = function () {
        var isCanceled = true;
        this.showListEvent.emit(isCanceled);
    };
    EventEditorComponent.prototype.errorMessage = function (objResponse) {
        jQuery.jAlert({
            'title': 'Alert',
            'content': objResponse.message,
            'theme': 'red'
        });
    };
    EventEditorComponent.prototype.changeDateFormatToView = function (data) {
        return moment(data).format("YYYY-MM-DD HH:mm");
    };
    /*Image handler */
    EventEditorComponent.prototype.changeFile = function (args) {
        this.file = args;
        if (this.file)
            this.fileName = this.file.name;
    };
    EventEditorComponent.prototype.deleteImage = function (imageId) {
        var _this = this;
        jQuery.jAlert({
            'type': 'confirm',
            'title': 'Alert',
            'confirmQuestion': 'Are you sure to delete the Image ?',
            'theme': 'red',
            'onConfirm': function (e, btn) {
                e.preventDefault();
                _this._objService.deleteImage(_this.objEvent.imageName, _this.objEvent.imageProperties.imageExtension, _this.objEvent.imageProperties.imagePath)
                    .subscribe(function (res) {
                    _this.imageDeleted = true;
                    _this.objEvent.imageName = "";
                    _this.drawImageToCanvas(general_config_1.Config.DefaultWideImage);
                    jQuery.jAlert({
                        'title': 'Success',
                        'content': res.message,
                        'theme': 'green'
                    });
                }, function (error) { return _this.errorMessage(error); });
            }
        });
    };
    EventEditorComponent.prototype.drawImageToCanvas = function (path) {
        this.drawImagePath = path;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], EventEditorComponent.prototype, "eventId", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], EventEditorComponent.prototype, "showListEvent", void 0);
    EventEditorComponent = __decorate([
        core_1.Component({
            selector: 'event-editor',
            templateUrl: 'admin-templates/event-management/event-editor.html'
        }), 
        __metadata('design:paramtypes', [event_service_1.EventService, forms_1.FormBuilder])
    ], EventEditorComponent);
    return EventEditorComponent;
}());
exports.EventEditorComponent = EventEditorComponent;
//# sourceMappingURL=event-editor.component.js.map