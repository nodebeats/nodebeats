import { Component, OnInit } from '@angular/core';
import { TestimonialService } from "./testimonial.service";
import { TestimonialModel, TestimonialResponse } from "./testimonial.model";
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';

@Component({
    selector: 'testimonial-list',
    templateUrl: './testimonial-list.html'
})

export class TestimonialComponent implements OnInit {

    objListResponse: TestimonialResponse;
    error: any;
    showForm: boolean = false;
    testimonialId: string;
    displayedColumns = ['SN','Person Name', 'Organization', 'Active', 'Actions'];
    dataSource:any;
    /* Pagination */
    pageSizeOptions = [5, 10, 25, 50, 100];
    perPage: number = 10;
    currentPage: number = 1;
    totalItems: number = 1;
    bindSort: boolean = false;
    preIndex: number = 1;
    /* End Pagination */
    ngOnInit() {
        this.getTestimonialList();
    }

    constructor(private _objService: TestimonialService, private router: Router) {
    }

    getTestimonialList() {
        this._objService.getTestimonialList(this.perPage, this.currentPage)
            .subscribe(objRes => this.bindList(objRes),
                error => this.errorMessage(error));
    }

    errorMessage(objResponse: any) {
        swal("Alert !", objResponse.message, "info");

    }

    bindList(objRes: TestimonialResponse) {
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
        setTimeout(() => {
            jQuery('.tablesorter').tablesorter({
                headers: {
                    3: { sorter: false },
                    4: { sorter: false }
                }
            });
        }, 50);
    }

    edit(testimonialId: string) {
        this.router.navigate(['/testimonial/editor', testimonialId]);
        // this.showForm = true;
        // this.testimonialId = id;
    }

    addTestimonial() {
        this.router.navigate(['/testimonial/editor']);
        // this.showForm = true;
        // this.testimonialId = null;
    }

    delete(id: string) {
        swal({
            title: "Are you sure?",
            text: "You will not be able to recover this Testimonial !",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: false
        },
            () => {
                let objSlider: TestimonialModel = new TestimonialModel();
                objSlider._id = id;
                objSlider.deleted = true;
                this._objService.deleteTestimonial(objSlider)
                    .subscribe(res => {
                        this.getTestimonialList();
                        swal("Deleted!", res.message, "success");
                    },
                        error => {
                            swal("Alert!", error.message, "info");

                        });
            });

    }

    // showList(arg) {
    //     if (!arg) // is not Canceled
    //     {
    //         this.getTestimonialList();
    //     }
    //     this.showForm = false;
    //     this.sortTable();
    // }


    pageChanged(event) {
        this.perPage = event.pageSize;
        this.currentPage = event.pageIndex + 1;
        this.getTestimonialList();
    }


}

