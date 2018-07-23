import {Routes, RouterModule} from '@angular/router';
import {AuthGuardService} from "../login-app/auth.guard.service";
import {NgModule} from "@angular/core";
import { DashboardAppComponent } from './dashboard-app.component';

// export function dashboardModule() {
//   return DashboardModule;
// }

export const dashboardAppRoute: Routes = [
  {
    path: '',
    component: DashboardAppComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuardService],
        children: [
          {path: '', redirectTo: 'dashboard', pathMatch: "full"},
          {path: 'dashboard', loadChildren: './components/dashboard/dashboard.module#DashboardModule', data: {breadcrumb: 'Dashboard'}},
          {path: 'user-management', loadChildren: './components/user-management/user-managment.module#UserManagementModule', data: {breadcrumb: 'User Management'}},          
          {path: 'role', loadChildren: './components/role-management/role.module#RoleModule', data: {breadcrumb: 'Role'}},
          {path: 'access', loadChildren: './components/api-access/api-access.module#ApiAccessModule', data: {breadcrumb: 'Api Access'}},
          {path: 'contact', loadChildren: './components/contact/contact.module#ContactModule', data: {breadcrumb: 'Contact'}},
          {path: 'blog', loadChildren: './components/blog/blog.module#BlogModule', data: {breadcrumb: 'Blog'}},
          {path: 'analytics', loadChildren: './components/google-analytics/google-analytics.module#GoogleAnalyticsModule', data: {breadcrumb: 'Google Analytics'}},
          {path: 'organization', loadChildren: './components/organization-information/organization-information.module#OrganizationInformationModule', data: {breadcrumb: 'Organization Information'}},
          {path: 'googlemap', loadChildren: './components/google-map/google-map.module#GoogleMapModule', data: {breadcrumb: 'Google Map'}},
          {path: 'testimonial', loadChildren: './components/testimonial/testimonial.module#TestimonialModule', data: {breadcrumb: 'Testimonial'}},
          {path: 'imagegallery', loadChildren: './components/image-gallery/image-gallery.module#ImageGalleryModule', data: {breadcrumb: 'Image Gallery'}},
          {path: 'team', loadChildren: './components/team-management/team-management.module#TeamManagementModule', data: {breadcrumb: 'Team Management'}},
          {path: 'errorlog', loadChildren: './components/application-log/application-log.module#ApplicationLogModule', data: {breadcrumb: 'Error Log'}},
          {path: 'email-service', loadChildren:'./components/email-service/email-service.module#EmailServiceModule', data: {breadcrumb: 'Email Service'}},
          {path: 'cloudinary', loadChildren: './components/cloudinary/cloudinary.module#CloudinaryModule', data: {breadcrumb: 'Cloudinary'}},
          {path: 'news', loadChildren:'./components/news/news.module#NewsModule', data: {breadcrumb: 'News'}},
          {path: 'imageslider',loadChildren:'./components/image-slider/image-slider.module#ImageSlideModule', data: {breadcrumb: 'Image Slider'}},
          {path: 'email-template', loadChildren:'./components/email-template/email-template.module#EmailTemplateModule', data: {breadcrumb: 'Email Template'}},
          {path: 'html', loadChildren:'./components/html-content/html-content.module#HtmlContentModule', data: {breadcrumb: 'Html Content'}},
          {path: 'event', loadChildren:'./components/event-management/event-managment.module#EventManagementModule', data: {breadcrumb: 'Event Management'}},
          {path: 'partner', loadChildren:'./components/partner/partner.module#PartnerModule', data: {breadcrumb: 'Partner'}},
          {path: 'comment', loadChildren:'./components/comment-setting/comment-setting.module#CommentSettingModule', data: {breadcrumb: 'Comment'}},
          {path: 'profile', loadChildren: './components/user-profile/user-profile.module#UserProfileModule', data: {breadcrumb: 'User Profile'}},
          {path: 'token', loadChildren: './components/token-management/token-management.module#TokenModule', data: {breadcrumb: 'Token'}},
        ]
      }
    ]
  }

];

@NgModule({
  imports: [
    RouterModule.forChild(dashboardAppRoute)
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardAppRouting {
}
