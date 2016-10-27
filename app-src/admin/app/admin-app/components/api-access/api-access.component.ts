import {Component, OnInit} from '@angular/core';
import {ApiAccessService} from "./api-access.service";
import{ApiAccessModel} from "./api-access.model";
import {ApiAccessEditorComponent}from "./api-access-editor.component";

@Component({
    selector: 'api-access-list',
    templateUrl: 'admin-templates/api-access/api-access-list.html'
})

export class ApiAccessComponent implements OnInit {

    objListResponse:ApiAccessModel[];
    error:any;
    showForm:boolean = false;
    accessId:string;

    // /* Pagination */
    perPage:number = 10;
    currentPage:number = 1;
    totalPage:number = 1;
    first:number = 0;
    preIndex:number = 0;
    bindSort:boolean = false;
    // /* End Pagination */

    ngOnInit() {
        this.getRoleList();
    }

    constructor(private _objService:ApiAccessService) {
    }

    getRoleList() {
        this._objService.getAccessList()
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

    bindList(objRes:ApiAccessModel[]) {
        this.objListResponse = objRes;
        /* Pagination */
        this.preIndex = (this.perPage * (this.currentPage - 1));

        if (objRes.length > 0) {

            /*End Pagination */
            if (!this.bindSort) {
                this.bindSort = true;
                this.sortTable();
            }
        }
    }

    sortTable() {
        setTimeout(()=> {
            jQuery('.tablesorter').tablesorter({
                headers: {
                    2: {sorter: false},
                    3: {sorter: false},
                    4: {sorter: false}
                }
            });
        }, 50);
    }

    edit(id:string) {
        this.showForm = true;
        this.accessId = id;
    }

    addApiAccess() {
        this.showForm = true;
        this.accessId = null;
    }

    delete(id:string) {
        jQuery.jAlert({
            'type': 'confirm',
            'title': 'Alert',
            'confirmQuestion': 'Are you sure to delete the Image ?',
            'theme': 'red',
            'onConfirm': (e, btn)=> {
                e.preventDefault();
                let objRole:ApiAccessModel = new ApiAccessModel();
                objRole._id = id;
                objRole.deleted = true;
                this._objService.deleteAccess(objRole)
                    .subscribe(res=> {
                            this.getRoleList();
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

    showAccessList(arg) {
        if (!arg) // is not Canceled
        {
            this.getRoleList();

        }
        this.showForm = false;
        this.sortTable();
    }


}

