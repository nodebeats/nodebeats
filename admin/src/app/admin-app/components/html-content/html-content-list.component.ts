import {Component, OnInit} from '@angular/core';
import {HtmlContentService} from "./html-content.service";
import {HtmlContentModel, HtmlContentResponse} from "./html-content.model";
import {Paginator} from 'primeng/primeng';
import{HtmlContentEditorComponent} from "./html-content-editor.component";
import {FadeInDirective}from '../../../shared/directives/fadeInDirective';

@Component({
    selector: 'html-content-list',
    templateUrl: './html-content-list.html'
})

export class HtmlContentComponent implements OnInit {

    objHtmlTemplate:HtmlContentModel = new HtmlContentModel();
    objResponse:HtmlContentResponse = new HtmlContentResponse();
    contentId:string;
    showForm:boolean = false;
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
        this.getHtmlEditorList();
    }

    constructor(private _objService:HtmlContentService) {
    }

    getHtmlEditorList() {
        this._objService.getHtmlEditorList(this.perPage, this.currentPage)
            .subscribe(objRes =>this.bindList(objRes),
                error => this.errorMessage(error));
    }

    errorMessage(objResponse:any) {
      swal("Alert !", objResponse.message, "info");

    }

    bindList(objRes:HtmlContentResponse) {
        this.objResponse = objRes;
        this.preIndex = (this.perPage * (this.currentPage - 1));
        if (objRes.totalItems) {
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
                    2: {sorter: false},
                    3: {sorter: false}
                }
            });
        }, 50);
    }

    edit(id:string) {
        this.showForm = true;
        this.contentId = id;
    }

    addHtml() {
        this.showForm = true;
        this.contentId = null;
    }

    showList(args) {
        if (!args) {
            this.getHtmlEditorList(); // if not
        }
        this.showForm = false;
        this.sortTable();
    }

    delete(id:string) {
      swal({
          title: "Are you sure?",
          text: "You will not be able to recover this File !",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Yes, delete it!",
          closeOnConfirm: false
        },
        ()=> {
          let objTemp:HtmlContentModel = new HtmlContentModel();
          objTemp._id = id;
          objTemp.deleted = true;
          this._objService.deleteHtmlEditor(objTemp)
            .subscribe(res=> {
                this.getHtmlEditorList();
                swal("Deleted!", res.message, "success");
              },
              error=> {
                swal("Alert!", error.message, "info");

              });
        });

    }


    pageChanged(event) {
        this.perPage = event.rows;
        this.currentPage = (Math.floor(event.first / event.rows)) + 1;
        this.first = event.first;
        if (event.first == 0)
            this.first = 1;
        this.getHtmlEditorList();
    }


}

