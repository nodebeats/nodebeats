import Swal from 'sweetalert2';
import {Component, OnInit} from '@angular/core';
import {PartnerService} from "./partner.service";
import {PartnerResponse, PartnerModel} from "./partner.model";
import {Router} from '@angular/router';
import { MatTableDataSource } from '@angular/material';

@Component({
    selector: 'partner-list',
    templateUrl: './partner-list.html'
})

export class PartnerComponent implements OnInit {
    objListResponse:PartnerResponse;
    dataSource:any;
    displayedColumns = ['SN','Partner Name', 'Active', 'Actions'];    
    // /* Pagination */
    pageSizeOptions = [5, 10, 25, 50, 100];    
    perPage:number = 10;
    currentPage:number = 1;
    totalItems:number = 1;
    // /* End Pagination */
    preIndex: number = 0;

    ngOnInit() {
        this.getPartnerList();
    }

    constructor(private router:Router,private _objService:PartnerService) {
    }

    getPartnerList() {
        this._objService.getPartnerList()
            .subscribe(objRes => this.bindList(objRes),
                error => this.errorMessage(error));
    }

    errorMessage(objResponse:any) {
        Swal("Alert !", objResponse, "info");
    }

    bindList(objRes:PartnerResponse) {
        this.objListResponse = objRes;
        this.dataSource = new MatTableDataSource(this.objListResponse.dataList);   
        this.totalItems = objRes.totalItems;
        this.preIndex = (this.perPage * (this.currentPage - 1));
    }

    edit(id:string) {
        this.router.navigate(['/partner/editor',id]);
    }

    addPartner() {
        this.router.navigate(['/partner/editor']);
    }

    delete(id:string) {
    Swal({
          title: "Are you sure?",
          text: "You will not be able to recover this Image !",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Yes, delete it!"
        })
        .then((result)=> {
            if(result.value){
          let objPartner:PartnerModel = new PartnerModel();
          objPartner._id = id;
          objPartner.deleted = true;
          this._objService.deletePartner(objPartner)
            .subscribe(res=> {
                this.getPartnerList();
                Swal("Deleted!", res.message, "success");
              },
              error=> {
                Swal("Alert!", error, "info");
              });
            }
        });
    }

    pageChanged(event: any) {
        this.perPage = event.pageSize;
        this.currentPage = event.pageIndex + 1;
        this.getPartnerList();
      }
}

