import { UserSecurityUpdateComponent } from './user-security-question.component';
import { UserViewComponent } from './user-view.component';
import { UserListComponent } from './user-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserRegistrationComponent } from './user-registration.component';
import { UserEditComponent } from './user-edit.component';
import { UserManagementComponent } from './user-management.component';
import { UserPasswordUpdateComponent } from './user-password-update.component';

export const UserManagementRoute: Routes = [
  {path: '', component: UserListComponent, data: {breadcrumb: 'Users List'}},
  {path: 'editor', component: UserRegistrationComponent, data: {breadcrumb: 'User Editor'}},
  {path: 'editor/:userId', component: UserEditComponent, data: {breadcrumb: 'User Editor'}},
  {path: 'detail/:userId', component: UserViewComponent, data: {breadcrumb: 'User Detail'}},
  {path: 'manage/:userId', component: UserManagementComponent, data: {breadcrumb: 'User Management'},
    children: [
      {path: '', redirectTo: 'security', pathMatch: 'full'},
      {path: 'password', component: UserPasswordUpdateComponent, data: {breadcrumb: 'Password'}},
      {path: 'security', component: UserSecurityUpdateComponent, data: {breadcrumb: 'Security'}}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(UserManagementRoute)],
  exports: [RouterModule],
})

export class UserManagementRouting{    }