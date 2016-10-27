import {Component, ElementRef, OnInit} from '@angular/core';
import {ContactService} from "./contact.service";
import {ContactModel, ContactResponse} from "./contact.model";
import {Paginator} from 'primeng/primeng';
import{ContactViewComponent} from "./contact-view.component";

@Component({
    selector: 'contact-list',
    templateUrl: 'admin-templates/contact/contact-list.html'
})

export class ContactListCompoent implements OnInit {

    objContact:ContactModel = new ContactModel();
    showInfo:boolean = false;
    objResponse:ContactResponse = new ContactResponse();
    contactId:string;
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
        this.getContactList();
    }

    constructor(private _objService:ContactService) {
    }

    getContactList() {
        this._objService.getContactList(this.perPage, this.currentPage)
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

    bindList(objRes:ContactResponse) {
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
                    3: {sorter: false},
                    4: {sorter: false}
                }
            });
        }, 50);
    }

    delete(id:string) {

        jQuery.jAlert({
            'type': 'confirm',
            'title': 'Alert',
            'confirmQuestion': 'Are you sure to delete the Contact ?',
            'theme': 'red',
            'onConfirm': (e, btn)=> {
                e.preventDefault();
                let objTemp:ContactModel = new ContactModel();
                objTemp._id = id;
                objTemp.deleted = true;
                this._objService.deleteContact(objTemp)
                    .subscribe(res=> {
                            this.getContactList();
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

    showDetail(id:string) {
        this.showInfo = true;
        this.contactId = id;
    }

    handleCancel(args) {
        this.showInfo = false;
        this.sortTable();
    }

    pageChanged(event) {
        this.perPage = event.rows;
        this.currentPage = (Math.floor(event.first / event.rows)) + 1;
        this.first = event.first;
        if (event.first == 0)
            this.first = 1;
        this.getContactList();
    }


}

