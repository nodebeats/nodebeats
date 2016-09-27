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
var application_log_module_1 = require('./components/application-log/application-log.module');
var blog_module_1 = require('./components/blog/blog.module');
var cloudinary_module_1 = require('./components/cloudinary/cloudinary.module');
var comment_setting_module_1 = require('./components/comment-setting/comment-setting.module');
var contact_module_1 = require('./components/contact/contact.module');
var dashboard_module_1 = require('./components/dashboard/dashboard.module');
var email_service_module_1 = require('./components/email-service/email-service.module');
var email_template_module_1 = require('./components/email-template/email-template.module');
var event_managment_module_1 = require('./components/event-management/event-managment.module');
var google_analytics_module_1 = require('./components/google-analytics/google-analytics.module');
var google_map_module_1 = require('./components/google-map/google-map.module');
var html_content_mdule_1 = require('./components/html-content/html-content.mdule');
var image_gallery_module_1 = require('./components/image-gallery/image-gallery.module');
var image_slider_module_1 = require('./components/image-slider/image-slider.module');
var news_module_1 = require('./components/news/news.module');
var organization_information_module_1 = require('./components/organization-information/organization-information.module');
var team_management_module_1 = require('./components/team-management/team-management.module');
var testimonial_module_1 = require('./components/testimonial/testimonial.module');
var user_managment_module_1 = require('./components/user-management/user-managment.module');
var user_profile_module_1 = require('./components/user-profile/user-profile.module');
var admin_app_component_1 = require('./admin-app.component');
var admin_app_route_1 = require('./admin-app.route');
var spinner_component_1 = require('../shared/components/spinner/spinner.component');
var sidebar_1 = require('./components/sidebar/sidebar');
var topnav_1 = require('./components/topnav/topnav');
var shared_module_1 = require("../shared/shared.module");
var AdminAppModule = (function () {
    function AdminAppModule() {
    }
    AdminAppModule = __decorate([
        core_1.NgModule({
            imports: [
                admin_app_route_1.adminAppRouting,
                application_log_module_1.ApplicationLogModule,
                blog_module_1.BlogModule,
                cloudinary_module_1.CloudinaryModule,
                comment_setting_module_1.CommentSettingModule,
                contact_module_1.ContactModule,
                dashboard_module_1.DashboardModule,
                email_service_module_1.EmailServiceModule,
                email_template_module_1.EmailTemplateModule,
                event_managment_module_1.EventManagementModule,
                google_analytics_module_1.GoogleAnalyticsModuless,
                google_map_module_1.GoogleMapModule,
                html_content_mdule_1.HtmlContentModule,
                image_gallery_module_1.ImageGalleryModule,
                image_slider_module_1.ImageSlideModule,
                news_module_1.NewsModule,
                organization_information_module_1.OrganizationInformationModule,
                team_management_module_1.TeamManagementModule,
                testimonial_module_1.TestimonialModule,
                user_managment_module_1.UserManagementModule,
                user_profile_module_1.UserProfileModule,
                shared_module_1.SharedModule
            ],
            declarations: [admin_app_component_1.AdminAppComponent, spinner_component_1.SpinnerComponent, sidebar_1.SidebarCmp, topnav_1.TopNavCmp]
        }), 
        __metadata('design:paramtypes', [])
    ], AdminAppModule);
    return AdminAppModule;
}());
exports.AdminAppModule = AdminAppModule;
//# sourceMappingURL=admin-app.module.js.map