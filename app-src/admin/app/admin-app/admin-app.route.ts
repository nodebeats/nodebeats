import {Routes, RouterModule} from '@angular/router';
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
import {CommentSettingComponent}from './components/comment-setting/comment-setting.component';
import {UserProfileManagementComponent} from './components/user-profile/user-management.component';
import{AdminAppComponent} from  './admin-app.component';
import {AuthGuardService} from "../login-app/auth.guard.service";
import {EmailTemplateRoutes} from "./components/email-template/email-template.route";
import {PartnerComponent} from "./components/partner/partner-list.component";
import {RoleComponent} from "./components/role-management/role-list.component";
import {ApiAccessComponent} from "./components/api-access/api-access.component";

export const adminAppRoute:Routes = [
    {
        path: 'admin',
        component: AdminAppComponent,
        canActivate: [AuthGuardService],
        children: [
            {
                path: '',
                canActivateChild: [AuthGuardService],
                children: [
                    {path: 'dashboard', component: DashboardComponent},
                    {path: 'user-management', component: UserListComponent},
                    {path: 'role', component: RoleComponent},
                    {path: 'access', component: ApiAccessComponent},
                    {path: 'contact', component: ContactListCompoent},
                    {path: 'email-service', component: EmailServiceComponent},
                    {path: 'cloudinary', component: CloudinarySettingComponent},
                    {path: 'blog', component: BlogManagementComponent},
                    ...EmailTemplateRoutes,
                    {path: 'analytics', component: GoogleAnalyticsComponent},
                    {path: 'organization', component: OrganizationInfoComponent},
                    {path: 'news', component: NewsManagementComponent},
                    {path: 'imageslider', component: ImageSliderComponent},
                    {path: 'googlemap', component: GoogleMapComponent},
                    {path: 'testimonial', component: TestimonialComponent},
                    {path: 'imagegallery', component: ImageGalleryComponent},
                    {path: 'team', component: TeamManagementComponent},
                    {path: 'event', component: EventComponent},
                    {path: 'html', component: HtmlContentComponent},
                    {path: 'errorlog', component: ApplicationLogComponent},
                    {path: 'partner', component: PartnerComponent},
                    {path: 'comment', component: CommentSettingComponent},
                    {path: 'profile', component: UserProfileManagementComponent},
                    {path: '', redirectTo: 'dashboard', pathMatch: "full"}
                ]
            }
        ]
    }

];
export const adminAppRouting = RouterModule.forChild(adminAppRoute);
