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
var contact_service_1 = require("./contact.service");
var contact_model_1 = require("./contact.model");
var ContactListCompoent = (function () {
    function ContactListCompoent(_objService) {
        this._objService = _objService;
        this.objContact = new contact_model_1.ContactModel();
        this.showInfo = false;
        this.objResponse = new contact_model_1.ContactResponse();
        /* Pagination */
        this.perPage = 10;
        this.currentPage = 1;
        this.totalPage = 1;
        this.first = 0;
        this.bindSort = false;
        this.preIndex = 1;
    }
    /* End Pagination */
    ContactListCompoent.prototype.ngOnInit = function () {
        this.perPage = 10;
        this.currentPage = 1;
        this.getContactList();
    };
    ContactListCompoent.prototype.getContactList = function () {
        var _this = this;
        this._objService.getContactList(this.perPage, this.currentPage)
            .subscribe(function (objRes) { return _this.bindList(objRes); }, function (error) { return _this.errorMessage(error); });
    };
    ContactListCompoent.prototype.errorMessage = function (objResponse) {
        jQuery.jAlert({
            'title': 'Alert',
            'content': objResponse.message,
            'theme': 'red'
        });
    };
    ContactListCompoent.prototype.bindList = function (objRes) {
        this.objResponse = objRes;
        this.preIndex = (this.perPage * (this.currentPage - 1));
        if (objRes.totalItems > 0) {
            var totalPage = objRes.totalItems / this.perPage;
            this.totalPage = totalPage > 1 ? Math.ceil(totalPage) : 1;
            if (!this.bindSort) {
                this.bindSort = true;
                this.sortTable();
            }
            else
                jQuery("table").trigger("update", [true]);
        }
    };
    ContactListCompoent.prototype.sortTable = function () {
        setTimeout(function () {
            jQuery('.tablesorter').tablesorter({
                headers: {
                    3: { sorter: false },
                    4: { sorter: false }
                }
            });
        }, 50);
    };
    ContactListCompoent.prototype.delete = function (id) {
        var _this = this;
        jQuery.jAlert({
            'type': 'confirm',
            'title': 'Alert',
            'confirmQuestion': 'Are you sure to delete the Contact ?',
            'theme': 'red',
            'onConfirm': function (e, btn) {
                e.preventDefault();
                var objTemp = new contact_model_1.ContactModel();
                objTemp._id = id;
                objTemp.deleted = true;
                _this._objService.deleteContact(objTemp)
                    .subscribe(function (res) {
                    _this.getContactList();
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
    ContactListCompoent.prototype.showDetail = function (id) {
        this.showInfo = true;
        this.contactId = id;
    };
    ContactListCompoent.prototype.handleCancel = function (args) {
        this.showInfo = false;
        this.sortTable();
    };
    ContactListCompoent.prototype.pageChanged = function (event) {
        this.perPage = event.rows;
        this.currentPage = (Math.floor(event.first / event.rows)) + 1;
        this.first = event.first;
        if (event.first == 0)
            this.first = 1;
        this.getContactList();
    };
    ContactListCompoent = __decorate([
        core_1.Component({
            selector: 'contact-list',
            templateUrl: 'admin-templates/contact/contact-list.html'
        }), 
        __metadata('design:paramtypes', [contact_service_1.ContactService])
    ], ContactListCompoent);
    return ContactListCompoent;
}());
exports.ContactListCompoent = ContactListCompoent;
//# sourceMappingURL=contact-list.component.js.map