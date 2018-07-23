import Swal from 'sweetalert2';
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
  perPage: number = 10;
  currentPage: number = 1;
  totalItems: number = 1;
  /* End Pagination */
  preIndex: number = 0;

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

  categoryFilter(args: any) {
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
    Swal("Alert !", objResponse, "info");
  }

  bindList(objRes:BlogResponse) {
    this.objListResponse = objRes;
    this.dataSource = new MatTableDataSource(this.objListResponse.dataList);        
    this.totalItems = objRes.totalItems;
    this.preIndex = (this.perPage * (this.currentPage - 1));
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
  Swal({
        title: "Are you sure?",
        text: "You will not be able to recover this Blog !",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it!",
      })
      .then((result)=> {
        if(result.value){
        let objTemp:BlogModel = new BlogModel();
        objTemp._id = id;
        objTemp.deleted = true;
        this._objService.deleteBlog(objTemp)
          .subscribe(res=> {
              this.getBlogList();
              Swal("Deleted!", res.message, "success");
            },
            error=> {
              Swal("Alert!", error, "info");
            });
          }
      });
  }

  pageChanged(event: any) {
    this.perPage = event.pageSize;
    this.currentPage = event.pageIndex + 1;
    this.getBlogList();
  }
}

