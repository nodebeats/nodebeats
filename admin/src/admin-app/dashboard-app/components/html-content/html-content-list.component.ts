import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { HtmlContentService } from "./html-content.service";
import { HtmlContentModel, HtmlContentResponse } from "./html-content.model";
import { HtmlContentEditorComponent } from "./html-content-editor.component";
import { FadeInDirective } from '../../../shared/directives/fadeInDirective';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
 
@Component({
    selector: 'html-content-list',
    templateUrl: './html-content-list.html'
})

export class HtmlContentComponent implements OnInit {
    objHtmlTemplate: HtmlContentModel = new HtmlContentModel();
    objResponse: HtmlContentResponse = new HtmlContentResponse();
    contentId: string;
    dataSource:any;
    displayedColumns = ['SN','Title', 'Active', 'Actions'];    
    /* Pagination */
    pageSizeOptions = [5, 10, 25, 50, 100];
    perPage:number = 10;
    currentPage:number = 1;
    totalItems:number = 1;
    bindSort:boolean = false;
    preIndex:number = 0;
    /* End Pagination */

    ngOnInit() {
        this.getHtmlEditorList();
    }

    constructor(private router:Router, private _objService: HtmlContentService) {
    }

    getHtmlEditorList() {
        this._objService.getHtmlEditorList(this.perPage, this.currentPage)
            .subscribe(objRes => this.bindList(objRes),
                error => this.errorMessage(error));
    }

    errorMessage(objResponse: any) {
       Swal("Alert !", objResponse, "info");
    }

    bindList(objRes: HtmlContentResponse) {
        this.objResponse = objRes;
        this.dataSource = new MatTableDataSource(this.objResponse.dataList);    
        this.totalItems = objRes.totalItems;
        this.preIndex = (this.perPage * (this.currentPage - 1));
    }

    edit(id: string) {
        this.router.navigate(['/html/editor',id]);
    }

    addHtml() {
        this.router.navigate(['/html/editor']);
    }

    delete(id: string) {
      Swal({
            title: "Are you sure?",
            text: "You will not be able to recover this File !",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
        })
        .then((result) => {
            if(result.value){
                let objTemp: HtmlContentModel = new HtmlContentModel();
                objTemp._id = id;
                objTemp.deleted = true;
                this._objService.deleteHtmlEditor(objTemp)
                    .subscribe(res => {
                        this.getHtmlEditorList();
                        Swal("Deleted!", res.message, "success");
                    },
                        error => {
                            Swal("Alert!", error, "info");
                        });
                    }
            });
    }

    pageChanged(event: any) {
        this.perPage = event.pageSize;
        this.currentPage = event.pageIndex + 1;
        this.getHtmlEditorList();
    }


}

