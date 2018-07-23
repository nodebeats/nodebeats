import { Component, OnInit } from "@angular/core";
import { BlogService } from "./blog.service";
import { BlogCategoryModel, BlogCategoryResponse } from "./blog.model";
import { BlogCategoryEditorComponent } from "./blog-category-editor.component";
import { MatPaginator, MatTableDataSource } from "@angular/material";
import { Router } from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: "blog-category-list",
  templateUrl: "./blog-category-list.html"
})
export class BlogCategoryListComponent implements OnInit {
  dataSource: any;
  displayedColumns = ["SN", "Blog Category", "Active", "Actions"];
  objListResponse: BlogCategoryResponse;
  error: any;
  categoryId: string;
  showForm: boolean = false;
  /* Pagination */
  pageSizeOptions = [5, 10, 25, 50, 100];  
  perPage: number = 10;
  currentPage: number = 1;
  totalItems: number = 1;
  preIndex: number = 0;

  ngOnInit() {
    this.getBlogCategoryList();
  }

  constructor(private router: Router, private _objService: BlogService) {}

  getBlogCategoryList() {
    this._objService
      .getBlogCategoryList(this.perPage, this.currentPage)
      .subscribe(
        objRes => this.bindList(objRes),
        error => this.errorMessage(error)
      );
  }

  errorMessage(objResponse: any) {
    Swal("Alert !", objResponse, "info");
  }

  bindList(objRes: BlogCategoryResponse) {
    this.objListResponse = objRes;
    this.totalItems = objRes.totalItems;
    this.dataSource = new MatTableDataSource(this.objListResponse.dataList);
    this.preIndex = (this.perPage * (this.currentPage - 1));
  }

  edit(id: string) {
    this.router.navigate(["/blog/category/editor", id]);
  }

  addCategory() {
    this.router.navigate(["/blog/category/editor"]);
  }

  delete(id: string) {
    Swal({
      title: "Are you sure?",
      text: "You will not be able to recover this Blog Category !",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, delete it!"
    }).then(result => {
      if (result.value) {
        let objTemp: BlogCategoryModel = new BlogCategoryModel();
        objTemp._id = id;
        objTemp.deleted = true;
        this._objService.deleteBlogCategory(objTemp).subscribe(
          res => {
            this.getBlogCategoryList();
            Swal("Deleted!", res.message, "success");
          },
          error => {
            Swal("Alert!", error, "info");
          }
        );
      }
    });
  }

  pageChanged(event: any) {
    this.perPage = event.pageSize;
    this.currentPage = event.pageIndex + 1;
    this.getBlogCategoryList();
  }
}
