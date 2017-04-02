import {Component, ElementRef, OnInit} from '@angular/core';
import {ApplicationLogService} from "./application-log.service";
import {ApplicationLogModel, ApplicationLogResponse} from "./application-log.model";
import * as moment from 'moment'
import {FormControl} from "@angular/forms";

@Component({
  selector: 'application-log-list',
  templateUrl: './application-log.html',
})

export class ApplicationLogComponent implements OnInit {

  objLog: ApplicationLogModel = new ApplicationLogModel();
  objResponse: ApplicationLogResponse = new ApplicationLogResponse();
  showModal: boolean = false;
  /* Pagination */
  perPage: number = 10;
  currentPage: number = 1;
  totalPage: number = 1;
  first: number = 0;
  bindSort: boolean = false;
  preIndex: number = 1;
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
    this.preIndex = (this.perPage * (this.currentPage - 1));
    if (objRes.totalItems > 0) {
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
      //  objTemp.addedOn = this.changeDateFormat(objTemp.addedOn);
      this.objLog = objTemp;
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
    this.perPage = event.rows;
    this.currentPage = (Math.floor(event.first / event.rows)) + 1;
    this.first = event.first;
    if (event.first == 0)
      this.first = 1;
    this.getApplicationLogList();

  }


}

