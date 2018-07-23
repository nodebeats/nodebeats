import {Component, OnInit} from '@angular/core';
import {RoleService} from "./role.service";
import {RoleModel} from "./role.model";
import {Router} from '@angular/router';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import Swal from 'sweetalert2';

@Component({
  selector: 'role-list',
  templateUrl: './role-list.html',
  styleUrls: ['./role-management.scss']
})

export class RoleComponent implements OnInit {

  displayedColumns = ['SN','Role', 'Read', 'Write', 'Create', 'Change','Delete','Active','Actions']; 
  dataSource: any;   
  objListResponse:RoleModel[];

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
    Swal("Alert !", objResponse, "info");
  }

  bindList(objRes:RoleModel[]) {
    this.objListResponse = objRes;
    this.dataSource = new MatTableDataSource(this.objListResponse);
  }

  edit(roleId:string) {
    this.router.navigate(['/role/editor', roleId]);
  }

  addRole() {
    this.router.navigate(['/role/editor']);
  }

  delete(id:string) {
   Swal({
      title: 'Are you sure?',
      text: 'You will not be able to recover this data!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    })
      .then(result => {
        if(result.value) {
          let objRole:RoleModel = new RoleModel();
          objRole._id = id;
          objRole.deleted = true;
          this._objService.deleteRole(objRole)
            .subscribe(res=> {
                this.getRoleList();
                Swal("Deleted!", res.message, "success");
              },
              error=> {
                Swal("Alert!", error, "info");
              });
        }
      });
}
}
