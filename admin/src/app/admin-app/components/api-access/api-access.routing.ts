import { NgModule } from '@angular/core';
import { ApiAccessComponent } from './api-access.component';
import { Routes,RouterModule } from '@angular/router';
import {ApiAccessEditorComponent} from './api-access-editor.component';
import { ApiAccessHomeComponent } from './api-access-home.component';


export const ApiAccessRoute: Routes = [
  {path:'', component: ApiAccessHomeComponent,
  children: [
    {path: '', component: ApiAccessComponent},
    {path: 'editor', component: ApiAccessEditorComponent},
    {path: 'editor/:id', component: ApiAccessEditorComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(ApiAccessRoute)],
  exports: [RouterModule],
})

export class ApiAccessRouting { }