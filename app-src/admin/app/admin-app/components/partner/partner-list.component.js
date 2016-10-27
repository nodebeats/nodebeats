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
var partner_service_1 = require("./partner.service");
var partner_model_1 = require("./partner.model");
var PartnerComponent = (function () {
    function PartnerComponent(_objService) {
        this._objService = _objService;
        this.objListResponse = new partner_model_1.PartnerResponse();
        this.showForm = false;
        // /* Pagination */
        this.perPage = 10;
        this.currentPage = 1;
        this.totalPage = 1;
        this.first = 0;
        this.bindSort = false;
        this.preIndex = 0;
    }
    // /* End Pagination */
    PartnerComponent.prototype.ngOnInit = function () {
        this.getPartnerList();
    };
    PartnerComponent.prototype.getPartnerList = function () {
        var _this = this;
        this._objService.getPartnerList()
            .subscribe(function (objRes) { return _this.bindList(objRes); }, function (error) { return _this.errorMessage(error); });
    };
    PartnerComponent.prototype.errorMessage = function (objResponse) {
        jQuery.jAlert({
            'title': 'Alert',
            'content': objResponse.message,
            'theme': 'red'
        });
    };
    PartnerComponent.prototype.bindList = function (objRes) {
        this.objListResponse = objRes;
        /* Pagination */
        this.preIndex = (this.perPage * (this.currentPage - 1));
        if (objRes.dataList.length > 0) {
            var totalPage = objRes.totalItems / this.perPage;
            this.totalPage = totalPage > 1 ? Math.ceil(totalPage) : 1;
            this.sortTable();
        }
    };
    PartnerComponent.prototype.sortTable = function () {
        setTimeout(function () {
            jQuery('.tablesorter').tablesorter({
                headers: {
                    2: { sorter: false },
                    3: { sorter: false }
                }
            });
        }, 50);
    };
    PartnerComponent.prototype.edit = function (id) {
        this.showForm = true;
        this.partnerId = id;
    };
    PartnerComponent.prototype.addPartner = function () {
        this.showForm = true;
        this.partnerId = null;
    };
    PartnerComponent.prototype.delete = function (id) {
        var _this = this;
        jQuery.jAlert({
            'type': 'confirm',
            'title': 'Alert',
            'confirmQuestion': 'Are you sure to delete the Image ?',
            'theme': 'red',
            'onConfirm': function (e, btn) {
                e.preventDefault();
                var objPartner = new partner_model_1.PartnerModel();
                objPartner._id = id;
                objPartner.deleted = true;
                _this._objService.deletePartner(objPartner)
                    .subscribe(function (res) {
                    _this.getPartnerList();
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
    PartnerComponent.prototype.showPartnerList = function (arg) {
        if (!arg)
            this.getPartnerList();
        this.showForm = false;
        this.sortTable();
    };
    PartnerComponent = __decorate([
        core_1.Component({
            selector: 'partner-list',
            templateUrl: 'admin-templates/partner/partner-list.html'
        }), 
        __metadata('design:paramtypes', [partner_service_1.PartnerService])
    ], PartnerComponent);
    return PartnerComponent;
}());
exports.PartnerComponent = PartnerComponent;
//# sourceMappingURL=partner-list.component.js.map