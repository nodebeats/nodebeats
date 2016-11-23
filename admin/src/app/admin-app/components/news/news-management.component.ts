
import{Component}from'@angular/core';


@Component({
    selector: 'news-management',
    templateUrl: './news-management.html'
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

