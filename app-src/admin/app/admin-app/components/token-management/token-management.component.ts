import {Component, ElementRef, OnInit} from '@angular/core';
import {TokenManagementService} from "./token-manangement.service";
import {TokenModel, TokenResponse} from "./token-managment.model";
import * as moment from 'moment'
import {FormControl} from "@angular/forms";
import{LoginService} from '../../../login-app/components/login/login.service';
import {Router} from "@angular/router";

@Component({
    selector: 'token-list',
    templateUrl: 'admin-templates/token-management/token-management.html',
})

export class TokenManagementComponent implements OnInit {

    objToken:TokenModel = new TokenModel();
    objResponse:TokenModel[] = [];
    showModal:boolean = false;
    /* Pagination */
    perPage:number = 10;
    currentPage:number = 1;
    totalPage:number = 1;
    first:number = 0;
    preIndex:number = 1;
    totalItem:number = 0;
    /* End Pagination */

    ngOnInit() {
        this.perPage = 10;
        this.currentPage = 1;
        this.getApplicationLogList();
    }

    startDate:FormControl = new FormControl('');
    endDate:FormControl = new FormControl('');

    constructor(private _objService:TokenManagementService, private router:Router, private ele:ElementRef, private loginService:LoginService) {

    }

    getApplicationLogList() {
        this._objService.getApplicationLog()
            .subscribe(objRes =>this.bindList(objRes),
                error => this.errorMessage(error)
            );
    }

    errorMessage(TokenResponse:any) {
        jQuery.jAlert({
            'title': 'Alert',
            'content': TokenResponse.message,
            'theme': 'red'
        });
    }

    bindList(objRes:TokenModel[]) {
        this.objResponse = objRes;
        this.totalItem = objRes.length;
        this.preIndex = (this.perPage * (this.currentPage - 1));
        if (this.objResponse) {
            // let totalPage = objRes.totalItems / this.perPage;
            // this.totalPage = totalPage > 1 ? Math.ceil(totalPage) : 1;

            this.sortTable();
        }
    }

    sortTable() {
        setTimeout(()=> {
            jQuery(this.ele.nativeElement).find('.tablesorter').tablesorter({
                headers: {
                    1: {sorter: false},
                    2: {sorter: false},
                    4: {sorter: false}
                }
            });
        }, 50);
    }

    showDetail(logIndex:string) {
        let objTemp:TokenModel;
        objTemp = this.objResponse[logIndex];
        if (objTemp) {
            //  objTemp.addedOn = this.changeDateFormat(objTemp.addedOn);
            this.objToken = objTemp;
            this.showModal = true;
        }
    }

    changeDateFormat(date:string) {
        if (date)
            return moment(date).format("ddd, Do MMM YYYY, hh:mm:ss a");
    }

    deleteLogById(id:string) {

        jQuery.jAlert({
            'type': 'confirm',
            'title': 'Alert',
            'confirmQuestion': 'Are you sure to delete the Token ?',
            'theme': 'red',
            'onConfirm': (e, btn)=> {
                e.preventDefault();
                let objTemp:TokenModel = new TokenModel();
                objTemp._id = id;
                this._objService.deleteLogById(objTemp)
                    .subscribe(res=> {
                            if (this.totalItem > 1)
                                this.getApplicationLogList();
                            jQuery.jAlert({
                                'title': 'Success',
                                'content': res.message,
                                'theme': 'green'
                            });
                        },
                        error=> {
                            jQuery.jAlert({
                                'title': 'Alert',
                                'content': error.message,
                                'theme': 'red'
                            });
                        });
            },
            'onClose': (e, btn)=> {
                if (this.totalItem <= 1) {
                    this.loginService.logout();
                    this.router.navigate(['/login']);
                }
            }
        });
    }

    deleteAllLog() {
        jQuery.jAlert({
            'type': 'confirm',
            'title': 'Alert',
            'confirmQuestion': 'Are you sure to delete all the Token ?',
            'theme': 'red',
            'onConfirm': (e, btn)=> {
                e.preventDefault();
                this._objService.deleteAllLog()
                    .subscribe(res=> {
                            jQuery.jAlert({
                                'title': 'Success',
                                'content': res.message,
                                'theme': 'green',
                                'onClose': ()=> {
                                    this.loginService.logout();
                                    this.router.navigate(['/login']);
                                }
                            });
                        },
                        error=> {
                            jQuery.jAlert({
                                'title': 'Alert',
                                'content': error.message,
                                'theme': 'red'
                            });
                        });
            }
        });

    }


    resStatusMessage(res:any) {
        jQuery.jAlert({
            'title': 'Success',
            'content': res.message,
            'theme': 'green'
        });
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

