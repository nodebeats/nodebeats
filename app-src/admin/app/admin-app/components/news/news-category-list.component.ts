import {Component, ElementRef, OnInit, Output, Input, EventEmitter, OnChanges} from '@angular/core';
import {NewsService} from "./news.service";
import {NewsModel, NewsCategoryModel, NewsResponse} from "./news.model";
import {Paginator} from 'primeng/primeng';
import {NewsCategoryEditorComponent} from  "./news-category-editor.component";

@Component({
    selector: 'news-category-list',
    templateUrl: 'admin-templates/news/news-category-list.html'
})

export class NewsCategoryListComponent implements OnInit,OnChanges {

    objListResponse:NewsCategoryModel[];
    error:any;
    @Input() showList:boolean;
    @Output() showFormEvent:EventEmitter<any> = new EventEmitter();
    categoryId:string;
    showForm:boolean = false;
    /* Pagination */
    perPage:number = 10;
    currentPage:number = 1;
    totalPage:number = 1;
    first:number = 0;

    ngOnInit() {
        this.perPage = 10;
        this.currentPage = 1;
        //   if (!this.isCanceled)
        this.getNewsCategoryList();
    }

    ngOnChanges() {
        if (this.showList)
            this.showForm = !this.showList;
    }

    constructor(private _objService:NewsService) {
    }

    getNewsCategoryList() {
        this._objService.getNewsCategoryList()
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

    bindList(objRes:NewsCategoryModel[]) {
        this.objListResponse = objRes;
        if (objRes.length > 0) {
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
            this.getNewsCategoryList();
        this.showForm = false;
        this.sortTable();
    }

    delete(id:string) {
        jQuery.jAlert({
            'type': 'confirm',
            'title': 'Alert',
            'confirmQuestion': 'Are you sure to delete the News Category ?',
            'theme': 'red',
            'onConfirm': (e, btn)=> {
                e.preventDefault();
                let objTemp:NewsCategoryModel = new NewsCategoryModel();
                objTemp._id = id;
                objTemp.deleted = true;
                this._objService.deleteNewsCategory(objTemp)
                    .subscribe(res=> {
                            this.getNewsCategoryList();
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
        this.getNewsCategoryList();
    }

    pageChanged(arg) {

        this.currentPage = arg;
        this.getNewsCategoryList();

    }


}

