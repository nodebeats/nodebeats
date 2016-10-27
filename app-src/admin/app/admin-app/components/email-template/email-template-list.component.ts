import {Component, ElementRef, OnInit} from '@angular/core';
import {EmailTemplateService} from "./email-template.service";
import {EmailTemplateModel, EmailTempalteResponse} from "./email-template.model";
import {Paginator} from 'primeng/primeng';
import {Router} from "@angular/router";

@Component({
    selector: 'email-template-list',
    templateUrl: 'admin-templates/email-template/email-template-list.html'
})

export class EmailTemplateListComponent implements OnInit {

    objEmailTemplate:EmailTemplateModel = new EmailTemplateModel();
    objResponse:EmailTempalteResponse = new EmailTempalteResponse();
    /* Pagination */
    perPage:number = 10;
    currentPage:number = 1;
    totalPage:number = 1;
    first:number = 0;
    bindSort:boolean = false;
    preIndex:number = 1;
    /* End Pagination */

    ngOnInit() {
        this.perPage = 10;
        this.currentPage = 1;
        this.getEmailTemplateList();
    }

    constructor(private _objService:EmailTemplateService, private  router:Router) {
    }

    getEmailTemplateList() {
        this._objService.getEmailTemplate(this.perPage, this.currentPage)
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

    bindList(objRes:EmailTempalteResponse) {
        this.objResponse = objRes;
        this.preIndex = (this.perPage * (this.currentPage - 1));
        if (objRes.totalItems > 0) {
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
                    4: {sorter: false},
                    5: {sorter: false}
                }
            });
        }, 50);
    }

    addTemplate() {
        this.router.navigate(['/admin/email-template/email-template-editor']);
    }

    editDetail(id:string) {
        this.router.navigate(['/admin/email-template/email-template-editor', id]);

    }

    delete(id:string) {

        jQuery.jAlert({
            'type': 'confirm',
            'title': 'Alert',
            'confirmQuestion': 'Are you sure to delete the Template ?',
            'theme': 'red',
            'onConfirm': (e, btn)=> {
                e.preventDefault();
                let objTemp:EmailTemplateModel = new EmailTemplateModel();
                objTemp._id = id;
                objTemp.deleted = true;
                this._objService.deleteTemplate(objTemp)
                    .subscribe(res=> {
                            this.getEmailTemplateList();
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


    pageChanged(event) {
        this.perPage = event.rows;
        this.currentPage = (Math.floor(event.first / event.rows)) + 1;
        this.first = event.first;
        if (event.first == 0)
            this.first = 1;
        this.getEmailTemplateList();
    }


}

