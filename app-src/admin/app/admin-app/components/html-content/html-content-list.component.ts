import {Component, OnInit} from '@angular/core';
import {HtmlContentService} from "./html-content.service";
import {HtmlContentModel, HtmlContentResponse} from "./html-content.model";
import {Paginator} from 'primeng/primeng';
import{HtmlContentEditorComponent} from "./html-content-editor.component";
import {FadeInDirective}from '../../../shared/directives/fadeInDirective';

@Component({
    selector: 'html-content-list',
    templateUrl: 'admin-templates/html-content/html-content-list.html',
    providers: [HtmlContentService],
    directives: [FadeInDirective, Paginator, HtmlContentEditorComponent]
    //   pipes: [PaginatePipe]
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
    nextPage:number = 1;
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
        jQuery.jAlert({
            'title': 'Alert',
            'content': objResponse.message,
            'theme': 'red'
        });
    }

    bindList(objRes:HtmlContentResponse) {
        this.objResponse = objRes;
        this.preIndex = (this.perPage * (this.currentPage - 1));
        if (objRes.totalItems) {
            let totalPage = objRes.totalItems / this.perPage;
            this.totalPage = totalPage > 1 ? Math.ceil(totalPage) : 1;

            setTimeout(()=> {
                jQuery('.tablesorter').tablesorter({
                    headers: {
                        2: {sorter: false},
                        3: {sorter: false}
                    }
                });
            }, 50);
        }

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
        if (!args)
            this.getHtmlEditorList(); // if not
        this.showForm = false;
    }

    delete(id:string) {

        jQuery.jAlert({
            'type': 'confirm',
            'title': 'Alert',
            'confirmQuestion': 'Are you sure to delete the Content ?',
            'theme': 'red',
            'onConfirm': (e, btn)=> {
                e.preventDefault();
                let objTemp:HtmlContentModel = new HtmlContentModel();
                objTemp._id = id;
                objTemp.deleted = true;
                this._objService.deleteHtmlEditor(objTemp)
                    .subscribe(res=> {
                            this.getHtmlEditorList();
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
            }
        });
    }


    pageChanged(event) {
        this.perPage = event.rows;
        this.currentPage = (Math.floor(event.first / event.rows)) + 1;
        this.getHtmlEditorList();
        jQuery(".tablesorter").trigger("update");
    }


}

