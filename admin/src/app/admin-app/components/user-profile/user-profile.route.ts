import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import { UserProfileManagementComponent } from './user-management.component';
import { UserProfileComponent } from './user-profile.component';
import { UserSecurityUpdateComponent } from '../user-management/user-security-question.component';
import { UserEditComponent } from '../user-management/user-edit.component';
import { UserPasswordUpdateComponent } from '../user-management/user-password-update.component';
import { UserSettingComponent } from '../user-management/user-setting.component';


export const UserProfileRoute: Routes = [
  {path:'', component: UserProfileManagementComponent,
    children: [
        {path: '', component: UserProfileComponent},
        {path: 'edit/:userId', component: UserEditComponent},
        {path: 'security', component: UserSecurityUpdateComponent},
        {path: 'password', component: UserPasswordUpdateComponent},
        {path: 'setting', component: UserSettingComponent}
    ]
  }
   
];

@NgModule({
  imports: [RouterModule.forChild(UserProfileRoute)],
  exports: [RouterModule],
})

export class UserProfileRouting { }