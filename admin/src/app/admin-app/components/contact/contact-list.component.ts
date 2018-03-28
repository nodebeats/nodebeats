import Swal from 'sweetalert2';
import {Component, ElementRef, OnInit} from '@angular/core';
import {ContactService} from "./contact.service";
import {ContactModel, ContactResponse} from "./contact.model";
import {ContactViewComponent} from "./contact-view.component";
import {ActivatedRoute,Router} from '@angular/router';
import {Location} from '@angular/common';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'contact-list',
  templateUrl: './contact-list.html'
})

export class ContactListComponent implements OnInit {
  objContact:ContactModel = new ContactModel();
  objResponse:ContactResponse = new ContactResponse();
  contactId:string;
  dataSource: any;
  displayedColumns = ['SN','Full Name', 'Email', 'Contact Number','Date', 'Actions'];  
  /* Pagination */
  pageSizeOptions = [5, 10, 25, 50, 100];
  perPage:number = 10;
  currentPage:number = 1;
  totalItems:number = 1;
  /* End Pagination */

  ngOnInit() {
    this.perPage = 10;
    this.currentPage = 1;
    this.getContactList();
  }

  constructor(private _objService:ContactService, private router:Router,private location: Location) {
  }

  getContactList() {
    this._objService.getContactList(this.perPage, this.currentPage)
      .subscribe(objRes =>this.bindList(objRes),
        error => this.errorMessage(error));
  }

  errorMessage(objResponse:any) {
    Swal("Alert !", objResponse.message, "info");
  }

  bindList(objRes:ContactResponse) {
    this.objResponse = objRes;
    this.dataSource = new MatTableDataSource(this.objResponse.dataList);        
    this.totalItems = objRes.totalItems;
  }

  changeDateFormat(data:string) {
    return new Date(data).toLocaleString('en-GB', {
      month: "numeric",
      year: "numeric",
      day: "numeric",
      hour12: false,
      hour: "numeric",
      minute: "numeric"
    });
  }

  delete(id:string) {
  Swal({
        title: "Are you sure?",
        text: "You will not be able to recover this Contact !",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it!"
      })
      .then((result)=> {
        if(result.value){
        let objTemp:ContactModel = new ContactModel();
        objTemp._id = id;
        objTemp.deleted = true;
        this._objService.deleteContact(objTemp)
          .subscribe(res=> {
              this.getContactList();
              Swal("Deleted!", res.message, "success");
            },
            error=> {
              Swal("Alert!", error.message, "info");
            });
          }
      });
  }

  showDetail(id:string) {
    this.router.navigate(['/contact/detail', id]);
  }

  handleCancel(args) {
    this.location.back();
  }

  pageChanged(event) {
    this.perPage = event.pageSize;
    this.currentPage = event.pageIndex + 1;
    this.getContactList();
  }
}

