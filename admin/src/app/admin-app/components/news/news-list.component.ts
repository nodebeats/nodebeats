import {Component, ElementRef, OnInit, Output, EventEmitter, Input, OnChanges} from '@angular/core';
import {NewsService} from "./news.service";
import {NewsModel, NewsCategoryModel, NewsResponse} from "./news.model";
import {Paginator} from 'primeng/primeng';
import{NewsEditorComponent} from"./news-editor.component";

@Component({
    selector: 'news-list',
    templateUrl: '../../views/news/news-list.html'
})

export class NewsListComponent implements OnInit,OnChanges {

    objListResponse:NewsResponse = new NewsResponse();
    objCatList:NewsCategoryModel[];
    @Input() showList:boolean;
    showForm:boolean = false;
    newsId:string;
    @Output() showImageListEvent:EventEmitter<any> = new EventEmitter();
    showSpinner:boolean = true;
    /* Pagination */
    perPage:number = 10;
    currentPage:number = 1;
    totalPage:number = 1;
    first:number = 0;
    bindSort:boolean = false;
    preIndex:number = 0;
    /* End Pagination */


    ngOnInit() {
        this.perPage = 10;
        this.currentPage = 1;
        //if (!this.isCanceled)
        this.getNewsList();
        this.getCategoryList();
    }

    ngOnChanges() {
        if (this.showList) {
            this.showForm = !this.showList;
            this.getCategoryList();
        }
    }

    constructor(private _objService:NewsService) {
    }

    getCategoryList() {
        this._objService.getNewsCategoryList(true)/*active*/
            .subscribe(res=>this.objCatList = res,
                error=>this.errorMessage(error)
            )
    }

    categoryFilter(args) {
        let categoryId = (<HTMLSelectElement>args.srcElement).value;
        this.currentPage = 1;
        this._objService.getNewsList(this.perPage, this.currentPage, categoryId)
            .subscribe(res => this.bindList(res),
                error=>this.errorMessage(error));
    }

    getNewsList() {
        this._objService.getNewsList(this.perPage, this.currentPage)
            .subscribe(objRes =>this.bindList(objRes),
                error => this.errorMessage(error));
    }

    errorMessage(objResponse:any) {
      swal("Alert !", objResponse.message, "info");

    }

    bindList(objRes:NewsResponse) {
        this.showSpinner = false;
        this.objListResponse = objRes;
        this.preIndex = (this.perPage * (this.currentPage - 1));
        if (objRes.dataList.length > 0) {
            let totalPage = objRes.totalItems / this.perPage;
            this.totalPage = totalPage > 1 ? Math.ceil(totalPage) : 1;
            if (!this.bindSort) {
                this.bindSort = true;
                this.sortTable();
            }
            else
                jQuery("table").trigger("update", [true]);
        }
        else
            jQuery(".tablesorter").find('thead th').unbind('click mousedown').removeClass('header headerSortDown headerSortUp');
    }

    sortTable() {
        setTimeout(()=> {
            jQuery('.tablesorter').tablesorter({
                headers: {
                    3: {sorter: false},
                    4: {sorter: false}
                }
            });
        }, 50);
    }

    addNews() {
        // this.showFormEvent.emit(null);
        this.showForm = true;
        this.newsId = null;
    }


    edit(id:string) {
        // this.showFormEvent.emit(id);
        this.showForm = true;
        this.newsId = id;
    }

    showNewsList(args) {
        if (!args) {
            this.getNewsList();
        }
        this.showForm = false;
        this.sortTable();
    }

    showImageList(newsId:string) {
        this.showImageListEvent.emit(newsId);
    }

    delete(id:string) {
      swal({
          title: "Are you sure?",
          text: "You will not be able to recover this News !",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Yes, delete it!",
          closeOnConfirm: false
        },
        ()=> {
          let objTemp:NewsModel = new NewsModel();
          objTemp._id = id;
          objTemp.deleted = true;
          this._objService.deleteNews(objTemp)
            .subscribe(res=> {
                this.getNewsList();
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
        this.getNewsList();
    }

}

