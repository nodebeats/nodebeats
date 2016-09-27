import {Component, ElementRef, OnInit, Output, Input, EventEmitter, ViewChild} from '@angular/core';
import {BlogService} from "./blog.service";
import {BlogDocumentModel} from "./blog.model";
// import {Pagination} from 'fuel-ui/fuel-ui';
import{BlogDocEditorComponent} from "./blog-doc-editor.component";

@Component({
    selector: 'blog-doc-list',
    templateUrl: 'admin-templates/blog/blog-doc-list.html'
})

export class BlogDocListComponent implements OnInit {

    objListResponse:BlogDocumentModel[];
    error:any;
    @Input() blogId:string;
    @Output() showBlogListEvent:EventEmitter<any> = new EventEmitter();
    showForm:boolean = false;
    docId:string;
    /* Pagination */
    // perPage:number = 10;
    // currentPage:number = 1;
    // totalPage:number = 1;
    // nextPage:number = 1;
    /* End Pagination */


    constructor(private _objService:BlogService) {
    }

    ngOnInit() {
        this.getBlogDocList();
    }

    getBlogDocList() {
        this._objService.getBlogDocList(this.blogId)
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

    bindList(objRes:BlogDocumentModel[]) {
        this.objListResponse = objRes;

        if (objRes.length > 0) {
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
        this.docId = id;
    }

    addDoc() {
        this.showForm = true;
        this.docId = null;
    }

    delete(id:string) {
        jQuery.jAlert({
            'type': 'confirm',
            'title': 'Alert',
            'confirmQuestion': 'Are you sure to delete this Document ?',
            'theme': 'red',
            'onConfirm': (e, btn)=> {
                e.preventDefault();
                this._objService.deleteBlogDoc(this.blogId, id)
                    .subscribe(res=> {
                            this.getBlogDocList();
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

    back() {
        this.showBlogListEvent.emit(true); // cancelled true
    }

    showDocList(arg) {
        if (!arg) // is not Canceled
            this.getBlogDocList();
        this.showForm = false;
    }

}

