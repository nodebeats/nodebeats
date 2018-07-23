import Swal from 'sweetalert2';
import {Component, OnInit} from '@angular/core';
import {NewsService} from "./news.service";
import {NewsModel, NewsCategoryModel, NewsResponse} from "./news.model";
import {Router} from '@angular/router';
import { MatTableDataSource } from '@angular/material';

@Component({
    selector: 'news-category-list',
    templateUrl: './news-category-list.html'
})

export class NewsCategoryListComponent implements OnInit {
    dataSource: any;
    displayedColumns = ['SN','News Category','Active', 'Actions'];
    objListResponse: NewsCategoryModel[];

    ngOnInit() {
        this.getNewsCategoryList();
    }

    constructor(private router:Router, private _objService:NewsService) {
    }

    getNewsCategoryList() {
        this._objService.getNewsCategoryList()
            .subscribe(objRes =>this.bindList(objRes),
                error => this.errorMessage(error));
    }

    errorMessage(objResponse:any) {
        Swal("Alert !", objResponse, "info");
    }

    bindList(objRes:NewsCategoryModel[]) {
        this.objListResponse = objRes;
        this.dataSource = new MatTableDataSource(this.objListResponse);                
    }

    edit(id:string) {
        this.router.navigate(['/news/category/editor',id]);
    }

    addCategory() {
        this.router.navigate(['/news/category/editor']);
    }

    delete(id:string) {
    Swal({
          title: "Are you sure?",
          text: "You will not be able to recover this  News Category !",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Yes, delete it!"
        })
        .then((result)=> {
            if(result.value){
                let objTemp:NewsCategoryModel = new NewsCategoryModel();
                objTemp._id = id;
                objTemp.deleted = true;
                this._objService.deleteNewsCategory(objTemp)
                    .subscribe(res=> {
                        this.getNewsCategoryList();
                        Swal("Deleted!", res.message, "success");
                    },
                    error=> {
                        Swal("Alert!", error, "info");
                    });
            }
        });
    }
}

