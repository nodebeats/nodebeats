import {Component, OnInit} from '@angular/core';
import {ApiAccessService} from "./api-access.service";
import {ApiAccessModel} from "./api-access.model";
import { Router, NavigationEnd } from '@angular/router';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import Swal from 'sweetalert2';

@Component({
  selector: 'api-access-list',
  templateUrl: './api-access-list.html',
  styleUrls: ['./api-access.component.css']
})

export class ApiAccessComponent implements OnInit {
  objListResponse:ApiAccessModel[];
  accessId:string;  
  dataSource: any;
  breadcrumbs: any;
  displayedColumns = ['SN','Api Route', 'Role', 'Active', 'Actions'];
  // /* Pagination */
  perPage:number = 10;
  currentPage:number = 1;
  totalPage:number = 1;
  first:number = 0;
  preIndex:number = 0;
  bindSort:boolean = false;
  // /* End Pagination */

  constructor(private _objService:ApiAccessService, private router:Router) {
  }
  
  ngOnInit() {
    this.getApiAccessList();
  }

  getApiAccessList() {
    this._objService.getAccessList()
      .subscribe(objRes => this.bindList(objRes),
        error => this.errorMessage(error));
  }

  errorMessage(objResponse:any) {
    Swal("Alert !", objResponse, "info");
  }

  bindList(objRes:ApiAccessModel[]) {
    this.objListResponse = objRes;
    /* Pagination */
    this.dataSource = new MatTableDataSource(this.objListResponse);
  }

  edit(id:string) {
    this.router.navigate(['/access/editor', id]);
  }

  addApiAccess() {
    this.router.navigate(['/access/editor']);
  }

  delete(id:string) {
  Swal({
        title: "Are you sure?",
        text: "You will not be able to recover this Access !",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it!",
      })
      .then((result) => {
        if(result.value){
          let objRole:ApiAccessModel = new ApiAccessModel();
          objRole._id = id;
          objRole.deleted = true;
          this._objService.deleteAccess(objRole)
            .subscribe(res=> {
                this.getApiAccessList();
                Swal("Deleted!", res.message, "success");
              },
              error=> {
                Swal("Alert!", error, "info");
              });
        }
      });
  }
}

