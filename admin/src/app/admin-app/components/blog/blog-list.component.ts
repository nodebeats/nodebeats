import {Component, ElementRef, OnInit, Output, EventEmitter, Input, OnChanges} from '@angular/core';
import {BlogService} from "./blog.service";
import {BlogModel, BlogCategoryModel, BlogResponse, BlogCategoryResponse, BlogTagModel} from "./blog.model";
import {Paginator} from 'primeng/primeng';
import{BlogEditorComponent} from"./blog-editor.component";

@Component({
  selector: 'blog-list',
  templateUrl: '../../views/blog/blog-list.html'
})

export class BlogListComponent implements OnInit,OnChanges {

  objListResponse:BlogResponse = new BlogResponse();
  objCatList:BlogCategoryResponse = new BlogCategoryResponse();
  showForm:boolean = false;
  blogId:string;
  // @Output() showFormEvent:EventEmitter<any> = new EventEmitter();
  @Output() showDocListEvent:EventEmitter<any> = new EventEmitter();
  @Output() showMetaFormEvent:EventEmitter<any> = new EventEmitter();
  @Input() autoCompleteData:string[];
  @Input() isCanceled:string;
  @Input() showList:boolean;
  /* Pagination */
  perPage:number = 10;
  currentPage:number = 1;
  totalPage:number = 1;
  first:number = 0;
  bindSort:boolean = false;
  preIndex:number = 0;
  /* End Pagination */

  ngOnInit() {
    this.perPage = 10;
    this.currentPage = 1;
    //if (!this.isCanceled)
    this.getBlogList();
  }

  ngOnChanges() {
    if (this.showList) {
      this.showForm = !this.showList;
      this.getCategoryList();
    }

  }

  constructor(private _objService:BlogService) {
  }


  getCategoryList() {
    this._objService.getBlogCategoryList(100, 1, true)
      .subscribe(res=>this.objCatList = res,
        error=>this.errorMessage(error)
      )
  }

  categoryFilter(args) {
    let categoryId = (<HTMLSelectElement>args.srcElement).value;
    this.currentPage = 1;
    this._objService.getBlogList(this.perPage, this.currentPage, categoryId)
      .subscribe(res => this.bindList(res),
        error=>this.errorMessage(error));
  }

  getBlogList() {
    this._objService.getBlogList(this.perPage, this.currentPage)
      .subscribe(objRes =>this.bindList(objRes),
        error => this.errorMessage(error));
  }

  errorMessage(objResponse:any) {
    swal("Alert !", objResponse.message, "info");
  }

  bindList(objRes:BlogResponse) {
    this.objListResponse = objRes;
    this.preIndex = (this.perPage * (this.currentPage - 1));
    if (objRes.dataList.length > 0) {
      let totalPage = objRes.totalItems / this.perPage;
      this.totalPage = totalPage > 1 ? Math.ceil(totalPage) : 1;
      if (!this.bindSort) {
        this.bindSort = true;
        this.sortTable();
      }
      else
        jQuery("table").trigger("update", [true]);

    }
  }

  sortTable() {
    setTimeout(()=> {
      jQuery('.tablesorter').tablesorter({
        headers: {
          3: {sorter: false},
          4: {sorter: false}
        }
      });
    }, 50);
  }

  addNews() {
    // this.showFormEvent.emit(null);
    this.showForm = true;
    this.blogId = null;
  }


  edit(id:string) {
    // this.showFormEvent.emit(id);
    this.showForm = true;
    this.blogId = id;
  }

  showBlogList(args) {
    if (!args) {

      this.getBlogList();
    }
    this.showForm = false;
    this.sortTable();

  }

  showDocList(blogId:string) {
    this.showDocListEvent.emit(blogId);
  }

  showMetaForm(blogId:string) {
    this.showMetaFormEvent.emit(blogId);
  }

  delete(id:string) {
    swal({
        title: "Are you sure?",
        text: "You will not be able to recover this Blog !",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: false
      },
      ()=> {
        let objTemp:BlogModel = new BlogModel();
        objTemp._id = id;
        objTemp.deleted = true;
        this._objService.deleteBlog(objTemp)
          .subscribe(res=> {
              this.getBlogList();
              swal("Deleted!", res.message, "success");
            },
            error=> {
              swal("Alert!", error.message, "info");

            });
      });
  }

  pageChanged(event) {
    this.perPage = event.rows;
    this.currentPage = (Math.floor(event.first / event.rows)) + 1;
    this.first = event.first;
    if (event.first == 0)
      this.first = 1;
    this.getBlogList();
  }


}

