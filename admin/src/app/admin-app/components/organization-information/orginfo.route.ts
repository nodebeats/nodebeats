import { NgModule } from '@angular/core';
import { OrganizationInfoComponent } from './orginfo.component';
import { Routes,RouterModule } from '@angular/router';


export const OrganizationInfoRoute: Routes = [
  {path:'', component: OrganizationInfoComponent}
  ];

@NgModule({
  imports: [RouterModule.forChild(OrganizationInfoRoute)],
  exports: [RouterModule],
})

export class OrganizationInfoRouting { }