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
var validation_service_1 = require("../../../shared/services/validation.service");
var general_config_1 = require("../../../shared/configs/general.config");
var enum_config_1 = require("../../../shared/configs/enum.config");
var forms_1 = require("@angular/forms");
var security_question_config_1 = require('../../../shared/configs/security-question.config');
var role_service_1 = require("../role-management/role.service");
var UserRegistrationComponent = (function () {
    function UserRegistrationComponent(_objUserService, _formBuilder, roleService) {
        this._objUserService = _objUserService;
        this._formBuilder = _formBuilder;
        this.roleService = roleService;
        // @Input() userId:string;
        // @Input objUser:UserModel;
        this.showListEvent = new core_1.EventEmitter();
        this.objUser = new user_model_1.UserModel();
        this.isSubmitted = false;
        this.objRoleList = [];
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
            "securityQuestion": ['', forms_1.Validators.required],
            "securityAnswer": ['', forms_1.Validators.required],
            "password": ['', forms_1.Validators.compose([forms_1.Validators.required, validation_service_1.ValidationService.passwordValidator])],
            "confirmPassword": ['', forms_1.Validators.required],
            imageFormControl: this.imageFormControl,
            middleName: [''],
            userRole: ['']
        }, {
            validator: validation_service_1.ValidationService.matchingPasswords('password', 'confirmPassword')
        });
    }
    UserRegistrationComponent.prototype.ngOnInit = function () {
        this.getRoleList();
    };
    UserRegistrationComponent.prototype.getRoleList = function () {
        var _this = this;
        this.roleService.getRoleList(true) /*get active role*/
            .subscribe(function (objRes) { return _this.objRoleList = objRes; }, function (err) { return _this.errorMessage(err); });
    };
    UserRegistrationComponent.prototype.saveUser = function () {
        var _this = this;
        this.isSubmitted = true;
        if (this.userForm.valid) {
            this._objUserService.registerUser(this.objUser, this.file)
                .subscribe(function (resUser) { return _this.saveUserStatusMessage(resUser); }, function (error) { return _this.errorMessage(error); });
        }
    };
    UserRegistrationComponent.prototype.errorMessage = function (objResponse) {
        jQuery.jAlert({
            'title': 'Alert',
            'content': objResponse.message,
            'theme': 'red'
        });
    };
    UserRegistrationComponent.prototype.saveUserStatusMessage = function (objUser) {
        jQuery.jAlert({
            'title': 'Success',
            'content': 'User Registered Successfully',
            'theme': 'green'
        });
        this.showListEvent.emit(false); //isCancel false
    };
    UserRegistrationComponent.prototype.triggerCancelForm = function () {
        var isCancel = true;
        this.showListEvent.emit(isCancel);
    };
    /*Image handler */
    UserRegistrationComponent.prototype.changeFile = function (args) {
        this.file = args;
        if (this.file)
            this.fileName = this.file.name;
    };
    UserRegistrationComponent.prototype.drawImageToCanvas = function (path) {
        this.drawImagePath = path;
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], UserRegistrationComponent.prototype, "showListEvent", void 0);
    UserRegistrationComponent = __decorate([
        core_1.Component({
            selector: 'user-form',
            templateUrl: 'admin-templates/user-management/user-form.html'
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService, forms_1.FormBuilder, role_service_1.RoleService])
    ], UserRegistrationComponent);
    return UserRegistrationComponent;
}());
exports.UserRegistrationComponent = UserRegistrationComponent;
//# sourceMappingURL=user-registration.component.js.map