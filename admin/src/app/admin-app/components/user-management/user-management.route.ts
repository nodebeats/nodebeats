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
  {path: '', component: UserListComponent},
  {path: 'editor', component: UserRegistrationComponent},
  {path: 'editor/:userId', component: UserEditComponent},
  {path: 'detail/:userId', component: UserViewComponent},
  {path: 'manage/:userId', component: UserManagementComponent,
    children: [
      {path: '', redirectTo: 'security', pathMatch: 'full'},
      {path: 'password', component: UserPasswordUpdateComponent},
      {path: 'security', component: UserSecurityUpdateComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(UserManagementRoute)],
  exports: [RouterModule],
})

export class UserManagementRouting { }