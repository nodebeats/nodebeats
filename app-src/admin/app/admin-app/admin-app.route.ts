import {RouterConfig} from '@angular/router';
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {UserListComponent} from "./components/user-management/user-list.component";
import{NewsManagementComponent}from "./components/news/news-management.component";
import{EmailServiceComponent} from "./components/email-service/email-service.component";
import{ContactListCompoent} from "./components/contact/contact-list.component";
import {ApplicationLogComponent} from './components/application-log/application-log-list.component';
import{BlogManagementComponent} from './components/blog/blog.component';
import {CloudinarySettingComponent} from "./components/cloudinary/cloudinary.component";
import{GoogleAnalyticsComponent}from"./components/google-analytics/google-analytics.component";
import{OrganizationInfoComponent} from "./components/organization-information/orginfo.component";
import{ImageSliderComponent} from "./components/image-slider/image-silder-list.component";
import{GoogleMapComponent} from "./components/google-map/google-map.component";
import{ImageGalleryComponent} from "./components/image-gallery/image-gallery.component";
import{TestimonialComponent} from "./components/testimonial/testimonial-list.component";
import{TeamManagementComponent} from "./components/team-management/team-managment-list.component";
import{HtmlContentComponent} from "./components/html-content/html-content-list.component";
import{EventComponent} from "./components/event-management/event-list.component";
import {EmailTemplateRoutes} from './components/email-template/email-template.route';
import {CommentSettingComponent}from './components/comment-setting/comment-setting.component';
import {UserProfileManagementComponent} from './components/user-profile/user-management.component';
import {PartnerComponent} from './components/partner/partner-list.component';
export const AdminAppRoute:RouterConfig = [
    {path: '', redirectTo: 'dashboard', pathMatch: "full"},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'user-management', component: UserListComponent},
    {path: 'contact', component: ContactListCompoent},
    {path: 'email-service', component: EmailServiceComponent},
    {path: 'cloudinary', component: CloudinarySettingComponent},
    {path: 'blog', component: BlogManagementComponent},
    {path: 'analytics', component: GoogleAnalyticsComponent},
    {path: 'organization', component: OrganizationInfoComponent},
    ...EmailTemplateRoutes,
    {path: 'news', component: NewsManagementComponent},
    {path: 'imageslider', component: ImageSliderComponent},
    {path: 'googlemap', component: GoogleMapComponent},
    {path: 'testimonial', component: TestimonialComponent},
    {path: 'imagegallery', component: ImageGalleryComponent},
    {path: 'team', component: TeamManagementComponent},
    {path: 'event', component: EventComponent},
    {path: 'html', component: HtmlContentComponent},
    {path: 'errorlog', component: ApplicationLogComponent},
    {path: 'errorlog', component: ApplicationLogComponent},
    {path: 'comment', component: CommentSettingComponent},
    {path: 'profile', component: UserProfileManagementComponent},
    {path: 'partner', component:PartnerComponent}
];

