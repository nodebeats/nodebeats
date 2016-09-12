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
var team_managment_model_1 = require("./team-managment.model");
var team_managment_service_1 = require("./team-managment.service");
var general_config_1 = require("../../../shared/configs/general.config");
var enum_config_1 = require("../../../shared/configs/enum.config");
var validation_service_1 = require("../../../shared/services/validation.service");
var image_uploader_component_1 = require("../../../shared/components/image-uploader.component");
var forms_1 = require("@angular/forms");
var TeamManagementEditorComponent = (function () {
    /* End Image Upload handle */
    function TeamManagementEditorComponent(_objService, _formBuilder) {
        this._objService = _objService;
        this._formBuilder = _formBuilder;
        this.objTeam = new team_managment_model_1.TeamManagementModel();
        this.showListEvent = new core_1.EventEmitter();
        this.isSubmitted = false;
        /* Image Upload Handle*/
        this.imageDeleted = false;
        this.fileName = "";
        this.drawImagePath = general_config_1.Config.DefaultAvatar;
        this.imageFormControl = new forms_1.FormControl('');
        this.canvasSize = enum_config_1.ImageCanvasSizeEnum.small;
        this.teamMgmtForm = this._formBuilder.group({
            "teamMemberName": ['', forms_1.Validators.required],
            "email": ['', forms_1.Validators.compose([forms_1.Validators.required, validation_service_1.ValidationService.emailValidator])],
            "imageFormControl": this.imageFormControl,
            designation: ['', forms_1.Validators.required],
            address: [''],
            description: [''],
            fbUrl: ['', validation_service_1.ValidationService.urlValidator],
            twitterUrl: ['', validation_service_1.ValidationService.urlValidator],
            gplusUrl: ['', validation_service_1.ValidationService.urlValidator],
            linkendinUrl: ['', validation_service_1.ValidationService.urlValidator],
            active: ['']
        });
    }
    TeamManagementEditorComponent.prototype.ngAfterViewInit = function () {
        if (!this.memberId)
            this.drawImageToCanvas(general_config_1.Config.DefaultAvatar);
    };
    TeamManagementEditorComponent.prototype.ngOnInit = function () {
        if (this.memberId)
            this.getTeamMemberDetail();
    };
    TeamManagementEditorComponent.prototype.getTeamMemberDetail = function () {
        var _this = this;
        this._objService.getTeamMemberDetail(this.memberId)
            .subscribe(function (res) { return _this.bindDetail(res); }, function (error) { return _this.errorMessage(error); });
    };
    TeamManagementEditorComponent.prototype.bindDetail = function (objRes) {
        this.objTeam = objRes;
        var path = "";
        if (this.objTeam.imageName) {
            var cl = general_config_1.Config.Cloudinary;
            path = cl.url(this.objTeam.imageName);
        }
        else
            path = general_config_1.Config.DefaultAvatar;
        this.drawImageToCanvas(path);
    };
    TeamManagementEditorComponent.prototype.saveTeamMember = function () {
        var _this = this;
        this.isSubmitted = true;
        if (this.teamMgmtForm.valid) {
            if (!this.memberId) {
                this._objService.saveTeamMember(this.objTeam, this.file)
                    .subscribe(function (res) { return _this.resStatusMessage(res); }, function (error) { return _this.errorMessage(error); });
            }
            else {
                this._objService.updateTeamMember(this.objTeam, this.file, this.imageDeleted)
                    .subscribe(function (res) { return _this.resStatusMessage(res); }, function (error) { return _this.errorMessage(error); });
            }
        }
    };
    TeamManagementEditorComponent.prototype.resStatusMessage = function (objSave) {
        this.showListEvent.emit(false); // is Form Canceled
        jQuery.jAlert({
            'title': 'Success',
            'content': objSave.message,
            'theme': 'green'
        });
    };
    TeamManagementEditorComponent.prototype.triggerCancelForm = function () {
        var isCanceled = true;
        this.showListEvent.emit(isCanceled);
    };
    TeamManagementEditorComponent.prototype.errorMessage = function (objResponse) {
        jQuery.jAlert({
            'title': 'Alert',
            'content': objResponse.message,
            'theme': 'red'
        });
    };
    /*Image handler */
    TeamManagementEditorComponent.prototype.changeFile = function (args) {
        this.file = args;
        if (this.file) {
        }
        this.fileName = this.file.name;
    };
    TeamManagementEditorComponent.prototype.drawImageToCanvas = function (path) {
        this.drawImagePath = path;
    };
    TeamManagementEditorComponent.prototype.deleteImage = function (id) {
        var _this = this;
        jQuery.jAlert({
            'type': 'confirm',
            'title': 'Alert',
            'confirmQuestion': 'Are you sure to delete the Image ?',
            'theme': 'red',
            'onConfirm': function (e, btn) {
                e.preventDefault();
                _this._objService.deleteImage(_this.objTeam.imageName, _this.objTeam.imageProperties.imageExtension, _this.objTeam.imageProperties.imagePath)
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
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], TeamManagementEditorComponent.prototype, "memberId", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], TeamManagementEditorComponent.prototype, "showListEvent", void 0);
    TeamManagementEditorComponent = __decorate([
        core_1.Component({
            selector: 'team-management-editor',
            templateUrl: 'admin-templates/team-management/team-management-editor.html',
            directives: [control_valdation_message_component_1.FormControlMessages, image_uploader_component_1.ImageUploader],
        }), 
        __metadata('design:paramtypes', [team_managment_service_1.TeamManagementService, forms_1.FormBuilder])
    ], TeamManagementEditorComponent);
    return TeamManagementEditorComponent;
}());
exports.TeamManagementEditorComponent = TeamManagementEditorComponent;
//# sourceMappingURL=team-management-editor.component.js.map