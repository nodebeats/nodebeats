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
var role_service_1 = require("./role.service");
var role_model_1 = require("./role.model");
var RoleComponent = (function () {
    function RoleComponent(_objService) {
        this._objService = _objService;
        this.showForm = false;
        // /* Pagination */
        this.perPage = 10;
        this.currentPage = 1;
        this.totalPage = 1;
        this.nextPage = 1;
        this.preIndex = 0;
    }
    // /* End Pagination */
    RoleComponent.prototype.ngOnInit = function () {
        this.getRoleList();
    };
    RoleComponent.prototype.getRoleList = function () {
        var _this = this;
        this._objService.getRoleList()
            .subscribe(function (objRes) { return _this.bindList(objRes); }, function (error) { return _this.errorMessage(error); });
    };
    RoleComponent.prototype.errorMessage = function (objResponse) {
        jQuery.jAlert({
            'title': 'Alert',
            'content': objResponse.message,
            'theme': 'red'
        });
    };
    RoleComponent.prototype.bindList = function (objRes) {
        this.objListResponse = objRes;
        /* Pagination */
        this.preIndex = (this.perPage * (this.currentPage - 1));
        if (objRes.length > 0) {
            /*End Pagination */
            setTimeout(function () {
                jQuery('.tablesorter').tablesorter({
                    headers: {
                        2: { sorter: false },
                        3: { sorter: false },
                        4: { sorter: false },
                        5: { sorter: false },
                        6: { sorter: false },
                        7: { sorter: false },
                        8: { sorter: false }
                    }
                });
            }, 50);
        }
    };
    RoleComponent.prototype.edit = function (id) {
        this.showForm = true;
        this.roleId = id;
    };
    RoleComponent.prototype.addRole = function () {
        this.showForm = true;
        this.roleId = null;
    };
    RoleComponent.prototype.delete = function (id) {
        var _this = this;
        jQuery.jAlert({
            'type': 'confirm',
            'title': 'Alert',
            'confirmQuestion': 'Are you sure to delete the Image ?',
            'theme': 'red',
            'onConfirm': function (e, btn) {
                e.preventDefault();
                var objRole = new role_model_1.RoleModel();
                objRole._id = id;
                objRole.deleted = true;
                _this._objService.deleteRole(objRole)
                    .subscribe(function (res) {
                    _this.getRoleList();
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
    RoleComponent.prototype.showRoleList = function (arg) {
        if (!arg)
            this.getRoleList();
        this.showForm = false;
    };
    RoleComponent = __decorate([
        core_1.Component({
            selector: 'role-list',
            templateUrl: 'admin-templates/role/role-list.html'
        }), 
        __metadata('design:paramtypes', [role_service_1.RoleService])
    ], RoleComponent);
    return RoleComponent;
}());
exports.RoleComponent = RoleComponent;
//# sourceMappingURL=role-list.component.js.map