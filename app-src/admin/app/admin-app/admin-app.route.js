"use strict";
var dashboard_component_1 = require("./components/dashboard/dashboard.component");
var user_list_component_1 = require("./components/user-management/user-list.component");
var news_management_component_1 = require("./components/news/news-management.component");
var email_service_component_1 = require("./components/email-service/email-service.component");
var contact_list_component_1 = require("./components/contact/contact-list.component");
var application_log_list_component_1 = require('./components/application-log/application-log-list.component');
var blog_component_1 = require('./components/blog/blog.component');
var cloudinary_component_1 = require("./components/cloudinary/cloudinary.component");
var google_analytics_component_1 = require("./components/google-analytics/google-analytics.component");
var orginfo_component_1 = require("./components/organization-information/orginfo.component");
var image_silder_list_component_1 = require("./components/image-slider/image-silder-list.component");
var google_map_component_1 = require("./components/google-map/google-map.component");
var image_gallery_component_1 = require("./components/image-gallery/image-gallery.component");
var testimonial_list_component_1 = require("./components/testimonial/testimonial-list.component");
var team_managment_list_component_1 = require("./components/team-management/team-managment-list.component");
var html_content_list_component_1 = require("./components/html-content/html-content-list.component");
var event_list_component_1 = require("./components/event-management/event-list.component");
var email_template_route_1 = require('./components/email-template/email-template.route');
var comment_setting_component_1 = require('./components/comment-setting/comment-setting.component');
var user_management_component_1 = require('./components/user-profile/user-management.component');
var partner_list_component_1 = require('./components/partner/partner-list.component');
exports.AdminAppRoute = [
    { path: '', redirectTo: 'dashboard', pathMatch: "full" },
    { path: 'dashboard', component: dashboard_component_1.DashboardComponent },
    { path: 'user-management', component: user_list_component_1.UserListComponent },
    { path: 'contact', component: contact_list_component_1.ContactListCompoent },
    { path: 'email-service', component: email_service_component_1.EmailServiceComponent },
    { path: 'cloudinary', component: cloudinary_component_1.CloudinarySettingComponent },
    { path: 'blog', component: blog_component_1.BlogManagementComponent },
    { path: 'analytics', component: google_analytics_component_1.GoogleAnalyticsComponent },
    { path: 'organization', component: orginfo_component_1.OrganizationInfoComponent }
].concat(email_template_route_1.EmailTemplateRoutes, [
    { path: 'news', component: news_management_component_1.NewsManagementComponent },
    { path: 'imageslider', component: image_silder_list_component_1.ImageSliderComponent },
    { path: 'googlemap', component: google_map_component_1.GoogleMapComponent },
    { path: 'testimonial', component: testimonial_list_component_1.TestimonialComponent },
    { path: 'imagegallery', component: image_gallery_component_1.ImageGalleryComponent },
    { path: 'team', component: team_managment_list_component_1.TeamManagementComponent },
    { path: 'event', component: event_list_component_1.EventComponent },
    { path: 'html', component: html_content_list_component_1.HtmlContentComponent },
    { path: 'errorlog', component: application_log_list_component_1.ApplicationLogComponent },
    { path: 'errorlog', component: application_log_list_component_1.ApplicationLogComponent },
    { path: 'comment', component: comment_setting_component_1.CommentSettingComponent },
    { path: 'profile', component: user_management_component_1.UserProfileManagementComponent },
    { path: 'partner', component: partner_list_component_1.PartnerComponent }
]);
//# sourceMappingURL=admin-app.route.js.map