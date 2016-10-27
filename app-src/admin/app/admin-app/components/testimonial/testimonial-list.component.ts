import {Component, OnInit} from '@angular/core';
import {TestimonialService} from "./testimonial.service";
import{TestimonialModel, TestimonialResponse} from "./testimonial.model";
import {TestimonialEditorComponent} from "./testimonial-editor.component";
import {Paginator} from 'primeng/primeng';
import {FadeInDirective}from '../../../shared/directives/fadeInDirective';

@Component({
    selector: 'testimonial-list',
    templateUrl: 'admin-templates/testimonial/testimonial-list.html'
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
        jQuery.jAlert({
            'title': 'Alert',
            'content': objResponse.message,
            'theme': 'red'
        });
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
        jQuery.jAlert({
            'type': 'confirm',
            'title': 'Alert',
            'confirmQuestion': 'Are you sure to delete the Testimonial ?',
            'theme': 'red',
            'onConfirm': (e, btn)=> {
                e.preventDefault();
                let objSlider:TestimonialModel = new TestimonialModel();
                objSlider._id = id;
                objSlider.deleted = true;
                this._objService.deleteTestimonial(objSlider)
                    .subscribe(res=> {
                            this.getTestimonialList();
                            jQuery.jAlert({
                                'title': 'Success',
                                'content': res.message,
                                'theme': 'green'
                            });
                        },
                        error=> {
                            jQuery.jAlert({
                                'title': 'Alert',
                                'content': error.message,
                                'theme': 'red'
                            });
                        });
            }
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

