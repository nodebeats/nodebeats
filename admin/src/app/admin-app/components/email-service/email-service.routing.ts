import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import {EmailServiceComponent} from './email-service.component';


export const EmailServiceRoute: Routes = [
  {path:'', component: EmailServiceComponent}
  
];

@NgModule({
  imports: [RouterModule.forChild(EmailServiceRoute)],
  exports: [RouterModule],
})

export class EmailServiceRouting { }