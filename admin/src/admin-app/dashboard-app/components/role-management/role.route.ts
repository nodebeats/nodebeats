import { NgModule } from '@angular/core';
import { RoleComponent } from './role-list.component';
import {RoleEditorComponent} from './role-editor.component';
import { Routes,RouterModule } from '@angular/router';
import { RoleHomeComponent } from './role-home.component';

export const RoleRoutes: Routes = [
  {path:'', component: RoleHomeComponent, data: {breadcrumb: 'Role Management'},
  children: [
    {path: '', component: RoleComponent, data: {breadcrumb: 'Role List'}},
    {path: 'editor', component: RoleEditorComponent, data: {breadcrumb: 'Role Editor'}},
    {path: 'editor/:roleId', component: RoleEditorComponent, data: {breadcrumb: 'Role Editor'}},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(RoleRoutes)],
  exports: [RouterModule],
})

export class RoleRouting{    }