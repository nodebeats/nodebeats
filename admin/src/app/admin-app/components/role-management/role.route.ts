import { NgModule } from '@angular/core';
import { RoleComponent } from './role-list.component';
import {RoleEditorComponent} from './role-editor.component';
import { Routes,RouterModule } from '@angular/router';
import { RoleHomeComponent } from './role-home.component';

export const RoleRoute: Routes = [
  {path:'', component: RoleHomeComponent,
  children: [
    {path: '', component: RoleComponent},
    {path: 'editor', component: RoleEditorComponent},
    {path: 'editor/:roleId', component: RoleEditorComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(RoleRoute)],
  exports: [RouterModule]
})

export class RoleRouting { }