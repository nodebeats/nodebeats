import {Component, OnInit} from '@angular/core';
import {BlogService} from "./blog.service";
import {BlogCategoryModel, BlogCategoryResponse} from "./blog.model";
import {Paginator} from 'primeng/primeng';
import {BlogCategoryEditorComponent} from  "./blog-category-editor.component";
import {MatPaginator, MatTableDataSource} from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'blog-category-list',
  templateUrl: './blog-category-list.html'
})

export class BlogCategoryListComponent implements OnInit {
  dataSource: any;
  displayedColumns = ['SN','Blog Category','Active', 'Actions'];
  objListResponse:BlogCategoryResponse = new BlogCategoryResponse();
  error:any;
  categoryId:string;
  showForm:boolean = false;
  /* Pagination */
  perPage:number = 10;
  first:number = 0;
  bindSort:boolean = false;
  currentPage:number = 1;
  totalPage:number = 1;

  ngOnInit() {
    this.getBlogCategoryList();
  }

  constructor(private router: Router, private _objService:BlogService) {
  }

  getBlogCategoryList() {
    this._objService.getBlogCategoryList(this.perPage, this.currentPage)
      .subscribe(objRes =>this.bindList(objRes),
        error => this.errorMessage(error));
  }

  errorMessage(objResponse:any) {
    swal("Alert !", objResponse.message, "info");
  }

  bindList(objRes:BlogCategoryResponse) {
    this.objListResponse = objRes;
    this.dataSource = new MatTableDataSource(this.objListResponse.dataList);        
    if (objRes.dataList.length > 0) {
      let totalPage = objRes.totalItems / this.perPage;
      this.totalPage = totalPage > 1 ? Math.ceil(totalPage) : 1;
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
    this.router.navigate(['/blog/category/editor', id]);
  }

  addCategory() {
    this.router.navigate(['/blog/category/editor']);
  }

  delete(id:string) {
    swal({
        title: "Are you sure?",
        text: "You will not be able to recover this Blog Category !",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: false
      },
      ()=> {
        let objTemp:BlogCategoryModel = new BlogCategoryModel();
        objTemp._id = id;
        objTemp.deleted = true;
        this._objService.deleteBlogCategory(objTemp)
          .subscribe(res=> {
              this.getBlogCategoryList();
              swal("Deleted!", res.message, "success");
            },
            error=> {
              swal("Alert!", error.message, "info");

            });
      });
  }

  pageChanged(event) {
    this.first = event.first;
    if (event.first == 0)
      this.first = 1;
    this.getBlogCategoryList();
    jQuery(".tablesorter").trigger("update");
  }
}

