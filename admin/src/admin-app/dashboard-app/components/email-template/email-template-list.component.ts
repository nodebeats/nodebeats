import Swal from 'sweetalert2';
import {Component, OnInit} from '@angular/core';
import {EmailTemplateService} from "./email-template.service";
import {EmailTemplateModel, EmailTempalteResponse} from "./email-template.model";
import {Router} from "@angular/router";
import {MatPaginator, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'email-template-list',
  templateUrl: './email-template-list.html'
})

export class EmailTemplateListComponent implements OnInit {

  objEmailTemplate:EmailTemplateModel = new EmailTemplateModel();
  objResponse:EmailTempalteResponse = new EmailTempalteResponse();
  displayedColumns = ['SN', 'Template Name', 'Subject', 'From', 'Active', 'Actions'];
  dataSource:any;  
  /* Pagination */
  pageSizeOptions = [5, 10, 25, 50, 100];
  perPage:number = 10;
  currentPage:number = 1;
  totalItems:number = 1;
  bindSort:boolean = false;
  preIndex:number = 0;
  /* End Pagination */

  ngOnInit() {
    this.perPage = 10;
    this.currentPage = 1;
    this.getEmailTemplateList();
  }

  constructor(private _objService:EmailTemplateService, private  router:Router) {
  }

  getEmailTemplateList() {
    this._objService.getEmailTemplate(this.perPage, this.currentPage)
      .subscribe(objRes =>this.bindList(objRes),
        error => this.errorMessage(error));
  }

  errorMessage(objResponse:any) {
    Swal("Alert !", objResponse, "info");
  }

  bindList(objRes:EmailTempalteResponse) {
    this.objResponse = objRes;
    this.dataSource = new MatTableDataSource(this.objResponse.dataList);        
    this.totalItems = objRes.totalItems;
    this.preIndex = (this.perPage * (this.currentPage - 1));
  }

  addTemplate() {
    this.router.navigate(['/email-template/email-template-editor']);
  }

  editDetail(id:string) {
    this.router.navigate(['/email-template/email-template-editor', id]);
  }

  delete(id:string) {
  Swal({
        title: "Are you sure?",
        text: "You will not be able to recover this Template !",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it!"
      })
      .then((result)=> {
        if(result.value){
        let objTemp:EmailTemplateModel = new EmailTemplateModel();
        objTemp._id = id;
        objTemp.deleted = true;
        this._objService.deleteTemplate(objTemp)
          .subscribe(res=> {
              this.getEmailTemplateList();
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
    this.getEmailTemplateList();
  }
}

