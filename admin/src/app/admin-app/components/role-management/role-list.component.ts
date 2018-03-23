import {Component, OnInit} from '@angular/core';
import {RoleService} from "./role.service";
import {RoleModel} from "./role.model";
import { Router } from '@angular/router';
import {MatPaginator, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'role-list',
  templateUrl: './role-list.html',
  styleUrls: ['./role-management.scss']
})

export class RoleComponent implements OnInit {

  displayedColumns = ['SN','Role', 'Read', 'Write', 'Create', 'Change','Delete','Active','Actions']; 
  dataSource: any;   
  objListResponse:RoleModel[];
  error:any;
  showForm:boolean = false;
  roleId:string;

  // /* Pagination */
  perPage:number = 10;
  currentPage:number = 1;
  totalPage:number = 1;
  first:number = 0;
  bindSort:boolean = false;
  preIndex:number = 0;
  // /* End Pagination */

  ngOnInit() {
    this.getRoleList();
  }

  constructor(private _objService:RoleService, private router: Router) {
  }

  getRoleList() {
    this._objService.getRoleList()
      .subscribe(objRes => this.bindList(objRes),
        error => this.errorMessage(error));
  }

  errorMessage(objResponse:any) {
    swal("Alert !", objResponse.message, "info");

  }

  bindList(objRes:RoleModel[]) {
    this.objListResponse = objRes;
    /* Pagination */
    this.dataSource = new MatTableDataSource(this.objListResponse);
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
          4: {sorter: false},
          5: {sorter: false},
          6: {sorter: false},
          7: {sorter: false},
          8: {sorter: false}

        }
      });
    }, 50);
  }

  edit(roleId:string) {
    this.router.navigate(['/role/editor', roleId]);
    // this.showForm = true;
    // this.roleId = id;
  }

  addRole() {
    this.router.navigate(['/role/editor']);
    
    // this.showForm = true;
    // this.roleId = null;
  }

  delete(id:string) {
    swal({
        title: "Are you sure?",
        text: "You will not be able to recover this Role !",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: false
      },
      ()=> {
        let objRole:RoleModel = new RoleModel();
        objRole._id = id;
        objRole.deleted = true;
        this._objService.deleteRole(objRole)
          .subscribe(res=> {
              this.getRoleList();
              swal("Deleted!", res.message, "success");
            },
            error=> {
              swal("Alert!", error.message, "info");

            });
      });

  }

  // showRoleList(arg) {
  //   if (!arg) // is not Canceled
  //   {
  //     this.getRoleList();
  //   }
  //   this.showForm = false;
  //   this.sortTable();
  // }


}

