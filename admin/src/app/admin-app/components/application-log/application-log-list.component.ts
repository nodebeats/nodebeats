import {Component, ElementRef, OnInit} from '@angular/core';
import {ApplicationLogService} from "./application-log.service";
import {ApplicationLogModel, ApplicationLogResponse} from "./application-log.model";
import * as moment from 'moment'
import {FormControl} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import { MatTableDataSource } from '@angular/material';


@Component({
  selector: 'application-log-list',
  templateUrl: './application-log.html',
})

export class ApplicationLogComponent implements OnInit {

  objLog: ApplicationLogModel = new ApplicationLogModel();
  objResponse: ApplicationLogResponse = new ApplicationLogResponse();
  showModal: boolean = false;
  displayedColumns = ['SN','Type', 'Notified', 'Date', 'Actions'];
  dataSource: any;    
  /* Pagination */
  pageSizeOptions = [5, 10, 25, 50, 100];
  perPage:number = 10;
  currentPage:number = 1;
  totalItems:number = 1;
  bindSort:boolean = false;
  preIndex:number = 1;
  /* End Pagination */

  ngOnInit() {
    this.perPage = 10;
    this.currentPage = 1;
    this.getApplicationLogList();
  }

  startDate: FormControl = new FormControl('');
  endDate: FormControl = new FormControl('');

  constructor(private _objService: ApplicationLogService, private ele: ElementRef) {

  }

  getApplicationLogList() {
    this._objService.getApplicationLog(this.perPage, this.currentPage, this.startDate.value, this.endDate.value)
      .subscribe(objRes =>this.bindList(objRes),
        error => this.errorMessage(error)
      );
  }

  errorMessage(objResponse: any) {
    swal("Alert !", objResponse.message, "info");
  }

  bindList(objRes: ApplicationLogResponse) {
    this.objResponse = objRes;
    this.dataSource = new MatTableDataSource(this.objResponse.dataList);        
    this.preIndex = (this.perPage * (this.currentPage - 1));
    this.totalItems = objRes.totalItems;
    if (objRes.totalItems > 0) {
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
      jQuery(this.ele.nativeElement).find('.tablesorter').tablesorter({
        headers: {
          4: {sorter: false}
        }
      });
    }, 50);
  }
  
  showDetail(logIndex: string) {
    let objTemp: ApplicationLogModel;
    objTemp = this.objResponse.dataList[logIndex];
    if (objTemp) {
      this.objLog = objTemp;
      this.modalFunction();
      this.showModal = true;
    }
  }

  changeDateFormat(date: string) {
    return moment(date).format('YYYY-MM-DD HH:mm:ss');
  }

  deleteLogById(id: string) {
    swal({
        title: "Are you sure?",
        text: "You will not be able to recover this Log !",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: false
      },
      ()=> {
        let objTemp: ApplicationLogModel = new ApplicationLogModel();
        objTemp._id = id;
        objTemp.deleted = true;
        this._objService.deleteLogById(objTemp)
          .subscribe(res=> {
              this.getApplicationLogList();
              swal("Deleted!", res.message, "success");
            },
            error=> {
              swal("Alert!", error.message, "info");

            });
      });
  }

  deleteAllLog() {
    swal({
        title: "Are you sure?",
        text: "You will not be able to recover all the Log !",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: false
      },
      ()=> {
        this._objService.deleteAllLog()
          .subscribe(res=> {
              this.getApplicationLogList();
              swal("Deleted!", res.message, "success");
            },
            error=> {
              swal("Alert!", error.message, "info");

            });
      });

  }

  search() {
    this._objService.getApplicationLog(this.perPage, this.currentPage, this.startDate.value, this.endDate.value)
      .subscribe(objRes =>this.bindList(objRes),
        error => this.errorMessage(error));
  }

  sendEmailToSupport() {
    this._objService.sendLogEmailToSupport()
      .subscribe(objRes => {
          this.resStatusMessage(objRes)
          this.getApplicationLogList();
        },
        error => this.errorMessage(error));
  }

  resStatusMessage(res: any) {
    swal("Success !", res.message, "success")

  }

  pageChanged(event) {
    this.perPage = event.pageSize;
    this.currentPage = event.pageIndex + 1;
    this.getApplicationLogList();

  }
  modalFunction() {
    jQuery("#errorModal").insertAfter(jQuery("body"));
  }
}

