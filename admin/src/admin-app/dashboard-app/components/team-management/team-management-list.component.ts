import { Component, OnInit } from '@angular/core';
import { TeamManagementService } from "./team-managment.service";
import { TeamManagementModel, TeamManagementResponse } from "./team-managment.model";
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import Swal from 'sweetalert2';

@Component({
    selector: 'team-management-list',
    templateUrl: './team-management-list.html'
})

export class TeamManagementComponent implements OnInit {
    objListResponse: TeamManagementResponse;
    error: any;
    showForm: boolean = false;
    memberId: string;
    displayedColumns = ['SN', 'Member Name', 'Designation', 'Order', 'Active', 'Actions'];
    dataSource: any;
    /* Pagination */
    pageSizeOptions = [5, 10, 25, 50, 100];
    perPage: number = 10;
    currentPage: number = 1;
    totalItems: number = 1;
    preIndex: number = 0;
    /* End Pagination */
    
    ngOnInit() {
        this.getTeamMemberList();
    }

    constructor(private _objService: TeamManagementService, private router: Router) {

    }

    getTeamMemberList() {
        this._objService.getTeamMemberList(this.perPage, this.currentPage)
            .subscribe(objRes => this.bindList(objRes),
                error => this.errorMessage(error));
    }

    bindList(objRes: TeamManagementResponse) {
        this.objListResponse = objRes;
        this.preIndex = (this.perPage * (this.currentPage - 1));
        this.dataSource = new MatTableDataSource(this.objListResponse.dataList);
        this.totalItems = objRes.totalItems;
        this.preIndex = (this.perPage * (this.currentPage - 1));
    }

    edit(memberId: string) {
        this.router.navigate(['/team/editor', memberId]);
    }

    addTeamMember() {
        this.router.navigate(['/team/editor']);
    }

    delete(id: string) {
      Swal({
            title: "Are you sure?",
            text: "You will not be able to recover this Team member !",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!"
        })
            .then((result) => {
                if(result.value){
                let objDel: TeamManagementModel = new TeamManagementModel();
                objDel._id = id;
                objDel.deleted = true;
                this._objService.deleteTeamMember(objDel)
                    .subscribe(res => {
                        this.getTeamMemberList();
                       Swal("Deleted!", res.message, "success");
                    },
                        error => {
                           Swal("Alert!", error, "info");
                        });
                    }
            });
    }

    successStatusMessage(res: any) {
      Swal("Success !", res.message, "success");
    }

    errorMessage(objResponse: any) {
      Swal("Alert !", objResponse, "info");
    }

    moveUp(memberId: string, order: number) {
        this._objService.sortTeamOrder(memberId, order, "up")
            .subscribe((res) => {
                this.successStatusMessage(res);
                this.getTeamMemberList();
            },
                (err) => this.errorMessage(err));
    }


    moveDown(memberId: string, order: number) {
        this._objService.sortTeamOrder(memberId, order, "down")
            .subscribe((res) => {
                this.successStatusMessage(res);
                this.getTeamMemberList();
            },
                (err) => this.errorMessage(err));
    }

    pageChanged(event: any) {
        this.perPage = event.pageSize;
        this.currentPage = event.pageIndex + 1;
        this.getTeamMemberList();
    }
}

