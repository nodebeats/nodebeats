import {Component, OnInit} from '@angular/core';
import {TestimonialService} from "./testimonial.service";
import{TestimonialModel, TestimonialResponse} from "./testimonial.model";

@Component({
    selector: 'testimonial-list',
    templateUrl: './testimonial-list.html'
})

export class TestimonialComponent implements OnInit {

    objListResponse:TestimonialResponse;
    error:any;
    showForm:boolean = false;
    testimonialId:string;
    /* Pagination */
    perPage:number = 10;
    currentPage:number = 1;
    totalPage:number = 1;
    first:number = 0;
    bindSort:boolean = false;
    preIndex:number = 0;
    /* End Pagination */
    ngOnInit() {
        this.getTestimonialList();
    }

    constructor(private _objService:TestimonialService) {
    }

    getTestimonialList() {
        this._objService.getTestimonialList(this.perPage, this.currentPage)
            .subscribe(objRes =>this.bindList(objRes),
                error => this.errorMessage(error));
    }

    errorMessage(objResponse:any) {
      swal("Alert !", objResponse.message, "info");

    }

    bindList(objRes:TestimonialResponse) {
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

    edit(id:string) {
        this.showForm = true;
        this.testimonialId = id;
    }

    addTestimonial() {
        this.showForm = true;
        this.testimonialId = null;
    }

    delete(id:string) {
      swal({
          title: "Are you sure?",
          text: "You will not be able to recover this Testimonial !",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Yes, delete it!",
          closeOnConfirm: false
        },
        ()=> {
          let objSlider:TestimonialModel = new TestimonialModel();
          objSlider._id = id;
          objSlider.deleted = true;
          this._objService.deleteTestimonial(objSlider)
            .subscribe(res=> {
                this.getTestimonialList();
                swal("Deleted!", res.message, "success");
              },
              error=> {
                swal("Alert!", error.message, "info");

              });
        });

    }

    showList(arg) {
        if (!arg) // is not Canceled
        {
            this.getTestimonialList();
        }
        this.showForm = false;
        this.sortTable();
    }


    pageChanged(event) {
        this.perPage = event.rows;
        this.currentPage = (Math.floor(event.first / event.rows)) + 1;
        this.first = event.first;
        if (event.first == 0)
            this.first = 1;
        this.getTestimonialList();
    }


}

