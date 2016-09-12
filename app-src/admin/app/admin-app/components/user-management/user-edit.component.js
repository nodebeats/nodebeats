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
var user_service_1 = require("./user.service");
var user_model_1 = require("./user.model");
var control_valdation_message_component_1 = require("../../../shared/components/control-valdation-message.component");
var validation_service_1 = require("../../../shared/services/validation.service");
var general_config_1 = require("../../../shared/configs/general.config");
var enum_config_1 = require('../../../shared/configs/enum.config');
var image_uploader_component_1 = require("../../../shared/components/image-uploader.component");
var forms_1 = require("@angular/forms");
var primeng_1 = require('primeng/primeng');
var security_question_config_1 = require("../../../shared/configs/security-question.config");
var UserEditComponent = (function () {
    function UserEditComponent(_objUserService, _formBuilder) {
        this._objUserService = _objUserService;
        this._formBuilder = _formBuilder;
        // @Input objUser:UserModel;
        this.showListEvent = new core_1.EventEmitter();
        this.objUser = new user_model_1.UserModel();
        this.isSubmitted = false;
        /* Image Upload Handle*/
        this.imageDeleted = false;
        this.fileName = "";
        this.drawImagePath = general_config_1.Config.DefaultAvatar;
        this.imageFormControl = new forms_1.FormControl('');
        this.canvasSize = enum_config_1.ImageCanvasSizeEnum.small;
        /* End Image Upload handle */
        this.questionlist = security_question_config_1.QUESTION_LIST;
        this.userForm = this._formBuilder.group({
            "firstName": ['', forms_1.Validators.required],
            "lastName": ['', forms_1.Validators.required],
            "email": ['', forms_1.Validators.compose([forms_1.Validators.required, validation_service_1.ValidationService.emailValidator])],
            "phoneNumber": ['', forms_1.Validators.minLength(7)],
            "mobileNumber": ['', forms_1.Validators.minLength(10)],
            "imageFormControl": this.imageFormControl,
            middleName: [''],
            phone: [''],
            mobile: [''],
            userRole: ['']
        });
    }
    UserEditComponent.prototype.ngOnInit = function () {
        this.getUserDetail();
    };
    UserEditComponent.prototype.getUserDetail = function () {
        var _this = this;
        this._objUserService.getUserDetail(this.userId)
            .subscribe(function (resUser) { return _this.userDetailView(resUser); }, function (error) { return _this.errorMessage(error); });
    };
    UserEditComponent.prototype.userDetailView = function (objUser) {
        this.objUser = objUser;
        var path = "";
        if (this.objUser.imageName) {
            var cl = general_config_1.Config.Cloudinary;
            path = cl.url(this.objUser.imageName);
        }
        else
            path = "/img/defaults/default_avatar.png";
        this.drawImageToCanvas(path);
    };
    UserEditComponent.prototype.saveUser = function () {
        var _this = this;
        //  this.dataUrl = canvas.toDataURL('image/png').replace(/^data:image\/\w+;base64,/, "");
        //let blob:Blob;
        //blob = this.imageHelper.b64toBlob(this.dataUrl, 'image/png', 512);
        //  this._objUserService.registerUser(this.objUser, blob)
        this.isSubmitted = true;
        this.objUser.password = "";
        if (this.userForm.valid) {
            this._objUserService.updateUser(this.objUser, this.file, this.imageDeleted)
                .subscribe(function (resUser) { return _this.saveUserStatusMessage(resUser); }, function (error) { return _this.errorMessage(error); });
        }
    };
    UserEditComponent.prototype.saveUserStatusMessage = function (objUser) {
        jQuery.jAlert({
            'title': 'Success',
            'content': 'User Updated Successfully',
            'theme': 'green'
        });
        this.showListEvent.emit(false);
    };
    UserEditComponent.prototype.errorMessage = function (objResponse) {
        jQuery.jAlert({
            'title': 'Alert',
            'content': objResponse.message,
            'theme': 'red'
        });
    };
    UserEditComponent.prototype.handleDeleteSuccess = function (resUser) {
        this.imageDeleted = true;
        this.objUser.imageName = "";
        var path = "/img/defaults/default_avatar.png";
        this.drawImageToCanvas(path);
    };
    UserEditComponent.prototype.triggerCancelForm = function () {
        var isCancel = true;
        this.showListEvent.emit(isCancel);
    };
    /*Image handler */
    UserEditComponent.prototype.changeFile = function (args) {
        this.file = args;
        if (this.file)
            this.fileName = this.file.name;
    };
    UserEditComponent.prototype.drawImageToCanvas = function (path) {
        this.drawImagePath = path;
    };
    UserEditComponent.prototype.deleteImage = function () {
        var _this = this;
        jQuery.jAlert({
            'type': 'confirm',
            'title': 'Alert',
            'confirmQuestion': 'Are you sure to delete the image ?',
            'theme': 'red',
            'onConfirm': function (e, btn) {
                e.preventDefault();
                _this._objUserService.deleteImage(_this.objUser.imageName, _this.objUser.imageProperties.imageExtension, _this.objUser.imageProperties.imagePath)
                    .subscribe(function (resUser) { return _this.handleDeleteSuccess(resUser); }, function (error) { return _this.errorMessage(error); });
            }
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], UserEditComponent.prototype, "userId", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], UserEditComponent.prototype, "showListEvent", void 0);
    UserEditComponent = __decorate([
        core_1.Component({
            selector: 'user-edit',
            templateUrl: 'admin-templates/user-management/user-form.html',
            directives: [primeng_1.Password, control_valdation_message_component_1.FormControlMessages, image_uploader_component_1.ImageUploader /*, FILE_UPLOAD_DIRECTIVES, NgClass, NgStyle, CORE_DIRECTIVES, TinyEditor*/]
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService, forms_1.FormBuilder])
    ], UserEditComponent);
    return UserEditComponent;
}());
exports.UserEditComponent = UserEditComponent;
/* End Image handler */
//# sourceMappingURL=user-edit.component.js.map