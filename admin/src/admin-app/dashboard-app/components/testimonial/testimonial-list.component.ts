import { Component, OnInit } from "@angular/core";
import { TestimonialService } from "./testimonial.service";
import { TestimonialModel, TestimonialResponse } from "./testimonial.model";
import { Router } from "@angular/router";
import { MatTableDataSource } from "@angular/material";
import Swal from "sweetalert2";

@Component({
  selector: "testimonial-list",
  templateUrl: "./testimonial-list.html"
})
export class TestimonialComponent implements OnInit {
  objListResponse: TestimonialResponse;
  displayedColumns = ["SN", "Person Name", "Organization", "Active", "Actions"];
  dataSource: any;
  /* Pagination */
  pageSizeOptions = [5, 10, 25, 50, 100];
  perPage: number = 10;
  currentPage: number = 1;
  totalItems: number = 1;
  /* End Pagination */
  preIndex: number = 0;

  ngOnInit() {
    this.getTestimonialList();
  }

  constructor(
    private _objService: TestimonialService,
    private router: Router
  ) {}

  getTestimonialList() {
    this._objService
      .getTestimonialList(this.perPage, this.currentPage)
      .subscribe(
        objRes => this.bindList(objRes),
        error => this.errorMessage(error)
      );
  }

  errorMessage(objResponse: any) {
    Swal("Alert !", objResponse, "info");
  }

  bindList(objRes: TestimonialResponse) {
    this.objListResponse = objRes;
    this.dataSource = new MatTableDataSource(this.objListResponse.dataList);
    this.totalItems = objRes.totalItems;
    this.preIndex = (this.perPage * (this.currentPage - 1));
  }

  edit(testimonialId: string) {
    this.router.navigate(["/testimonial/editor", testimonialId]);
  }

  addTestimonial() {
    this.router.navigate(["/testimonial/editor"]);
  }

  delete(id: string) {
    Swal({
      title: "Are you sure?",
      text: "You will not be able to recover this Testimonial !",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, delete it!"
    }).then(result => {
      if (result.value) {
        let objSlider: TestimonialModel = new TestimonialModel();
        objSlider._id = id;
        objSlider.deleted = true;
        this._objService.deleteTestimonial(objSlider).subscribe(
          res => {
            this.getTestimonialList();
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
    this.getTestimonialList();
  }
}
