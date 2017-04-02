import {Routes, RouterModule} from '@angular/router';
import{EmailTemplateListComponent} from "./email-template-list.component";
import {EmailTemplateEditorComponent} from "./email-template-editor.component";
import{EmailTemplateComponent} from './email-template.component';
export const EmailTemplateRoutes:Routes = [
    {
        path: 'email-template',
        children: [
            {path: '', component: EmailTemplateListComponent},
            {path: 'email-template-editor', component: EmailTemplateEditorComponent},
            {
                path: 'email-template-editor/:id', component: EmailTemplateEditorComponent
            }
        ]
    }
];
// export const EmailTemplateRouting = RouterModule.forRoot(EmailTemplateRoutes);
