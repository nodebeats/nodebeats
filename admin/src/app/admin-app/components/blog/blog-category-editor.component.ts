import {Component, EventEmitter, Output, Input, AfterViewInit, OnInit} from '@angular/core';
import {BlogCategoryModel} from "./blog.model";
import {BlogService} from "./blog.service";
import {FormGroup, Validators, FormBuilder,} from "@angular/forms";

@Component({
    selector: 'blog-category-editor',
    templateUrl: './blog-category-editor.html'
})

export class BlogCategoryEditorComponent implements OnInit {
    objBlogCat:BlogCategoryModel = new BlogCategoryModel();
    blogCategoryForm:FormGroup;
    isSubmitted:boolean = false;
    @Input() blogCategoryId:string;
    @Output() showListEvent:EventEmitter<any> = new EventEmitter();


    constructor(private _objService:BlogService, private _formBuilder:FormBuilder) {
        this.blogCategoryForm = this._formBuilder.group({
                "categoryName": ['', Validators.required],
                "categoryDescription": ['', Validators.required],
                "active": ['']
            }
        );
    }

    ngOnInit() {
        if (this.blogCategoryId)
            this.getBlogCategoryDetail();
    }

    getBlogCategoryDetail() {
        this._objService.getBlogCategoryDetail(this.blogCategoryId)
            .subscribe(res => this.objBlogCat = res,
                error => this.errorMessage(error));
    }

    saveBlogCategory() {
        this.isSubmitted = true;
        if (this.blogCategoryForm.valid) {
            if (!this.blogCategoryId) {
                this._objService.saveBlogCategory(this.objBlogCat)
                    .subscribe(res => this.resStatusMessage(res),
                        error =>this.errorMessage(error));
            }
            else {
                this._objService.updateBlogCategory(this.objBlogCat)
                    .subscribe(res => this.resStatusMessage(res),
                        error =>this.errorMessage(error));
            }
        }
    }

    resStatusMessage(res:any) {
        this.showListEvent.emit(false); // * isCanceled = false
      swal("Success !", res.message, "success");

    }

    errorMessage(objResponse:any) {
      swal("Alert !", objResponse.message, "info");
    }

    triggerCancelForm() {
        let isCanceled = true;
        this.showListEvent.emit(isCanceled);
    }


}

