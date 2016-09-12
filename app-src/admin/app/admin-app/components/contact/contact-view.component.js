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
var contact_model_1 = require("./contact.model");
var contact_service_1 = require("./contact.service");
var fadeInDirective_1 = require('../../../shared/directives/fadeInDirective');
var ContactViewComponent = (function () {
    function ContactViewComponent(_objService) {
        this._objService = _objService;
        this.viewCancelEvent = new core_1.EventEmitter();
        this.objContact = new contact_model_1.ContactModel();
        this.showDefaultImage = false;
    }
    ContactViewComponent.prototype.ngOnInit = function () {
        this.getUserDetail();
    };
    ContactViewComponent.prototype.getUserDetail = function () {
        var _this = this;
        this._objService.getContactById(this.contactId)
            .subscribe(function (resUser) { return _this.handleDetail(resUser); }, function (error) { return _this.error = error; });
    };
    ContactViewComponent.prototype.handleDetail = function (objContact) {
        this.objContact = objContact;
    };
    ContactViewComponent.prototype.triggerCancelView = function (event) {
        var showInfo = false;
        this.viewCancelEvent.emit(showInfo);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ContactViewComponent.prototype, "contactId", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], ContactViewComponent.prototype, "viewCancelEvent", void 0);
    ContactViewComponent = __decorate([
        core_1.Component({
            selector: 'contact-view',
            templateUrl: 'admin-templates/contact/contact-view.html',
            directives: [fadeInDirective_1.FadeInDirective]
        }), 
        __metadata('design:paramtypes', [contact_service_1.ContactService])
    ], ContactViewComponent);
    return ContactViewComponent;
}());
exports.ContactViewComponent = ContactViewComponent;
//# sourceMappingURL=contact-view.component.js.map