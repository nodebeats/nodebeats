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
var application_log_service_1 = require("./application-log.service");
var application_log_model_1 = require("./application-log.model");
var primeng_1 = require('primeng/primeng');
var moment = require('moment');
var primeng_2 = require("primeng/primeng");
var forms_1 = require("@angular/forms");
var ApplicationLogComponent = (function () {
    function ApplicationLogComponent(_objService, ele) {
        this._objService = _objService;
        this.ele = ele;
        this.objLog = new application_log_model_1.ApplicationLogModel();
        this.objResponse = new application_log_model_1.ApplicationLogResponse();
        this.showModal = false;
        /* Pagination */
        this.perPage = 10;
        this.currentPage = 1;
        this.totalPage = 1;
        this.nextPage = 1;
        this.preIndex = 1;
        this.startDate = new forms_1.FormControl('');
        this.endDate = new forms_1.FormControl('');
    }
    /* End Pagination */
    ApplicationLogComponent.prototype.ngOnInit = function () {
        this.perPage = 10;
        this.currentPage = 1;
        this.getApplicationLogList();
    };
    ApplicationLogComponent.prototype.getApplicationLogList = function () {
        var _this = this;
        this._objService.getApplicationLog(this.perPage, this.currentPage)
            .subscribe(function (objRes) { return _this.bindList(objRes); }, function (error) { return _this.errorMessage(error); });
    };
    ApplicationLogComponent.prototype.errorMessage = function (objResponse) {
        jQuery.jAlert({
            'title': 'Alert',
            'content': objResponse.message,
            'theme': 'red'
        });
    };
    ApplicationLogComponent.prototype.bindList = function (objRes) {
        var _this = this;
        this.objResponse = objRes;
        this.preIndex = (this.perPage * (this.currentPage - 1));
        if (objRes.totalItems > 0) {
            var totalPage = objRes.totalItems / this.perPage;
            this.totalPage = totalPage > 1 ? Math.ceil(totalPage) : 1;
            setTimeout(function () {
                jQuery(_this.ele.nativeElement).find('.tablesorter').tablesorter({
                    headers: {
                        4: { sorter: false }
                    }
                });
            }, 50);
        }
    };
    ApplicationLogComponent.prototype.showDetail = function (logIndex) {
        var objTemp;
        objTemp = this.objResponse.dataList[logIndex];
        if (objTemp) {
            //  objTemp.addedOn = this.changeDateFormat(objTemp.addedOn);
            this.objLog = objTemp;
            this.showModal = true;
        }
    };
    ApplicationLogComponent.prototype.changeDateFormat = function (date) {
        return moment(date).format('YYYY-MM-DD HH:mm:ss');
    };
    ApplicationLogComponent.prototype.deleteLogById = function (id) {
        var _this = this;
        jQuery.jAlert({
            'type': 'confirm',
            'title': 'Alert',
            'confirmQuestion': 'Are you sure to delete the Log ?',
            'theme': 'red',
            'onConfirm': function (e, btn) {
                e.preventDefault();
                var objTemp = new application_log_model_1.ApplicationLogModel();
                objTemp._id = id;
                objTemp.deleted = true;
                _this._objService.deleteLogById(objTemp)
                    .subscribe(function (res) {
                    _this.getApplicationLogList();
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
    ApplicationLogComponent.prototype.deleteAllLog = function () {
        var _this = this;
        jQuery.jAlert({
            'type': 'confirm',
            'title': 'Alert',
            'confirmQuestion': 'Are you sure to delete all the Log ?',
            'theme': 'red',
            'onConfirm': function (e, btn) {
                e.preventDefault();
                _this._objService.deleteAllLog()
                    .subscribe(function (res) {
                    _this.getApplicationLogList();
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
    ApplicationLogComponent.prototype.search = function () {
        var _this = this;
        this._objService.getApplicationLog(this.perPage, this.currentPage, this.startDate.value, this.endDate.value)
            .subscribe(function (objRes) { return _this.bindList(objRes); }, function (error) { return _this.errorMessage(error); });
    };
    ApplicationLogComponent.prototype.sendEmailToSupport = function () {
        var _this = this;
        this._objService.sendLogEmailToSupport()
            .subscribe(function (objRes) {
            _this.resStatusMessage(objRes);
            _this.getApplicationLogList();
        }, function (error) { return _this.errorMessage(error); });
    };
    ApplicationLogComponent.prototype.resStatusMessage = function (res) {
        jQuery.jAlert({
            'title': 'Success',
            'content': res.message,
            'theme': 'green'
        });
    };
    ApplicationLogComponent.prototype.pageChanged = function (event) {
        this.perPage = event.rows;
        this.currentPage = (Math.floor(event.first / event.rows)) + 1;
        this.getApplicationLogList();
        jQuery(".tablesorter").trigger("update");
    };
    ApplicationLogComponent = __decorate([
        core_1.Component({
            selector: 'application-log-list',
            templateUrl: 'admin-templates/application-log/application-log.html',
            providers: [application_log_service_1.ApplicationLogService],
            directives: [primeng_1.Paginator, primeng_1.Dialog, primeng_2.Calendar]
        }), 
        __metadata('design:paramtypes', [application_log_service_1.ApplicationLogService, core_1.ElementRef])
    ], ApplicationLogComponent);
    return ApplicationLogComponent;
}());
exports.ApplicationLogComponent = ApplicationLogComponent;
//# sourceMappingURL=application-log-list.component.js.map