import {Component, OnInit} from '@angular/core';
import {TeamManagementService} from "./team-managment.service";
import{TeamManagementModel, TeamManagementResponse} from "./team-managment.model";

@Component({
    selector: 'team-management-list',
    templateUrl: './team-management-list.html'
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
    first:number = 0;
    bindSort:boolean = false;
    preIndex:number = 0;
    /* End Pagination */
    ngOnInit() {
        this.getTeamMemberList();
    }

    constructor(private _objService:TeamManagementService) {

    }

    getTeamMemberList() {
        this._objService.getTeamMemberList(this.perPage, this.currentPage)
            .subscribe(objRes =>this.bindList(objRes),
                error => this.errorMessage(error));
    }


    bindList(objRes:TeamManagementResponse) {
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
                    4: {sorter: false},
                    5: {sorter: false}
                }
            });

        }, 50);
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
      swal({
          title: "Are you sure?",
          text: "You will not be able to recover this Team member !",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Yes, delete it!",
          closeOnConfirm: false
        },
        ()=> {
          let objDel:TeamManagementModel = new TeamManagementModel();
          objDel._id = id;
          objDel.deleted = true;
          this._objService.deleteTeamMember(objDel)
            .subscribe(res=> {
                this.getTeamMemberList();

                swal("Deleted!", res.message, "success");
              },
              error=> {
                swal("Alert!", error.message, "info");

              });
        });

    }

    successStatusMessage(res:any) {
      swal("Success !", res.message, "success")

    }

    errorMessage(objResponse:any) {
      swal("Alert !", objResponse.message, "info");

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
        {
            this.getTeamMemberList();
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
        this.getTeamMemberList();

    }


}

