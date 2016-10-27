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
var api_access_service_1 = require("./api-access.service");
var api_access_model_1 = require("./api-access.model");
var ApiAccessComponent = (function () {
    function ApiAccessComponent(_objService) {
        this._objService = _objService;
        this.showForm = false;
        // /* Pagination */
        this.perPage = 10;
        this.currentPage = 1;
        this.totalPage = 1;
        this.first = 0;
        this.preIndex = 0;
        this.bindSort = false;
    }
    // /* End Pagination */
    ApiAccessComponent.prototype.ngOnInit = function () {
        this.getRoleList();
    };
    ApiAccessComponent.prototype.getRoleList = function () {
        var _this = this;
        this._objService.getAccessList()
            .subscribe(function (objRes) { return _this.bindList(objRes); }, function (error) { return _this.errorMessage(error); });
    };
    ApiAccessComponent.prototype.errorMessage = function (objResponse) {
        jQuery.jAlert({
            'title': 'Alert',
            'content': objResponse.message,
            'theme': 'red'
        });
    };
    ApiAccessComponent.prototype.bindList = function (objRes) {
        this.objListResponse = objRes;
        /* Pagination */
        this.preIndex = (this.perPage * (this.currentPage - 1));
        if (objRes.length > 0) {
            /*End Pagination */
            if (!this.bindSort) {
                this.bindSort = true;
                this.sortTable();
            }
        }
    };
    ApiAccessComponent.prototype.sortTable = function () {
        setTimeout(function () {
            jQuery('.tablesorter').tablesorter({
                headers: {
                    2: { sorter: false },
                    3: { sorter: false },
                    4: { sorter: false }
                }
            });
        }, 50);
    };
    ApiAccessComponent.prototype.edit = function (id) {
        this.showForm = true;
        this.accessId = id;
    };
    ApiAccessComponent.prototype.addApiAccess = function () {
        this.showForm = true;
        this.accessId = null;
    };
    ApiAccessComponent.prototype.delete = function (id) {
        var _this = this;
        jQuery.jAlert({
            'type': 'confirm',
            'title': 'Alert',
            'confirmQuestion': 'Are you sure to delete the Image ?',
            'theme': 'red',
            'onConfirm': function (e, btn) {
                e.preventDefault();
                var objRole = new api_access_model_1.ApiAccessModel();
                objRole._id = id;
                objRole.deleted = true;
                _this._objService.deleteAccess(objRole)
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
    ApiAccessComponent.prototype.showAccessList = function (arg) {
        if (!arg) {
            this.getRoleList();
        }
        this.showForm = false;
        this.sortTable();
    };
    ApiAccessComponent = __decorate([
        core_1.Component({
            selector: 'api-access-list',
            templateUrl: 'admin-templates/api-access/api-access-list.html'
        }), 
        __metadata('design:paramtypes', [api_access_service_1.ApiAccessService])
    ], ApiAccessComponent);
    return ApiAccessComponent;
}());
exports.ApiAccessComponent = ApiAccessComponent;
//# sourceMappingURL=api-access.component.js.map