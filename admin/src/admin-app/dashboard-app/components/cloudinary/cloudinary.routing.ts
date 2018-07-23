import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import {CloudinarySettingComponent} from './cloudinary.component';


export const CloudinaryRoute: Routes = [
  {path:'', component: CloudinarySettingComponent, data: {
    breadcrumb: 'Cloudinary Setting',
  }}
];

@NgModule({
  imports: [RouterModule.forChild(CloudinaryRoute)],
  exports: [RouterModule],
})

export class CloudinaryRouting { }