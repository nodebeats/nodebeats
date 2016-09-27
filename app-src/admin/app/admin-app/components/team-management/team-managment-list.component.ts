import {Component, OnInit} from '@angular/core';
import {TeamManagementService} from "./team-managment.service";
import{TeamManagementModel, TeamManagementResponse} from "./team-managment.model";
import {TeamManagementEditorComponent} from "./team-management-editor.component";
import {Paginator} from 'primeng/primeng';

@Component({
    selector: 'team-management-list',
    templateUrl: 'admin-templates/team-management/team-management-list.html'
})

export class TeamManagementComponent implements OnInit {

    objListResponse:TeamManagementResponse;
    error:any;
    showForm:boolean = false;
    memberId:string;
    /* Pagination */
    perPage:number = 10;
    currentPage:number = 1;
    totalPage:number = 1;
    nextPage:number = 1;
    preIndex:number = 0;
    /* End Pagination */
    ngOnInit() {
        this.getTeamMemberList();
    }

    constructor(private _objService:TeamManagementService) {

    }

    getTeamMemberList() {
        this._objService.getTeamMemberList()
            .subscribe(objRes =>this.bindList(objRes),
                error => this.errorMessage(error));
    }


    bindList(objRes:TeamManagementResponse) {
        this.objListResponse = objRes;
        this.preIndex = (this.perPage * (this.currentPage - 1));

        if (objRes.dataList.length > 0) {
            let totalPage = objRes.totalItems / this.perPage;
            this.totalPage = totalPage > 1 ? Math.ceil(totalPage) : 1;

            setTimeout(()=> {
                jQuery('.tablesorter').tablesorter({
                    headers: {
                        3: {sorter: false},
                        4: {sorter: false},
                        5: {sorter: false}
                    }
                });
            }, 50);
        }
    }

    edit(id:string) {
        this.showForm = true;
        this.memberId = id;
    }

    addTeamMember() {
        this.showForm = true;
        this.memberId = null;
    }

    delete(id:string) {
        jQuery.jAlert({
            'type': 'confirm',
            'title': 'Alert',
            'confirmQuestion': 'Are you sure to delete the Team member ?',
            'theme': 'red',
            'onConfirm': (e, btn)=> {
                e.preventDefault();
                let objDel:TeamManagementModel = new TeamManagementModel();
                objDel._id = id;
                objDel.deleted = true;
                this._objService.deleteTeamMember(objDel)
                    .subscribe(res=> {
                            this.getTeamMemberList();
                            this.successStatusMessage(res);
                        },
                        error=> {
                            this.errorMessage(error);
                        });
            }
        });
    }

    successStatusMessage(res:any) {
        jQuery.jAlert({
            'title': 'Success',
            'content': res.message,
            'theme': 'green'
        });
    }

    errorMessage(objResponse:any) {
        jQuery.jAlert({
            'title': 'Alert',
            'content': objResponse.message,
            'theme': 'red'
        });
    }

    moveUp(memberId:string, order:number) {
        this._objService.sortTeamOrder(memberId, order, "up")
            .subscribe((res)=> {
                    this.successStatusMessage(res);
                    this.getTeamMemberList();
                },
                (err)=>this.errorMessage(err));
    }


    moveDown(memberId:string, order:number) {
        this._objService.sortTeamOrder(memberId, order, "down")
            .subscribe((res)=> {
                    this.successStatusMessage(res);
                    this.getTeamMemberList();
                },
                (err)=>this.errorMessage(err));

    }

    showList(arg) {
        if (!arg) // is not Canceled
            this.getTeamMemberList();
        this.showForm = false;
    }


    pageChanged(event) {
        this.perPage = event.rows;
        this.currentPage = (Math.floor(event.first / event.rows)) + 1;
        this.getTeamMemberList();
        jQuery(".tablesorter").trigger("update");
    }


}

