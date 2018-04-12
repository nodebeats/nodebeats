import { NgModule } from '@angular/core';
import { ApiAccessComponent } from './api-access.component';
import { Routes,RouterModule } from '@angular/router';
import {ApiAccessEditorComponent} from './api-access-editor.component';
import { ApiAccessHomeComponent } from './api-access-home.component';


export const ApiAccessRoute: Routes = [
  {path:'', component: ApiAccessHomeComponent, data: {breadcrumb: 'ApiAccess Home'},
  children: [
    {path: '', component: ApiAccessComponent, data: {breadcrumb: 'ApiAccess List'}},
    {path: 'editor', component: ApiAccessEditorComponent, data: {breadcrumb: 'ApiAccess Editor'}},
    {path: 'editor/:id', component: ApiAccessEditorComponent, data: {breadcrumb: 'ApiAccess Editor'}},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(ApiAccessRoute)],
  exports: [RouterModule],
})

export class ApiAccessRouting { }