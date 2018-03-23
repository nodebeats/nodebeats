import {NgModule}      from '@angular/core';
import {EmailTemplateService} from "./email-template.service";
import{EmailTemplateComponent} from"./email-template.component";
import{EmailTemplateEditorComponent} from"./email-template-editor.component";
import{EmailTemplateListComponent} from"./email-template-list.component";
import {EmailTemplateRouting} from './email-template.route';
import{SharedModule} from '../../../shared/shared.module';
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [SharedModule.forRoot(), EmailTemplateRouting,RouterModule],
  declarations: [EmailTemplateEditorComponent, EmailTemplateListComponent, EmailTemplateComponent],
  providers: [EmailTemplateService]
})

export class EmailTemplateModule {
}
