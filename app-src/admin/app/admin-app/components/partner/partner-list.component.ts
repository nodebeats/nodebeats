import {Component, ElementRef, OnInit, Output, Input, EventEmitter} from '@angular/core';
import {PartnerService} from "./partner.service";
import{PartnerResponse, PartnerModel} from "./partner.model";
import {PartnerEditorComponent}from "./partner-editor.component";

@Component({
    selector: 'partner-list',
    templateUrl: 'admin-templates/partner/partner-list.html'
})

export class PartnerComponent implements OnInit {

    objListResponse:PartnerResponse = new PartnerResponse();
    error:any;
    showForm:boolean = false;
    partnerId:string;

    // /* Pagination */
    perPage:number = 10;
    currentPage:number = 1;
    totalPage:number = 1;
    nextPage:number = 1;
    preIndex:number = 0;
    // /* End Pagination */

    ngOnInit() {
        this.getPartnerList();
    }

    constructor(private _objService:PartnerService) {
    }

    getPartnerList() {
        this._objService.getPartnerList()
            .subscribe(objRes => this.bindList(objRes),
                error => this.errorMessage(error));
    }

    errorMessage(objResponse:any) {
        jQuery.jAlert({
            'title': 'Alert',
            'content': objResponse.message,
            'theme': 'red'
        });
    }

    bindList(objRes:PartnerResponse) {
        this.objListResponse = objRes;
        /* Pagination */
        this.preIndex = (this.perPage * (this.currentPage - 1));

        if (objRes.dataList.length > 0) {
            let totalPage = objRes.totalItems / this.perPage;
            this.totalPage = totalPage > 1 ? Math.ceil(totalPage) : 1;

            /*End Pagination */
            setTimeout(()=> {
                jQuery('.tablesorter').tablesorter({
                    headers: {
                        2: {sorter: false},
                        3: {sorter: false}
                    }
                });
            }, 50);
        }
    }

    edit(id:string) {
        this.showForm = true;
        this.partnerId = id;
    }

    addPartner() {
        this.showForm = true;
        this.partnerId = null;
    }

    delete(id:string) {
        jQuery.jAlert({
            'type': 'confirm',
            'title': 'Alert',
            'confirmQuestion': 'Are you sure to delete the Image ?',
            'theme': 'red',
            'onConfirm': (e, btn)=> {
                e.preventDefault();
                let objPartner:PartnerModel = new PartnerModel();
                objPartner._id = id;
                objPartner.deleted = true;
                this._objService.deletePartner(objPartner)
                    .subscribe(res=> {
                            this.getPartnerList();
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

    showPartnerList(arg) {
        if (!arg) // is not Canceled
            this.getPartnerList();
        this.showForm = false;
    }


}

