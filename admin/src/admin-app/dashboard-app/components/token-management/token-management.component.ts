import {Component, ElementRef, OnInit} from '@angular/core';
import {TokenManagementService} from "./token-manangement.service";
import {TokenModel} from "./token-managment.model";
import * as moment from 'moment';
import {FormControl} from "@angular/forms";
import{LoginService} from '../../../login-app/components/login/login.service';
import {Router} from "@angular/router";
import {Config} from "../../../shared/configs/general.config";
import { MatTableDataSource } from '@angular/material';
import Swal from 'sweetalert2';

@Component({
  selector: 'token-list',
  templateUrl: './token-management.html',
})

export class TokenManagementComponent implements OnInit {

  objToken: TokenModel = new TokenModel();
  objResponse: TokenModel[] = [];
  showModal: boolean = false;
  displayedColumns = ['SN','User ID', 'IP Address', 'Expires On', 'Actions'];
  dataSource:any;    
  /* Pagination */
  perPage: number = 10;
  currentPage: number = 1;
  totalPage: number = 1;
  first: number = 0;
  preIndex: number = 0;
  totalItem: number = 0;
  /* End Pagination */
  currentToken: string = Config.getAuthToken();

  ngOnInit() {
    this.perPage = 10;
    this.currentPage = 1;
    this.getApplicationLogList();
  }

  startDate: FormControl = new FormControl('');
  endDate: FormControl = new FormControl('');

  constructor(private _objService: TokenManagementService, private router: Router, private ele: ElementRef, private loginService: LoginService) {

  }

  getApplicationLogList() {
    this._objService.getApplicationLog()
      .subscribe(objRes =>this.bindList(objRes),
        error => this.errorMessage(error)
      );
  }

  errorMessage(objResponse: any) {
  Swal("Alert !", objResponse, "info");

  }

  bindList(objRes: TokenModel[]) {
    this.objResponse = objRes;
    this.dataSource = new MatTableDataSource(this.objResponse);          
    this.totalItem = objRes.length;
    this.preIndex = (this.perPage * (this.currentPage - 1));
  }

  showDetail(logIndex: string) {
    let objTemp: TokenModel;
    objTemp = this.objResponse[logIndex];
    if (objTemp) {
      //  objTemp.addedOn = this.changeDateFormat(objTemp.addedOn);
      this.objToken = objTemp;
      this.showModal = true;
    }
  }

  changeDateFormat(date: string) {
    if (date)
      return moment(date).format("ddd, Do MMM YYYY, hh:mm:ss a");
  }

  deleteLogById(id: string) {
  Swal({
        title: "Are you sure?",
        text: "You will not be able to recover this Token !",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it!",
      })
      .then((result)=> {
        if(result.value){
        let objTemp: TokenModel = new TokenModel();
        objTemp._id = id;
        this._objService.deleteLogById(objTemp)
          .subscribe(res=> {
              if (this.totalItem > 1)
                this.getApplicationLogList();
              else this.totalItem = 0;
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
        text: "You will not be able to recoverall the Token  !",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it!",
      })
      .then((result)=> {
        if(result.value){
        this._objService.deleteAllLog()
          .subscribe(res=> {
             Swal({
                title: "Deleted !",
                type: "success",
                text: res.message,
                timer: 3000,
                showConfirmButton: false
              });
              this.loginService.logout();
              this.router.navigate(['/login']);
            },
            error=> {
              Swal("Alert!", error, "info");
            });
          }
      });
  }


  resStatusMessage(res: any) {
    Swal("Success !", res.message, "success")
  }

  pageChanged(event: any) {
    this.perPage = event.rows;
    this.currentPage = (Math.floor(event.first / event.rows)) + 1;
    this.first = event.first;
    if (event.first == 0)
      this.first = 1;
    this.getApplicationLogList();
  }


}

