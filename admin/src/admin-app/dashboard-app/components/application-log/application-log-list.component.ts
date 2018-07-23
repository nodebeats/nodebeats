import Swal from 'sweetalert2';
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
  today: Date = new Date();
  /* Pagination */
  pageSizeOptions = [5, 10, 25, 50, 100];
  perPage:number = 10;
  currentPage:number = 1;
  totalItems:number = 1;
  bindSort:boolean = false;
  preIndex:number = 0;
  /* End Pagination */
  startDate: FormControl = new FormControl('');
  endDate: FormControl = new FormControl('');

  ngOnInit() {
    this.perPage = 10;
    this.currentPage = 1;
    this.getApplicationLogList();
  }

  constructor(private _objService: ApplicationLogService, private ele: ElementRef) {

  }

  getApplicationLogList() {
    this._objService.getApplicationLog(this.perPage, this.currentPage, this.startDate.value, this.endDate.value)
      .subscribe(objRes =>this.bindList(objRes),
        error => this.errorMessage(error)
      );
  }

  errorMessage(objResponse: any) {
    Swal("Alert !", objResponse, "info");
  }

  bindList(objRes: ApplicationLogResponse) {
    this.objResponse = objRes;
    this.preIndex = (this.perPage * (this.currentPage - 1));
    this.dataSource = new MatTableDataSource(this.objResponse.dataList);        
    this.totalItems = objRes.totalItems;
  }

  showDetail(logIndex: string) {
    let objTemp: ApplicationLogModel;
    objTemp = this.objResponse.dataList[logIndex];
    if (objTemp) {
      this.objLog = objTemp;
      // this.modalFunction();
      this.showModal = true;
    }
  }

  changeDateFormat(date: string) {
    return moment(date).format('YYYY-MM-DD HH:mm:ss');
  }

  deleteLogById(id: string) {
  Swal({
        title: "Are you sure?",
        text: "You will not be able to recover this Log !",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it!",
      })
      .then((result)=> {
        if(result.value){
        let objTemp: ApplicationLogModel = new ApplicationLogModel();
        objTemp._id = id;
        objTemp.deleted = true;
        this._objService.deleteLogById(objTemp)
          .subscribe(res=> {
              this.getApplicationLogList();
              Swal("Deleted!", res.message, "success");
            },
            error=> {
              Swal("Alert!", error, "info");
            });
          }
      });
  }

  deleteAllLog() {
  Swal({
        title: "Are you sure?",
        text: "You will not be able to recover all the Log !",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it!",
      })
      .then((result)=> {
        if(result.value){
        this._objService.deleteAllLog()
          .subscribe(res=> {
              this.getApplicationLogList();
              Swal("Deleted!", res.message, "success");
            },
            error=> {
              Swal("Alert!", error, "info");

            });
          }
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
    Swal("Success !", res.message, "success")
  }

  pageChanged(event: any) {
    this.perPage = event.pageSize;
    this.currentPage = event.pageIndex + 1;
    this.getApplicationLogList();
  }

  modalFunction() {
    jQuery("#errorModal").insertAfter(jQuery(".modal-backdrop.fade"));
  }
}

