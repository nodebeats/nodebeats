import {Component, ElementRef, OnInit} from '@angular/core';
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
  displayedColumns = ['SN','Template Name', 'Subject', 'From','Active', 'Actions'];
  dataSource:any;  
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
    swal("Alert !", objResponse.message, "info");
  }

  bindList(objRes:EmailTempalteResponse) {
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
      jQuery('.tablesorter').tablesorter({
        headers: {
          4: {sorter: false},
          5: {sorter: false}
        }
      });
    }, 50);
  }

  addTemplate() {
    this.router.navigate(['/email-template/email-template-editor']);
  }

  editDetail(id:string) {
    this.router.navigate(['/email-template/email-template-editor', id]);

  }

  delete(id:string) {
    swal({
        title: "Are you sure?",
        text: "You will not be able to recover this Template !",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: false
      },
      ()=> {
        let objTemp:EmailTemplateModel = new EmailTemplateModel();
        objTemp._id = id;
        objTemp.deleted = true;
        this._objService.deleteTemplate(objTemp)
          .subscribe(res=> {
              this.getEmailTemplateList();
              swal("Deleted!", res.message, "success");
            },
            error=> {
              swal("Alert!", error.message, "info");

            });
      });
  }

 
  pageChanged(event) {
    this.perPage = event.pageSize;
    this.currentPage = event.pageIndex + 1;
    this.getEmailTemplateList();
  }


}

