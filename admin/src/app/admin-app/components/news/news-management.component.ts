import{Component}from'@angular/core';

@Component({
    selector: 'news-management',
    templateUrl: './news-management.html'
})
export class NewsManagementComponent {
    navLinks: any[] = [{label:'News', path: '/admin/news'}, {label: 'NewsCategory', path: '/admin/news/category'}];

    constructor() {
    }
}

