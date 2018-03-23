import { Component, OnInit } from '@angular/core';
import { TeamManagementService } from "./team-managment.service";
import { TeamManagementModel, TeamManagementResponse } from "./team-managment.model";
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';

@Component({
    selector: 'team-management-list',
    templateUrl: './team-management-list.html'
})

export class TeamManagementComponent implements OnInit {

    objListResponse: TeamManagementResponse;
    error: any;
    showForm: boolean = false;
    memberId: string;
    displayedColumns = ['SN', 'Member Name', 'Designation', 'Active', 'Actions'];
    dataSource: any;
    /* Pagination */
    pageSizeOptions = [5, 10, 25, 50, 100];
    perPage: number = 10;
    currentPage: number = 1;
    totalItems: number = 1;
    bindSort: boolean = false;
    preIndex: number = 1;
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
                    4: { sorter: false },
                    5: { sorter: false }
                }
            });

        }, 50);
    }

    edit(memberId: string) {
        this.router.navigate(['/team/editor', memberId]);
    }

    addTeamMember() {
        this.router.navigate(['/team/editor']);
    }

    delete(id: string) {
        swal({
            title: "Are you sure?",
            text: "You will not be able to recover this Team member !",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: false
        },
            () => {
                let objDel: TeamManagementModel = new TeamManagementModel();
                objDel._id = id;
                objDel.deleted = true;
                this._objService.deleteTeamMember(objDel)
                    .subscribe(res => {
                        this.getTeamMemberList();

                        swal("Deleted!", res.message, "success");
                    },
                        error => {
                            swal("Alert!", error.message, "info");

                        });
            });

    }

    successStatusMessage(res: any) {
        swal("Success !", res.message, "success")

    }

    errorMessage(objResponse: any) {
        swal("Alert !", objResponse.message, "info");

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

    pageChanged(event) {
        this.perPage = event.pageSize;
        this.currentPage = event.pageIndex + 1;
        this.getTeamMemberList();
    }


}

