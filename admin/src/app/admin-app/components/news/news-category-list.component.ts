import {Component, ElementRef, OnInit, Output, Input, EventEmitter, OnChanges} from '@angular/core';
import {NewsService} from "./news.service";
import {NewsModel, NewsCategoryModel, NewsResponse} from "./news.model";
import {Router} from '@angular/router';
@Component({
    selector: 'news-category-list',
    templateUrl: './news-category-list.html'
})

export class NewsCategoryListComponent implements OnInit,OnChanges {

    objListResponse:NewsCategoryModel[];
    error:any;
    // @Input() showList:boolean;
    // @Output() showFormEvent:EventEmitter<any> = new EventEmitter();
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
        // if (this.showList)
        //     this.showForm = !this.showList;
    }

    constructor(private router:Router, private _objService:NewsService) {
    }

    getNewsCategoryList() {
        this._objService.getNewsCategoryList()
            .subscribe(objRes =>this.bindList(objRes),
                error => this.errorMessage(error));
    }

    errorMessage(objResponse:any) {
      swal("Alert !", objResponse.message, "info");

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
        }, 500);
    }

    edit(id:string) {
        //  this.showFormEvent.emit(id);
        // this.showForm = true;
        // this.categoryId = id;
        this.router.navigate(['/news/category/editor',id]);
    }

    addCategory() {
        this.router.navigate(['/news/category/editor']);
        // this.showFormEvent.emit(null);
        // this.showForm = true;
        // this.categoryId = null;
    }

    showCategoryList(args) {
        if (!args) // is Cancelled
            this.getNewsCategoryList();
        // this.showForm = false;
        this.sortTable();
    }

    delete(id:string) {
      swal({
          title: "Are you sure?",
          text: "You will not be able to recover this  News Category !",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Yes, delete it!",
          closeOnConfirm: false
        },
        ()=> {
          let objTemp:NewsCategoryModel = new NewsCategoryModel();
          objTemp._id = id;
          objTemp.deleted = true;
          this._objService.deleteNewsCategory(objTemp)
            .subscribe(res=> {
                this.getNewsCategoryList();
                swal("Deleted!", res.message, "success");
              },
              error=> {
                swal("Alert!", error.message, "info");

              });
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

