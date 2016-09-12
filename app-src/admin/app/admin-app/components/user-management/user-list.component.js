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
var user_registration_component_1 = require("./user-registration.component");
var user_management_component_1 = require('./user-management.component');
var user_view_component_1 = require("./user-view.component");
var user_edit_component_1 = require("./user-edit.component");
var primeng_1 = require('primeng/primeng');
var UserListComponent = (function () {
    function UserListComponent(_objUserService) {
        this._objUserService = _objUserService;
        this.objUser = new user_model_1.UserModel();
        this.showForm = false;
        this.isEdit = false;
        this.showInfo = false;
        this.changePassword = false;
        this.showManage = false;
        /* Pagination */
        this.perPage = 10;
        this.currentPage = 1;
        this.totalPage = 1;
        this.nextPage = 1;
        this.preIndex = 0;
    }
    /* End Pagination */
    UserListComponent.prototype.ngOnInit = function () {
        this.perPage = 10;
        this.currentPage = 1;
        this.getUserList();
    };
    UserListComponent.prototype.getUserList = function () {
        var _this = this;
        this._objUserService.getUserList(this.perPage, this.currentPage)
            .subscribe(function (resUser) { return _this.bindList(resUser); }, function (error) { return _this.errorMessage(error); });
    };
    UserListComponent.prototype.errorMessage = function (objResponse) {
        jQuery.jAlert({
            'title': 'Alert',
            'content': objResponse.message,
            'theme': 'red'
        });
    };
    UserListComponent.prototype.bindList = function (objRes) {
        this.objResponse = objRes;
        this.preIndex = (this.perPage * (this.currentPage - 1));
        if (objRes.dataList.length > 0) {
            var totalPage = objRes.totalItems / this.perPage;
            this.totalPage = totalPage > 1 ? Math.ceil(totalPage) : 1;
            setTimeout(function () {
                jQuery('.tablesorter').tablesorter({
                    headers: {
                        5: { sorter: false },
                        7: { sorter: false }
                    }
                });
            }, 50);
        }
    };
    UserListComponent.prototype.addUser = function () {
        this.hideAll();
        this.objUser = null;
        this.userId = null;
        this.showForm = true;
    };
    UserListComponent.prototype.getForm = function () {
        this.hideAll();
        this.showForm = true;
    };
    // updatePassword(userId:string) {
    //     this.hideAll();
    //     this.changePassword = true;
    //     this.userId = userId;
    // }
    UserListComponent.prototype.manage = function (indexOfUser) {
        this.hideAll();
        this.showManage = true;
        this.objUser = this.objResponse.dataList[indexOfUser];
    };
    UserListComponent.prototype.showUserDetail = function (userId) {
        this.hideAll();
        this.userId = userId;
        this.showInfo = true;
    };
    UserListComponent.prototype.handleList = function (args) {
        if (!args)
            this.getUserList();
        this.hideAll();
    };
    UserListComponent.prototype.handleFormCancel = function (arg) {
        this.showForm = false;
        //   this.isEdit = false;
    };
    UserListComponent.prototype.handleSaveSuccess = function (arg) {
        this.clearAll();
        this.getUserList();
        this.hideAll();
        //   this.isEdit = false;
    };
    UserListComponent.prototype.handleEdit = function (arg) {
        this.userId = arg.userId;
        this.hideAll();
        this.isEdit = arg.isEdit;
        //  this.showForm = arg.showForm;
    };
    UserListComponent.prototype.editUser = function (userId) {
        this.hideAll();
        // this.showForm = true;
        this.isEdit = true;
        this.userId = userId;
    };
    UserListComponent.prototype.pageChanged = function (event) {
        this.perPage = event.rows;
        this.currentPage = (Math.floor(event.first / event.rows)) + 1;
        this.getUserList();
        jQuery(".tablesorter").trigger("update");
    };
    UserListComponent.prototype.hideAll = function () {
        this.showManage = false;
        this.showForm = false;
        this.showInfo = false;
        this.isEdit = false;
        this.changePassword = false;
    };
    UserListComponent.prototype.clearAll = function () {
        this.currentPage = 1;
        this.objUser = null;
    };
    UserListComponent = __decorate([
        core_1.Component({
            selector: 'admin-user',
            templateUrl: 'admin-templates/user-management/user-list.html',
            providers: [user_service_1.UserService],
            directives: [primeng_1.Paginator, user_registration_component_1.UserRegistrationComponent, user_view_component_1.UserViewComponent, user_edit_component_1.UserEditComponent, user_management_component_1.UserManagementComponent],
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService])
    ], UserListComponent);
    return UserListComponent;
}());
exports.UserListComponent = UserListComponent;
//# sourceMappingURL=user-list.component.js.map