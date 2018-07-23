import Swal from 'sweetalert2';
import {Component, OnInit} from '@angular/core';
import {NewsService} from "./news.service";
import {NewsModel, NewsCategoryModel, NewsResponse} from "./news.model";
import {Router} from '@angular/router';
import { MatTableDataSource } from '@angular/material';

@Component({
    selector: 'news-list',
    templateUrl: './news-list.html'
})

export class NewsListComponent implements OnInit {
    displayedColumns = ['SN','News Title', 'News Author', 'Active', 'Actions'];
    dataSource: any;
    objListResponse:NewsResponse = new NewsResponse();
    objCatList:NewsCategoryModel[];
    showForm:boolean = false;
    newsId:string;
    /* Pagination */
    pageSizeOptions = [5, 10, 25, 50, 100];
    perPage:number = 10;
    currentPage:number = 1;
    totalItems:number = 1;
    /* End Pagination */

    ngOnInit() {
        this.perPage = 10;
        this.currentPage = 1;
        this.getNewsList();
        this.getCategoryList();
    }

    constructor(private router:Router,private _objService:NewsService) {
    }

    getCategoryList() {
        this._objService.getNewsCategoryList(true)/*active*/
            .subscribe(res=>this.objCatList = res,
                error=>this.errorMessage(error)
            )
    }

    categoryFilter(args: any) {
        let categoryId = (<HTMLSelectElement>args).value;
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
        Swal("Alert !", objResponse, "info");
    }

    bindList(objRes:NewsResponse) {
        this.objListResponse = objRes;
        this.dataSource = new MatTableDataSource(this.objListResponse.dataList);                
        this.totalItems = objRes.totalItems;
    }

    addNews() {
        this.router.navigate(['/news/editor']);
    }

    edit(id:string) {
        this.router.navigate(['/news/editor',id]);
    }

    showImageList(newsId:string) {
        this.router.navigate(['/news/image',newsId]);
    }

    delete(id:string) {
    Swal({
          title: "Are you sure?",
          text: "You will not be able to recover this News !",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Yes, delete it!"
        })
        .then((result)=> {
            if(result.value){
                let objTemp:NewsModel = new NewsModel();
                objTemp._id = id;
                objTemp.deleted = true;
                this._objService.deleteNews(objTemp)
                    .subscribe(res=> {
                        this.getNewsList();
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
        this.getNewsList();
    }
}

