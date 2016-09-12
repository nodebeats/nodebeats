import {Component} from '@angular/core';
import {RouterConfig, ROUTER_DIRECTIVES, Router} from '@angular/router';
import{NewsManagementComponent} from "./news-management.component";
import {FadeInDirective}from '../../../shared/directives/fadeInDirective';

//import {EmailTemplateEditorComponent} from "./email-template-editor.component";
@Component({
    selector: 'news',
    template: '<router-outlet></router-outlet>',
    directives: [ROUTER_DIRECTIVES]
})
// @RouteConfig([
//     {path: '', component: NewsManagementComponent, name: 'NewsManagement', useAsDefault: true},
//     //{path: '', component: News, name: 'NewsList', useAsDefault: true},
//
// ])
export class NewsComponent {
    constructor() {
    }
}