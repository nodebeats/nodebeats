
import{Component}from'@angular/core';


@Component({
    selector: 'news-management',
    templateUrl: './news-management.html'
})
export class NewsManagementComponent {
    navLinks: any[] = [{label:'News', path: '/news'}, {label: 'NewsCategory', path: '/news/category'}];

    constructor() {
    }


    
    // public tabSwitch(args) {
    //     console.log(args)
    //     if (1 == args.index) {
    //         this.hideAll();
    //       this.isCatList = true;
    //     }
    //     else {
    //         this.hideAll();
    //       this.isNewsList = true;
    //     }

    // }


}

