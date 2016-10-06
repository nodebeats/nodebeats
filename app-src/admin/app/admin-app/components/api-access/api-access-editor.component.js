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
var api_access_model_1 = require("./api-access.model");
var api_access_service_1 = require("./api-access.service");
var forms_1 = require("@angular/forms");
var role_service_1 = require("../role-management/role.service");
var ApiAccessEditorComponent = (function () {
    function ApiAccessEditorComponent(_objService, roleService, _formBuilder) {
        this._objService = _objService;
        this.roleService = roleService;
        this._formBuilder = _formBuilder;
        this.objApiAccess = new api_access_model_1.ApiAccessModel();
        this.isSubmitted = false;
        this.objRoleList = [];
        this.objSelectedRole = null;
        this.showListEvent = new core_1.EventEmitter();
        this.apiAccessForm = this._formBuilder.group({
            "routeApi": ['', forms_1.Validators.required],
            "roleName": ['', forms_1.Validators.required],
            "active": ['']
        });
        this.objRoleList = [];
    }
    ApiAccessEditorComponent.prototype.ngOnInit = function () {
        this.getRoleList();
    };
    ApiAccessEditorComponent.prototype.getRoleList = function () {
        var _this = this;
        this.roleService.getRoleList(true) /*get active role*/
            .subscribe(function (objResList) {
            var roles = [];
            if (objResList.length > 0) {
                roles = objResList.map(function (objRole) {
                    return { label: objRole.roleName, value: objRole.roleName };
                    //return objRole.roleName;
                });
                _this.objRoleList = roles;
                if (_this.accessId)
                    _this.getAccessDetail();
            }
        }, function (err) { return _this.errorMessage(err); });
    };
    ApiAccessEditorComponent.prototype.getAccessDetail = function () {
        var _this = this;
        this._objService.getAccessDetail(this.accessId)
            .subscribe(function (res) {
            _this.objApiAccess = res;
            _this.objSelectedRole = (res.roleName).split(',');
        }, function (error) { return _this.errorMessage(error); });
    };
    ApiAccessEditorComponent.prototype.saveApiAccess = function () {
        var _this = this;
        this.isSubmitted = true;
        if (this.apiAccessForm.valid) {
            var selectedRole = "";
            var objAccessSave = new api_access_model_1.ApiAccessModel();
            objAccessSave = this.objApiAccess;
            if (this.apiAccessForm.controls["roleName"].value) {
                selectedRole = this.apiAccessForm.controls["roleName"].value.join(",");
                objAccessSave.roleName = selectedRole;
            }
            if (!this.accessId) {
                this._objService.saveAccess(objAccessSave)
                    .subscribe(function (res) { return _this.resStatusMessage(res); }, function (error) { return _this.errorMessage(error); });
            }
            else {
                this._objService.updateAccess(objAccessSave)
                    .subscribe(function (res) { return _this.resStatusMessage(res); }, function (error) { return _this.errorMessage(error); });
            }
        }
    };
    ApiAccessEditorComponent.prototype.resStatusMessage = function (res) {
        this.showListEvent.emit(false); // * isCanceled = false
        jQuery.jAlert({
            'title': 'Success',
            'content': res.message,
            'theme': 'green'
        });
    };
    ApiAccessEditorComponent.prototype.errorMessage = function (objResponse) {
        jQuery.jAlert({
            'title': 'Alert',
            'content': objResponse.message,
            'theme': 'red'
        });
    };
    ApiAccessEditorComponent.prototype.triggerCancelForm = function () {
        var isCanceled = true;
        this.showListEvent.emit(isCanceled);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ApiAccessEditorComponent.prototype, "accessId", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], ApiAccessEditorComponent.prototype, "showListEvent", void 0);
    ApiAccessEditorComponent = __decorate([
        core_1.Component({
            selector: 'api-access-editor',
            templateUrl: 'admin-templates/api-access/api-access-editor.html'
        }), 
        __metadata('design:paramtypes', [api_access_service_1.ApiAccessService, role_service_1.RoleService, forms_1.FormBuilder])
    ], ApiAccessEditorComponent);
    return ApiAccessEditorComponent;
}());
exports.ApiAccessEditorComponent = ApiAccessEditorComponent;
//# sourceMappingURL=api-access-editor.component.js.map