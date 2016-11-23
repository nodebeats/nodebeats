import {Component, ElementRef, OnInit, Output, Input, EventEmitter} from '@angular/core';
import {PartnerService} from "./partner.service";
import{PartnerResponse, PartnerModel} from "./partner.model";

@Component({
    selector: 'partner-list',
    templateUrl: './partner-list.html'
})

export class PartnerComponent implements OnInit {

    objListResponse:PartnerResponse = new PartnerResponse();
    error:any;
    showForm:boolean = false;
    partnerId:string;

    // /* Pagination */
    perPage:number = 10;
    currentPage:number = 1;
    totalPage:number = 1;
    first:number = 0;
    bindSort:boolean = false;
    preIndex:number = 0;
    // /* End Pagination */

    ngOnInit() {
        this.getPartnerList();
    }

    constructor(private _objService:PartnerService) {
    }

    getPartnerList() {
        this._objService.getPartnerList()
            .subscribe(objRes => this.bindList(objRes),
                error => this.errorMessage(error));
    }

    errorMessage(objResponse:any) {
      swal("Alert !", objResponse.message, "info");

    }

    bindList(objRes:PartnerResponse) {
        this.objListResponse = objRes;
        /* Pagination */
        this.preIndex = (this.perPage * (this.currentPage - 1));

        if (objRes.dataList.length > 0) {
            let totalPage = objRes.totalItems / this.perPage;
            this.totalPage = totalPage > 1 ? Math.ceil(totalPage) : 1;
            this.sortTable();
            /*End Pagination */

        }
    }

    sortTable() {
        setTimeout(()=> {
            jQuery('.tablesorter').tablesorter({
                headers: {
                    2: {sorter: false},
                    3: {sorter: false}
                }
            });
        }, 50);
    }

    edit(id:string) {
        this.showForm = true;
        this.partnerId = id;
    }

    addPartner() {
        this.showForm = true;
        this.partnerId = null;
    }

    delete(id:string) {
      swal({
          title: "Are you sure?",
          text: "You will not be able to recover this Image !",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Yes, delete it!",
          closeOnConfirm: false
        },
        ()=> {
          let objPartner:PartnerModel = new PartnerModel();
          objPartner._id = id;
          objPartner.deleted = true;
          this._objService.deletePartner(objPartner)
            .subscribe(res=> {
                this.getPartnerList();
                swal("Deleted!", res.message, "success");
              },
              error=> {
                swal("Alert!", error.message, "info");

              });
        });

    }

    showPartnerList(arg) {
        if (!arg) // is not Canceled
            this.getPartnerList();
        this.showForm = false;
        this.sortTable();
    }


}

