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
var team_managment_service_1 = require("./team-managment.service");
var team_managment_model_1 = require("./team-managment.model");
var team_management_editor_component_1 = require("./team-management-editor.component");
var primeng_1 = require('primeng/primeng');
var TeamManagementComponent = (function () {
    function TeamManagementComponent(_objService) {
        this._objService = _objService;
        this.showForm = false;
        /* Pagination */
        this.perPage = 10;
        this.currentPage = 1;
        this.totalPage = 1;
        this.nextPage = 1;
        this.preIndex = 0;
    }
    /* End Pagination */
    TeamManagementComponent.prototype.ngOnInit = function () {
        this.getTeamMemberList();
    };
    TeamManagementComponent.prototype.getTeamMemberList = function () {
        var _this = this;
        this._objService.getTeamMemberList()
            .subscribe(function (objRes) { return _this.bindList(objRes); }, function (error) { return _this.errorMessage(error); });
    };
    TeamManagementComponent.prototype.bindList = function (objRes) {
        this.objListResponse = objRes;
        this.preIndex = (this.perPage * (this.currentPage - 1));
        if (objRes.dataList.length > 0) {
            var totalPage = objRes.totalItems / this.perPage;
            this.totalPage = totalPage > 1 ? Math.ceil(totalPage) : 1;
            setTimeout(function () {
                jQuery('.tablesorter').tablesorter({
                    headers: {
                        3: { sorter: false },
                        4: { sorter: false },
                        5: { sorter: false }
                    }
                });
            }, 50);
        }
    };
    TeamManagementComponent.prototype.edit = function (id) {
        this.showForm = true;
        this.memberId = id;
    };
    TeamManagementComponent.prototype.addTeamMember = function () {
        this.showForm = true;
        this.memberId = null;
    };
    TeamManagementComponent.prototype.delete = function (id) {
        var _this = this;
        jQuery.jAlert({
            'type': 'confirm',
            'title': 'Alert',
            'confirmQuestion': 'Are you sure to delete the Team member ?',
            'theme': 'red',
            'onConfirm': function (e, btn) {
                e.preventDefault();
                var objDel = new team_managment_model_1.TeamManagementModel();
                objDel._id = id;
                objDel.deleted = true;
                _this._objService.deleteTeamMember(objDel)
                    .subscribe(function (res) {
                    _this.getTeamMemberList();
                    _this.successStatusMessage(res);
                }, function (error) {
                    _this.errorMessage(error);
                });
            }
        });
    };
    TeamManagementComponent.prototype.successStatusMessage = function (res) {
        jQuery.jAlert({
            'title': 'Success',
            'content': res.message,
            'theme': 'green'
        });
    };
    TeamManagementComponent.prototype.errorMessage = function (objResponse) {
        jQuery.jAlert({
            'title': 'Alert',
            'content': objResponse.message,
            'theme': 'red'
        });
    };
    TeamManagementComponent.prototype.moveUp = function (memberId, order) {
        var _this = this;
        this._objService.sortTeamOrder(memberId, order, "up")
            .subscribe(function (res) {
            _this.successStatusMessage(res);
            _this.getTeamMemberList();
        }, function (err) { return _this.errorMessage(err); });
    };
    TeamManagementComponent.prototype.moveDown = function (memberId, order) {
        var _this = this;
        this._objService.sortTeamOrder(memberId, order, "down")
            .subscribe(function (res) {
            _this.successStatusMessage(res);
            _this.getTeamMemberList();
        }, function (err) { return _this.errorMessage(err); });
    };
    TeamManagementComponent.prototype.showList = function (arg) {
        if (!arg)
            this.getTeamMemberList();
        this.showForm = false;
    };
    TeamManagementComponent.prototype.pageChanged = function (event) {
        this.perPage = event.rows;
        this.currentPage = (Math.floor(event.first / event.rows)) + 1;
        this.getTeamMemberList();
        jQuery(".tablesorter").trigger("update");
    };
    TeamManagementComponent = __decorate([
        core_1.Component({
            selector: 'team-management-list',
            templateUrl: 'admin-templates/team-management/team-management-list.html',
            providers: [team_managment_service_1.TeamManagementService],
            directives: [primeng_1.Paginator, team_management_editor_component_1.TeamManagementEditorComponent]
        }), 
        __metadata('design:paramtypes', [team_managment_service_1.TeamManagementService])
    ], TeamManagementComponent);
    return TeamManagementComponent;
}());
exports.TeamManagementComponent = TeamManagementComponent;
//# sourceMappingURL=team-managment-list.component.js.map