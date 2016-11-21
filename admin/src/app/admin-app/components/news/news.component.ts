import {Component} from '@angular/core';
import{NewsManagementComponent} from "./news-management.component";
import {FadeInDirective}from '../../../shared/directives/fadeInDirective';

//import {EmailTemplateEditorComponent} from "./email-template-editor.component";
@Component({
    selector: 'news',
    template: '<router-outlet></router-outlet>'
})

export class NewsComponent {
    constructor() {
    }
}