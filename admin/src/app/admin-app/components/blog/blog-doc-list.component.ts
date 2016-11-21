import {Component, ElementRef, OnInit, Output, Input, EventEmitter, ViewChild} from '@angular/core';
import {BlogService} from "./blog.service";
import {BlogDocumentModel} from "./blog.model";

@Component({
  selector: 'blog-doc-list',
  templateUrl: '../../views/blog/blog-doc-list.html'
})

export class BlogDocListComponent implements OnInit {

  objListResponse:BlogDocumentModel[];
  error:any;
  @Input() blogId:string;
  @Output() showBlogListEvent:EventEmitter<any> = new EventEmitter();
  showForm:boolean = false;
  docId:string;
  /* Pagination */
  // perPage:number = 10;
  // currentPage:number = 1;
  // totalPage:number = 1;
  // first:number = 0;
  /* End Pagination */


  constructor(private _objService:BlogService) {
  }

  ngOnInit() {
    this.getBlogDocList();
  }

  getBlogDocList() {
    this._objService.getBlogDocList(this.blogId)
      .subscribe(objRes =>this.bindList(objRes),
        error => this.errorMessage(error));
  }

  errorMessage(objResponse:any) {
    swal("Alert !", objResponse.message, "info");
  }

  bindList(objRes:BlogDocumentModel[]) {
    this.objListResponse = objRes;

    if (objRes.length > 0) {
      this.sortTable();
    }
  }

  sortTable() {
    setTimeout(()=> {
      jQuery('.tablesorter').tablesorter({
        headers: {
          2: {sorter: false},
          3: {sorter: false}
        }
      });
    }, 50);
  }

  edit(id:string) {
    this.showForm = true;
    this.docId = id;
  }

  addDoc() {
    this.showForm = true;
    this.docId = null;
  }

  delete(id:string) {

    swal({
        title: "Are you sure?",
        text: "You will not be able to recover this Document !",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: false
      },
      ()=> {
        this._objService.deleteBlogDoc(this.blogId, id)
          .subscribe(res=> {
              this.getBlogDocList();
              swal("Deleted!", res.message, "success");
            },
            error=> {
              swal("Alert!", error.message, "info");

            });
      });
  }

  back() {
    this.showBlogListEvent.emit(true); // cancelled true
  }

  showDocList(arg) {
    if (!arg) // is not Canceled
      this.getBlogDocList();
    this.showForm = false;
    this.sortTable();

  }

}

