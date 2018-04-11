import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmailTemplateListComponent } from "./email-template-list.component";
import { EmailTemplateEditorComponent } from "./email-template-editor.component";
import { EmailTemplateComponent } from './email-template.component';
export const EmailTemplateRoutes: Routes = [
  { path: '', component: EmailTemplateListComponent, data: {breadcrumb: 'Email Template List'}},
  { path: 'email-template-editor', component: EmailTemplateEditorComponent, data: {breadcrumb: 'Email Template Editor'} },
  { path: 'email-template-editor/:id', component: EmailTemplateEditorComponent, data: {breadcrumb: 'Email Template Editor'} }
];

@NgModule({
  imports: [RouterModule.forChild(EmailTemplateRoutes)],
  exports: [RouterModule],
})

export class EmailTemplateRouting { }
