import {Routes, RouterModule} from '@angular/router';
import {UserListComponent} from "./components/user-management/user-list.component";
import {BlogManagementComponent} from './components/blog/blog.component';
import {GoogleAnalyticsComponent}from"./components/google-analytics/google-analytics.component";
import {UserProfileManagementComponent} from './components/user-profile/user-management.component';
import {AdminAppComponent} from  './admin-app.component';
import {AuthGuardService} from "../login-app/auth.guard.service";
import {NgModule} from "@angular/core";
import { EventManagementModule } from './components/event-management/event-managment.module';

export const adminAppRoute: Routes = [
  {
    path: '',
    component: AdminAppComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuardService],
        children: [
          {path: 'dashboard', loadChildren: 'app/admin-app/components/dashboard/dashboard.module#DashboardModule', data: {breadcrumb: 'Dashboard'}},
          {path: 'user-management', loadChildren: 'app/admin-app/components/user-management/user-managment.module#UserManagementModule', data: {breadcrumb: 'User Management'}},
          {path: 'role', loadChildren: 'app/admin-app/components/role-management/role.module#RoleModule', data: {breadcrumb: 'Role'}},
          {path: 'access', loadChildren: 'app/admin-app/components/api-access/api-access.module#ApiAccessModule', data: {breadcrumb: 'Api Access'}},
          {path: 'contact', loadChildren: 'app/admin-app/components/contact/contact.module#ContactModule', data: {breadcrumb: 'Contact'}},
          {path: 'blog', loadChildren: 'app/admin-app/components/blog/blog.module#BlogModule', data: {breadcrumb: 'Blog'}},
          {path: 'analytics', loadChildren: 'app/admin-app/components/google-analytics/google-analytics.module#GoogleAnalyticsModule', data: {breadcrumb: 'Google Analytics'}},
          {path: 'organization', loadChildren: 'app/admin-app/components/organization-information/organization-information.module#OrganizationInformationModule', data: {breadcrumb: 'Organization Information'}},
          {path: 'googlemap', loadChildren: 'app/admin-app/components/google-map/google-map.module#GoogleMapModule', data: {breadcrumb: 'Google Map'}},
          {path: 'testimonial', loadChildren: 'app/admin-app/components/testimonial/testimonial.module#TestimonialModule', data: {breadcrumb: 'Testimonial'}},
          {path: 'imagegallery', loadChildren: 'app/admin-app/components/image-gallery/image-gallery.module#ImageGalleryModule', data: {breadcrumb: 'Image Gallery'}},
          {path: 'team', loadChildren: 'app/admin-app/components/team-management/team-management.module#TeamManagementModule', data: {breadcrumb: 'Team Management'}},
          {path: 'errorlog', loadChildren: 'app/admin-app/components/application-log/application-log.module#ApplicationLogModule', data: {breadcrumb: 'Error Log'}},
          {path: 'email-service', loadChildren:'app/admin-app/components/email-service/email-service.module#EmailServiceModule', data: {breadcrumb: 'Email Service'}},
          {path: 'cloudinary', loadChildren: 'app/admin-app/components/cloudinary/cloudinary.module#CloudinaryModule', data: {breadcrumb: 'Cloudinary'}},
          {path: 'news', loadChildren:'app/admin-app/components/news/news.module#NewsModule', data: {breadcrumb: 'News'}},
          {path: 'imageslider',loadChildren:'app/admin-app/components/image-slider/image-slider.module#ImageSlideModule', data: {breadcrumb: 'Image Slider'}},
          {path: 'email-template', loadChildren:'app/admin-app/components/email-template/email-template.module#EmailTemplateModule', data: {breadcrumb: 'Email Template'}},
          {path: 'html', loadChildren:'app/admin-app/components/html-content/html-content.module#HtmlContentModule', data: {breadcrumb: 'Html Content'}},
          {path: 'event', loadChildren:'app/admin-app/components/event-management/event-managment.module#EventManagementModule', data: {breadcrumb: 'Event Management'}},
          {path: 'partner', loadChildren:'app/admin-app/components/partner/partner.module#PartnerModule', data: {breadcrumb: 'Partner'}},
          {path: 'comment', loadChildren:'app/admin-app/components/comment-setting/comment-setting.module#CommentSettingModule', data: {breadcrumb: 'Comment'}},
          {path: 'profile', loadChildren: 'app/admin-app/components/user-profile/user-profile.module#UserProfileModule', data: {breadcrumb: 'User Profile'}},
          {path: 'token', loadChildren: 'app/admin-app/components/token-management/token-management.module#TokenModule', data: {breadcrumb: 'Token'}},
          {path: '', redirectTo: 'dashboard', pathMatch: "full"}
        ]
      }
    ]
  }

];

@NgModule({
  imports: [
    RouterModule.forChild(adminAppRoute)
  ],
  exports: [
    RouterModule
  ]
})
export class adminAppRouting {
}
