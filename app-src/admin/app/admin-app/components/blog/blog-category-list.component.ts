import {Component, ElementRef, OnInit, Output, Input, EventEmitter, OnChanges} from '@angular/core';
import {BlogService} from "./blog.service";
import {BlogCategoryModel, BlogCategoryResponse} from "./blog.model";
import {Paginator} from 'primeng/primeng';
import {BlogCategoryEditorComponent} from  "./blog-category-editor.component";

@Component({
    selector: 'blog-category-list',
    templateUrl: 'admin-templates/blog/blog-category-list.html'
})

export class BlogCategoryListComponent implements OnInit,OnChanges {

    objListResponse:BlogCategoryResponse = new BlogCategoryResponse();
    error:any;
    @Input() showList:boolean;
    @Output() showFormEvent:EventEmitter<any> = new EventEmitter();
    categoryId:string;
    showForm:boolean = false;
    /* Pagination */
    perPage:number = 10;
    first:number = 0;
    bindSort:boolean = false;
    currentPage:number = 1;
    totalPage:number = 1;

    ngOnInit() {
        this.perPage = 10;
        this.currentPage = 1;
        //   if (!this.isCanceled)
        this.getBlogCategoryList();
    }


    constructor(private _objService:BlogService) {
    }

    ngOnChanges() {
        if (this.showList)
            this.showForm = !this.showList;
    }

    getBlogCategoryList() {
        this._objService.getBlogCategoryList(this.perPage, this.currentPage)
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

    bindList(objRes:BlogCategoryResponse) {
        this.objListResponse = objRes;
        if (objRes.dataList.length > 0) {
            let totalPage = objRes.totalItems / this.perPage;
            this.totalPage = totalPage > 1 ? Math.ceil(totalPage) : 1;
            this.sortTable();
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
        //  this.showFormEvent.emit(id);
        this.showForm = true;
        this.categoryId = id;
    }

    addCategory() {
        // this.showFormEvent.emit(null);
        this.showForm = true;
        this.categoryId = null;
    }

    showCategoryList(args) {
        if (!args) // is Cancelled
            this.getBlogCategoryList();
        this.showForm = false;
        this.sortTable();

    }

    delete(id:string) {
        jQuery.jAlert({
            'type': 'confirm',
            'title': 'Alert',
            'confirmQuestion': 'Are you sure to delete the Blog Category ?',
            'theme': 'red',
            'onConfirm': (e, btn)=> {
                e.preventDefault();
                let objTemp:BlogCategoryModel = new BlogCategoryModel();
                objTemp._id = id;
                objTemp.deleted = true;
                this._objService.deleteBlogCategory(objTemp)
                    .subscribe(res=> {
                            this.getBlogCategoryList();
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


    vppChanged(event:Event) {
        this.perPage = Number((<HTMLSelectElement>event.srcElement).value);
        this.getBlogCategoryList();
    }

    pageChanged(event) {
        this.first = event.first;
        if (event.first == 0)
            this.first = 1;
        this.getBlogCategoryList();
        jQuery(".tablesorter").trigger("update");
    }


}

