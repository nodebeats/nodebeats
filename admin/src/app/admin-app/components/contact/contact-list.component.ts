import {Component, ElementRef, OnInit} from '@angular/core';
import {ContactService} from "./contact.service";
import {ContactModel, ContactResponse} from "./contact.model";
import {Paginator} from 'primeng/primeng';
import{ContactViewComponent} from "./contact-view.component";

@Component({
  selector: 'contact-list',
  templateUrl: './contact-list.html'
})

export class ContactListCompoent implements OnInit {

  objContact:ContactModel = new ContactModel();
  showInfo:boolean = false;
  objResponse:ContactResponse = new ContactResponse();
  contactId:string;
  /* Pagination */
  perPage:number = 10;
  currentPage:number = 1;
  totalPage:number = 1;
  first:number = 0;
  bindSort:boolean = false;
  preIndex:number = 1;
  /* End Pagination */

  ngOnInit() {
    this.perPage = 10;
    this.currentPage = 1;
    this.getContactList();
  }

  constructor(private _objService:ContactService) {
  }

  getContactList() {
    this._objService.getContactList(this.perPage, this.currentPage)
      .subscribe(objRes =>this.bindList(objRes),
        error => this.errorMessage(error));
  }

  errorMessage(objResponse:any) {
    swal("Alert !", objResponse.message, "info");
  }

  bindList(objRes:ContactResponse) {
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
      jQuery('.tablesorter').tablesorter({
        headers: {
          3: {sorter: false},
          4: {sorter: false},
          5: {sorter: false}
        }
      });
    }, 50);
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
    swal({
        title: "Are you sure?",
        text: "You will not be able to recover this Contact !",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: false
      },
      ()=> {
        let objTemp:ContactModel = new ContactModel();
        objTemp._id = id;
        objTemp.deleted = true;
        this._objService.deleteContact(objTemp)
          .subscribe(res=> {
              this.getContactList();
              swal("Deleted!", res.message, "success");
            },
            error=> {
              swal("Alert!", error.message, "info");

            });
      });
  }

  showDetail(id:string) {
    this.showInfo = true;
    this.contactId = id;
  }

  handleCancel(args) {
    this.showInfo = false;
    this.sortTable();
  }

  pageChanged(event) {
    this.perPage = event.rows;
    this.currentPage = (Math.floor(event.first / event.rows)) + 1;
    this.first = event.first;
    if (event.first == 0)
      this.first = 1;
    this.getContactList();
  }


}

