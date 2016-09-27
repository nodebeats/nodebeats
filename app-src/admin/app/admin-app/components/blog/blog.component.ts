/**
 * Created by sanedev on 6/27/16.
 */
import {TabView, TabPanel} from 'primeng/primeng';
import{Component}from'@angular/core';
import {BlogService} from "./blog.service";
import {BlogCategoryListComponent} from './blog-category-list.component';
import {BlogListComponent} from './blog-list.component';
import {BlogDocListComponent} from './blog-doc-list.component';
import {BlogMetaTagEditorComponent} from './blog-metatag.component';

@Component({
    selector: 'blog-management',
    templateUrl: 'admin-templates/blog/blog-management.html'
})
export class BlogManagementComponent {
    isCatList:boolean = true;
    isBlogList:boolean = false;
    isDocList:boolean = false;
    isMetaForm:boolean = false;
    isCanceled:boolean = false;
    id:string;

    constructor() {
    }

    showBlogList(args) {
        this.hideAll();
        this.isBlogList = true;
        this.isCanceled = args;
    }

    showDocList(args) {
        this.hideAll();
        this.isDocList = true;
        this.id = args;
    }

    showMetaForm(args) {
        this.hideAll();
        this.isMetaForm = true;
        this.id = args;
    }

    hideAll() {
        this.isCatList = false;
        this.isDocList = false;
        this.isBlogList = false;
        this.isMetaForm = false;
    }

    public tabSwitch(args) {
        //  if (args.active) {
        if (1 == args.index) {
            this.hideAll();
            this.isBlogList = true;
        }
        else {
            this.hideAll();
            this.isCatList = true;
        }
    }


}

