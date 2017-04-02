/**
 * Created by sanedev on 6/27/16.
 */
import{Component}from'@angular/core';

@Component({
  selector: 'blog-management',
  templateUrl: './blog-management.html'
})
export class BlogManagementComponent {
  isCatList: boolean = false;
  isBlogList: boolean = true;
  isDocList: boolean = false;
  isMetaForm: boolean = false;
  isCanceled: boolean = false;
  id: string;

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
      this.isCatList = true;
    }
    else {
      this.hideAll();
      this.isBlogList = true;
    }
  }


}

