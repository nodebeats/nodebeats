import {Component, OnInit} from '@angular/core';
import {RoleService} from "./role.service";
import{RoleModel} from "./role.model";
import {RoleEditorComponent}from "./role-editor.component";

@Component({
    selector: 'role-list',
    templateUrl: 'admin-templates/role/role-list.html'
})

export class RoleComponent implements OnInit {

    objListResponse:RoleModel[];
    error:any;
    showForm:boolean = false;
    roleId:string;

    // /* Pagination */
    perPage:number = 10;
    currentPage:number = 1;
    totalPage:number = 1;
    nextPage:number = 1;
    preIndex:number = 0;
    // /* End Pagination */

    ngOnInit() {
        this.getRoleList();
    }

    constructor(private _objService:RoleService) {
    }

    getRoleList() {
        this._objService.getRoleList()
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

    bindList(objRes:RoleModel[]) {
        this.objListResponse = objRes;
        /* Pagination */
        this.preIndex = (this.perPage * (this.currentPage - 1));

        if (objRes.length > 0) {

            /*End Pagination */
            setTimeout(()=> {
                jQuery('.tablesorter').tablesorter({
                    headers: {
                        2: {sorter: false},
                        3: {sorter: false},
                        4: {sorter: false},
                        5: {sorter: false},
                        6: {sorter: false},
                        7: {sorter: false},
                        8: {sorter: false}

                    }
                });
            }, 50);
        }
    }

    edit(id:string) {
        this.showForm = true;
        this.roleId = id;
    }

    addRole() {
        this.showForm = true;
        this.roleId = null;
    }

    delete(id:string) {
        jQuery.jAlert({
            'type': 'confirm',
            'title': 'Alert',
            'confirmQuestion': 'Are you sure to delete the Image ?',
            'theme': 'red',
            'onConfirm': (e, btn)=> {
                e.preventDefault();
                let objRole:RoleModel = new RoleModel();
                objRole._id = id;
                objRole.deleted = true;
                this._objService.deleteRole(objRole)
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

    showRoleList(arg) {
        if (!arg) // is not Canceled
            this.getRoleList();
        this.showForm = false;
    }


}

