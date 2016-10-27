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
var token_manangement_service_1 = require("./token-manangement.service");
var token_managment_model_1 = require("./token-managment.model");
var moment = require('moment');
var forms_1 = require("@angular/forms");
var login_service_1 = require('../../../login-app/components/login/login.service');
var router_1 = require("@angular/router");
var TokenManagementComponent = (function () {
    function TokenManagementComponent(_objService, router, ele, loginService) {
        this._objService = _objService;
        this.router = router;
        this.ele = ele;
        this.loginService = loginService;
        this.objToken = new token_managment_model_1.TokenModel();
        this.objResponse = [];
        this.showModal = false;
        /* Pagination */
        this.perPage = 10;
        this.currentPage = 1;
        this.totalPage = 1;
        this.first = 0;
        this.preIndex = 1;
        this.totalItem = 0;
        this.startDate = new forms_1.FormControl('');
        this.endDate = new forms_1.FormControl('');
    }
    /* End Pagination */
    TokenManagementComponent.prototype.ngOnInit = function () {
        this.perPage = 10;
        this.currentPage = 1;
        this.getApplicationLogList();
    };
    TokenManagementComponent.prototype.getApplicationLogList = function () {
        var _this = this;
        this._objService.getApplicationLog()
            .subscribe(function (objRes) { return _this.bindList(objRes); }, function (error) { return _this.errorMessage(error); });
    };
    TokenManagementComponent.prototype.errorMessage = function (TokenResponse) {
        jQuery.jAlert({
            'title': 'Alert',
            'content': TokenResponse.message,
            'theme': 'red'
        });
    };
    TokenManagementComponent.prototype.bindList = function (objRes) {
        this.objResponse = objRes;
        this.totalItem = objRes.length;
        this.preIndex = (this.perPage * (this.currentPage - 1));
        if (this.objResponse) {
            // let totalPage = objRes.totalItems / this.perPage;
            // this.totalPage = totalPage > 1 ? Math.ceil(totalPage) : 1;
            this.sortTable();
        }
    };
    TokenManagementComponent.prototype.sortTable = function () {
        var _this = this;
        setTimeout(function () {
            jQuery(_this.ele.nativeElement).find('.tablesorter').tablesorter({
                headers: {
                    1: { sorter: false },
                    2: { sorter: false },
                    4: { sorter: false }
                }
            });
        }, 50);
    };
    TokenManagementComponent.prototype.showDetail = function (logIndex) {
        var objTemp;
        objTemp = this.objResponse[logIndex];
        if (objTemp) {
            //  objTemp.addedOn = this.changeDateFormat(objTemp.addedOn);
            this.objToken = objTemp;
            this.showModal = true;
        }
    };
    TokenManagementComponent.prototype.changeDateFormat = function (date) {
        if (date)
            return moment(date).format("ddd, Do MMM YYYY, hh:mm:ss a");
    };
    TokenManagementComponent.prototype.deleteLogById = function (id) {
        var _this = this;
        jQuery.jAlert({
            'type': 'confirm',
            'title': 'Alert',
            'confirmQuestion': 'Are you sure to delete the Token ?',
            'theme': 'red',
            'onConfirm': function (e, btn) {
                e.preventDefault();
                var objTemp = new token_managment_model_1.TokenModel();
                objTemp._id = id;
                _this._objService.deleteLogById(objTemp)
                    .subscribe(function (res) {
                    if (_this.totalItem > 1)
                        _this.getApplicationLogList();
                    else
                        _this.totalItem = 0;
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
            },
            'onClose': function (e, btn) {
                if (_this.totalItem == 0) {
                    _this.loginService.logout();
                    _this.router.navigate(['/login']);
                }
            }
        });
    };
    TokenManagementComponent.prototype.deleteAllLog = function () {
        var _this = this;
        jQuery.jAlert({
            'type': 'confirm',
            'title': 'Alert',
            'confirmQuestion': 'Are you sure to delete all the Token ?',
            'theme': 'red',
            'onConfirm': function (e, btn) {
                e.preventDefault();
                _this._objService.deleteAllLog()
                    .subscribe(function (res) {
                    jQuery.jAlert({
                        'title': 'Success',
                        'content': res.message,
                        'theme': 'green',
                        'onClose': function () {
                            _this.loginService.logout();
                            _this.router.navigate(['/login']);
                        }
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
    TokenManagementComponent.prototype.resStatusMessage = function (res) {
        jQuery.jAlert({
            'title': 'Success',
            'content': res.message,
            'theme': 'green'
        });
    };
    TokenManagementComponent.prototype.pageChanged = function (event) {
        this.perPage = event.rows;
        this.currentPage = (Math.floor(event.first / event.rows)) + 1;
        this.first = event.first;
        if (event.first == 0)
            this.first = 1;
        this.getApplicationLogList();
    };
    TokenManagementComponent = __decorate([
        core_1.Component({
            selector: 'token-list',
            templateUrl: 'admin-templates/token-management/token-management.html',
        }), 
        __metadata('design:paramtypes', [token_manangement_service_1.TokenManagementService, router_1.Router, core_1.ElementRef, login_service_1.LoginService])
    ], TokenManagementComponent);
    return TokenManagementComponent;
}());
exports.TokenManagementComponent = TokenManagementComponent;
//# sourceMappingURL=token-management.component.js.map