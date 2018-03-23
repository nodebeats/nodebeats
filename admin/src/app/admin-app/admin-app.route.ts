///<reference path="components/email-template/email-template-editor.component.ts"/>
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {UserListComponent} from "./components/user-management/user-list.component";
import{BlogManagementComponent} from './components/blog/blog.component';
import{GoogleAnalyticsComponent}from"./components/google-analytics/google-analytics.component";
import {UserProfileManagementComponent} from './components/user-profile/user-management.component';
import{AdminAppComponent} from  './admin-app.component';
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
          {path: 'dashboard', component: DashboardComponent},
          {path: 'user-management', component: UserListComponent},
          // {path: 'user-management', loadChildren: 'app/admin-app/components/user-management/user-management.module#UserManagementModule'},
          {path: 'role', loadChildren: 'app/admin-app/components/role-management/role.module#RoleModule'},
          {path: 'access', loadChildren: 'app/admin-app/components/api-access/api-access.module#ApiAccessModule'},
          {path: 'contact', loadChildren: 'app/admin-app/components/contact/contact.module#ContactModule'},
          {path: 'blog', loadChildren: 'app/admin-app/components/blog/blog.module#BlogModule'},
          // {path: 'analytics', component: GoogleAnalyticsComponent},
          {path: 'analytics', loadChildren: 'app/admin-app/components/google-analytics/google-analytics.module#GoogleAnalyticsModule'},
          {path: 'organization', loadChildren: 'app/admin-app/components/organization-information/organization-information.module#OrganizationInformationModule'},
          {path: 'googlemap', loadChildren: 'app/admin-app/components/google-map/google-map.module#GoogleMapModule'},
          {path: 'testimonial', loadChildren: 'app/admin-app/components/testimonial/testimonial.module#TestimonialModule'},
          {path:'imagegallery', loadChildren: 'app/admin-app/components/image-gallery/image-gallery.module#ImageGalleryModule'},
          {path: 'team', loadChildren: 'app/admin-app/components/team-management/team-management.module#TeamManagementModule'},
          {path: 'errorlog', loadChildren: 'app/admin-app/components/application-log/application-log.module#ApplicationLogModule'},
          {path: 'access', loadChildren: 'app/admin-app/components/api-access/api-access.module#ApiAccessModule'},
          {path: 'email-service', loadChildren:'app/admin-app/components/email-service/email-service.module#EmailServiceModule'},
          {path: 'cloudinary', loadChildren: 'app/admin-app/components/cloudinary/cloudinary.module#CloudinaryModule'},
          {path: 'blog', component: BlogManagementComponent},
          {path: 'analytics', component: GoogleAnalyticsComponent},
          {path: 'news',loadChildren:'app/admin-app/components/news/news.module#NewsModule'},
          {path: 'imageslider',loadChildren:'app/admin-app/components/image-slider/image-slider.module#ImageSlideModule'},
          {path: 'email-template', loadChildren:'app/admin-app/components/email-template/email-template.module#EmailTemplateModule'},
          {path: 'html', loadChildren:'app/admin-app/components/html-content/html-content.module#HtmlContentModule'},
          {path: 'event', loadChildren:'app/admin-app/components/event-management/event-managment.module#EventManagementModule'},
          {path: 'html', loadChildren:'app/admin-app/components/html-content/html-content.module#HtmlContentModule'},
          {path: 'partner', loadChildren:'app/admin-app/components/partner/partner.module#PartnerModule'},
          {path: 'comment', loadChildren:'app/admin-app/components/comment-setting/comment-setting.module#CommentSettingModule'},
          {path: 'profile', component: UserProfileManagementComponent},
          {path: 'token', loadChildren: 'app/admin-app/components/token-management/token-management.module#TokenModule'},
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
