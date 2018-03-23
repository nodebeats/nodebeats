import {Component, OnInit} from '@angular/core';
import {BlogService} from "./blog.service";
import {BlogModel,  BlogResponse, BlogCategoryResponse} from "./blog.model";
import {MatPaginator, MatTableDataSource} from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'blog-list',
  templateUrl: './blog-list.html'
})

export class BlogListComponent implements OnInit {
  displayedColumns = ['SN','Blog Title', 'Blog Author', 'Active', 'Actions'];
  dataSource: any;  
  objListResponse:BlogResponse = new BlogResponse();
  objCatList:BlogCategoryResponse = new BlogCategoryResponse();
  showForm:boolean = false;
  blogId:string;
  /* Pagination */
  pageSizeOptions = [5, 10, 25, 50, 100];
  perPage:number = 10;
  currentPage:number = 1;
  totalItems:number = 1;
  bindSort:boolean = false;
  preIndex:number = 1;
  /* End Pagination */

  ngOnInit() {
    this.getBlogList();
    this.getCategoryList();
  }

  constructor(private router: Router, private _objService:BlogService) {
  }

  getCategoryList() {
    this._objService.getBlogCategoryList(100, 1, true)
      .subscribe(res=>this.objCatList = res,
        error=>this.errorMessage(error)
      )
  }

  categoryFilter(args) {
    let categoryId = (<HTMLSelectElement>args).value;
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
    this.dataSource = new MatTableDataSource(this.objListResponse.dataList);        
    this.preIndex = (this.perPage * (this.currentPage - 1));
    this.totalItems = objRes.totalItems;
    if (objRes.dataList.length > 0) {
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

  addBlog() {
    this.router.navigate(['/blog/editor']);
  }

  edit(id:string) {
    this.router.navigate(['/blog/editor', id]);
  }

  showDocList(blogId:string) {
    this.router.navigate(['/blog/documents', blogId]);
  }

  showMetaForm(blogId:string) {
    this.router.navigate(['/blog/metatag', blogId]);
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
    this.perPage = event.pageSize;
    this.currentPage = event.pageIndex + 1;
    this.getBlogList();
  }
}

