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
var event_service_1 = require("./event.service");
var event_model_1 = require("./event.model");
var EventComponent = (function () {
    function EventComponent(_objService) {
        this._objService = _objService;
        this.showForm = false;
        /* Pagination */
        this.perPage = 10;
        this.currentPage = 1;
        this.totalPage = 1;
        this.first = 0;
        this.bindSort = false;
        this.preIndex = 1;
    }
    /* End Pagination */
    EventComponent.prototype.ngOnInit = function () {
        this.getEventList();
    };
    EventComponent.prototype.getEventList = function () {
        var _this = this;
        this._objService.getEventList(this.perPage, this.currentPage)
            .subscribe(function (objRes) { return _this.bindList(objRes); }, function (error) { return _this.errorMessage(error); });
    };
    EventComponent.prototype.errorMessage = function (objResponse) {
        jQuery.jAlert({
            'title': 'Alert',
            'content': objResponse.message,
            'theme': 'red'
        });
    };
    EventComponent.prototype.bindList = function (objRes) {
        this.objListResponse = objRes;
        this.preIndex = (this.perPage * (this.currentPage - 1));
        /* Pagination */
        if (objRes.dataList.length > 0) {
            var totalPage = objRes.totalItems / this.perPage;
            this.totalPage = totalPage > 1 ? Math.ceil(totalPage) : 1;
            /*End Pagination */
            if (!this.bindSort) {
                this.bindSort = true;
                this.sortTable();
            }
            else
                jQuery("table").trigger("update", [true]);
        }
    };
    EventComponent.prototype.sortTable = function () {
        setTimeout(function () {
            jQuery('.tablesorter').tablesorter({
                headers: {
                    4: { sorter: false },
                    5: { sorter: false }
                }
            });
        }, 50);
    };
    EventComponent.prototype.edit = function (id) {
        this.showForm = true;
        this.eventId = id;
    };
    EventComponent.prototype.changeDateFormat = function (data) {
        return new Date(data).toLocaleString('en-GB', {
            month: "numeric",
            year: "numeric",
            day: "numeric",
            hour12: false,
            hour: "numeric",
            minute: "numeric"
        });
    };
    EventComponent.prototype.addEvent = function () {
        this.showForm = true;
        this.eventId = null;
    };
    EventComponent.prototype.delete = function (id) {
        var _this = this;
        jQuery.jAlert({
            'type': 'confirm',
            'title': 'Alert',
            'confirmQuestion': 'Are you sure to delete the Event ?',
            'theme': 'red',
            'onConfirm': function (e, btn) {
                e.preventDefault();
                var objTemp = new event_model_1.EventModel();
                objTemp._id = id;
                objTemp.deleted = true;
                _this._objService.deleteEvent(objTemp)
                    .subscribe(function (res) {
                    _this.getEventList();
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
    EventComponent.prototype.showList = function (arg) {
        if (!arg) {
            this.getEventList();
        }
        this.showForm = false;
        this.sortTable();
    };
    EventComponent.prototype.vppChanged = function (event) {
        this.perPage = Number(event.srcElement.value);
        this.getEventList();
    };
    EventComponent.prototype.pageChanged = function (event) {
        this.perPage = event.rows;
        this.currentPage = (Math.floor(event.first / event.rows)) + 1;
        this.first = event.first;
        if (event.first == 0)
            this.first = 1;
        this.getEventList();
    };
    EventComponent = __decorate([
        core_1.Component({
            selector: 'event-list',
            templateUrl: 'admin-templates/event-management/event-list.html'
        }), 
        __metadata('design:paramtypes', [event_service_1.EventService])
    ], EventComponent);
    return EventComponent;
}());
exports.EventComponent = EventComponent;
//# sourceMappingURL=event-list.component.js.map