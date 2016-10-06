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
var role_model_1 = require("./role.model");
var role_service_1 = require("./role.service");
var forms_1 = require("@angular/forms");
var RoleEditorComponent = (function () {
    function RoleEditorComponent(_objService, _formBuilder) {
        this._objService = _objService;
        this._formBuilder = _formBuilder;
        this.objRole = new role_model_1.RoleModel();
        this.isSubmitted = false;
        this.showListEvent = new core_1.EventEmitter();
        this.roleForm = this._formBuilder.group({
            "roleName": ['', forms_1.Validators.required],
            "read": [''],
            "create": [''],
            "write": [''],
            "delete": [''],
            "change": [''],
            "active": ['']
        });
    }
    RoleEditorComponent.prototype.ngOnInit = function () {
        if (this.roleId)
            this.getRoleDetail();
    };
    RoleEditorComponent.prototype.getRoleDetail = function () {
        var _this = this;
        this._objService.getRoleDetail(this.roleId)
            .subscribe(function (res) {
            _this.objRole = res;
        }, function (error) { return _this.errorMessage(error); });
    };
    RoleEditorComponent.prototype.saveRole = function () {
        var _this = this;
        this.isSubmitted = true;
        if (this.roleForm.valid) {
            if (!this.roleId) {
                this._objService.saveRole(this.objRole)
                    .subscribe(function (res) { return _this.resStatusMessage(res); }, function (error) { return _this.errorMessage(error); });
            }
            else {
                this._objService.updateRole(this.objRole)
                    .subscribe(function (res) { return _this.resStatusMessage(res); }, function (error) { return _this.errorMessage(error); });
            }
        }
    };
    RoleEditorComponent.prototype.resStatusMessage = function (res) {
        this.showListEvent.emit(false); // * isCanceled = false
        jQuery.jAlert({
            'title': 'Success',
            'content': res.message,
            'theme': 'green'
        });
    };
    RoleEditorComponent.prototype.errorMessage = function (objResponse) {
        jQuery.jAlert({
            'title': 'Alert',
            'content': objResponse.message,
            'theme': 'red'
        });
    };
    RoleEditorComponent.prototype.triggerCancelForm = function () {
        var isCanceled = true;
        this.showListEvent.emit(isCanceled);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], RoleEditorComponent.prototype, "roleId", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], RoleEditorComponent.prototype, "showListEvent", void 0);
    RoleEditorComponent = __decorate([
        core_1.Component({
            selector: 'role-editor',
            templateUrl: 'admin-templates/role/role-editor.html'
        }), 
        __metadata('design:paramtypes', [role_service_1.RoleService, forms_1.FormBuilder])
    ], RoleEditorComponent);
    return RoleEditorComponent;
}());
exports.RoleEditorComponent = RoleEditorComponent;
//# sourceMappingURL=role-editor.component.js.map