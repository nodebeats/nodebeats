import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import { UserProfileManagementComponent } from './user-management.component';
import { UserProfileComponent } from './user-profile.component';
import { UserSecurityUpdateComponent } from '../user-management/user-security-question.component';
import { UserEditComponent } from '../user-management/user-edit.component';
import { UserPasswordUpdateComponent } from '../user-management/user-password-update.component';
import { UserSettingComponent } from '../user-management/user-setting.component';


export const UserProfileRoute: Routes = [
  {path:'', component: UserProfileManagementComponent, data: {breadcrumb: 'User Profile Management'},
    children: [
        {path: '', component: UserProfileComponent, data: {breadcrumb: 'User Profile Component'}},
        {path: 'edit/:userId', component: UserEditComponent, data: {breadcrumb: 'User Profile Editor'}},
        {path: 'security', component: UserSecurityUpdateComponent, data: {breadcrumb: 'Security'}},
        {path: 'password', component: UserPasswordUpdateComponent, data: {breadcrumb: 'Password'}},
        {path: 'setting', component: UserSettingComponent, data: {breadcrumb: 'User Profile Setting'}}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(UserProfileRoute)],
  exports: [RouterModule],
})

export class UserProfileRouting { }