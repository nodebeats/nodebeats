import {NgModule} from '@angular/core';
import {ApplicationLogModule} from './components/application-log/application-log.module';
import{BlogModule} from './components/blog/blog.module';
import{CloudinaryModule} from './components/cloudinary/cloudinary.module';
import{CommentSettingModule} from './components/comment-setting/comment-setting.module';
import{ContactModule} from './components/contact/contact.module';
import{DashboardModule} from './components/dashboard/dashboard.module';
import{EmailServiceModule} from './components/email-service/email-service.module';
import{EmailTemplateModule} from './components/email-template/email-template.module';
import{EventManagementModule} from './components/event-management/event-managment.module';
import{GoogleAnalyticsModule} from './components/google-analytics/google-analytics.module';
import {GoogleMapModule} from './components/google-map/google-map.module';
import{HtmlContentModule} from './components/html-content/html-content.module';
import{ImageGalleryModule} from './components/image-gallery/image-gallery.module';
import{ImageSlideModule} from './components/image-slider/image-slider.module';
import{NewsModule}from'./components/news/news.module';
import{OrganizationInformationModule} from './components/organization-information/organization-information.module';
import{TeamManagementModule} from './components/team-management/team-management.module';
import{TestimonialModule} from './components/testimonial/testimonial.module';
import{UserManagementModule} from './components/user-management/user-managment.module';
import{UserProfileModule} from './components/user-profile/user-profile.module';
import{DashboardAppComponent} from './dashboard-app.component';
import{DashboardAppRouting} from './dashboard-app.route';
import {SpinnerComponent} from '../shared/components/spinner/spinner.component';
import {SidebarCmp} from './components/sidebar/sidebar'
import {TopNavCmp}from './components/topnav/topnav';
import {SharedModule} from "../shared/shared.module";
import {PartnerModule} from "./components/partner/partner.module";
import {CountryListService} from "../shared/services/countrylist.service";
import {RoleModule} from "./components/role-management/role.module";
import {ApiAccessModule} from "./components/api-access/api-access.module";
import {TokenModule} from "./components/token-management/token-management.module";

@NgModule({
  imports: [
    DashboardAppRouting,
    ApplicationLogModule,
    BlogModule,
    CloudinaryModule,
    CommentSettingModule,
    ContactModule,
    DashboardModule,
    EmailServiceModule,
    EmailTemplateModule,
    EventManagementModule,
    GoogleAnalyticsModule,
    GoogleMapModule,
    HtmlContentModule,
    ImageGalleryModule,
    ImageSlideModule,
    NewsModule,
    OrganizationInformationModule,
    TeamManagementModule,
    TestimonialModule,
    UserManagementModule,
    PartnerModule,
    UserProfileModule,
    RoleModule,
    ApiAccessModule,
    TokenModule,
    SharedModule.forRoot()
  ],
  declarations: [DashboardAppComponent, SpinnerComponent, SidebarCmp, TopNavCmp],
  providers: [CountryListService]

})

export class DashboardAppModule {
}
