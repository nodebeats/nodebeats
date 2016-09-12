// import {TAB_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import {TabView, TabPanel} from 'primeng/primeng';
import{Component}from'@angular/core';
import{NewsCategoryListComponent} from "./news-category-list.component"
import {NewsListComponent} from  "./news-list.component";
import{NewsImageListComponent} from "./news-image-list.component";
import {NewsService} from "./news.service";

@Component({
    selector: 'news-management',
    templateUrl: 'admin-templates/news/news-management.html',
    providers: [NewsService],
    directives: [TabView, TabPanel, NewsCategoryListComponent, NewsListComponent, NewsImageListComponent]
})
export class NewsManagementComponent {
    isCatList:boolean = true;
    isNewsList:boolean = false;
    isImageList:boolean = false;
    id:string;
    isCanceled:boolean = false;
    showForm:boolean = false;

    constructor() {
    }


    showCategoryList(args) {
        this.hideAll();
        this.isCatList = true;
        this.isCanceled = args;
    }

    showNewsList(args) {
        this.hideAll();
        this.isNewsList = true;
        this.isCanceled = args;
    }

    showImageList(args) {
        this.hideAll();
        this.isImageList = true;
        this.id = args;
    }

    hideAll() {
        this.isCatList = false;
        this.isNewsList = false;
        this.isImageList = false;
    }

    public tabSwitch(args) {
        if (1 == args.index) {
            this.hideAll();
            this.isNewsList = true;
        }
        else {
            this.hideAll();
            this.isCatList = true;
        }

    }


}

