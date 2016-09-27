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
var sidebar_model_1 = require('./sidebar.model');
var SidebarCmp = (function () {
    function SidebarCmp() {
        this.isActive = false;
        this.duration = 250;
        this.firstOpen = true;
        this.firstDisabled = false;
        this.lastOpen = false;
        this.containerSlide = false;
        this.toggleContainerEvent = new core_1.EventEmitter();
        this.status = {
            isFirstOpen: false,
            isFirstDisabled: false
        };
        this.sidebarRoute = [];
        var menuItem = [];
        menuItem.push(new sidebar_model_1.SidebarMenuModel("/admin/user-management", "User", "fa-user"));
        menuItem.push(new sidebar_model_1.SidebarMenuModel("/admin/blog", "Blog", "fa-newspaper-o"));
        menuItem.push(new sidebar_model_1.SidebarMenuModel("/admin/contact", "Contact List", "fa-list"));
        menuItem.push(new sidebar_model_1.SidebarMenuModel("/admin/email-template", "Email Template", "fa-envelope"));
        menuItem.push(new sidebar_model_1.SidebarMenuModel("/admin/event", "Event Management", "fa-calendar"));
        menuItem.push(new sidebar_model_1.SidebarMenuModel("/admin/errorlog", "Error Log", "fa-stack-overflow"));
        menuItem.push(new sidebar_model_1.SidebarMenuModel("/admin/html", "Html Content", "fa-html5"));
        menuItem.push(new sidebar_model_1.SidebarMenuModel("/admin/imagegallery", "Image Gallery", "fa-picture-o"));
        menuItem.push(new sidebar_model_1.SidebarMenuModel("/admin/imageslider", "Image Slider", "fa-play"));
        menuItem.push(new sidebar_model_1.SidebarMenuModel("/admin/news", "News", "fa-newspaper-o"));
        menuItem.push(new sidebar_model_1.SidebarMenuModel("/admin/partner", "Partners", "fa-link"));
        menuItem.push(new sidebar_model_1.SidebarMenuModel("/admin/team", "Team Management", "fa-users"));
        this.sidebarRoute.push(new sidebar_model_1.SidebarParentMenuModel(menuItem, null, "", ""));
        menuItem = [];
        menuItem.push(new sidebar_model_1.SidebarMenuModel("/admin/cloudinary", "Cloudinary", "fa-cloud"));
        menuItem.push(new sidebar_model_1.SidebarMenuModel("/admin/comment", "Comments", "fa-commenting-o"));
        menuItem.push(new sidebar_model_1.SidebarMenuModel("/admin/email-service", "Email Service", "fa-cogs"));
        menuItem.push(new sidebar_model_1.SidebarMenuModel("/admin/analytics", "Google Analytics", "fa-line-chart"));
        menuItem.push(new sidebar_model_1.SidebarMenuModel("/admin/googlemap", "Google Map", "fa-map-o"));
        menuItem.push(new sidebar_model_1.SidebarMenuModel("/admin/organization", "Org. Information", "fa-building-o"));
        this.sidebarRoute.push(new sidebar_model_1.SidebarParentMenuModel(menuItem, "Settings", "", "fa-wrench"));
    }
    SidebarCmp.prototype.toggleContainer = function () {
        this.containerSlide = !this.containerSlide;
        this.toggleContainerEvent.emit(this.containerSlide);
    };
    SidebarCmp.prototype.eventCalled = function () {
        this.isActive = !this.isActive;
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], SidebarCmp.prototype, "toggleContainerEvent", void 0);
    SidebarCmp = __decorate([
        core_1.Component({
            selector: 'sidebar',
            templateUrl: 'admin-templates/shared/sidebar.html'
        }), 
        __metadata('design:paramtypes', [])
    ], SidebarCmp);
    return SidebarCmp;
}());
exports.SidebarCmp = SidebarCmp;
//# sourceMappingURL=sidebar.js.map