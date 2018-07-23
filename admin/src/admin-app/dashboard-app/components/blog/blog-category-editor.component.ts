import Swal from 'sweetalert2';
import {Component, OnInit} from '@angular/core';
import {BlogCategoryModel} from "./blog.model";
import {BlogService} from "./blog.service";
import {FormGroup, Validators, FormBuilder,} from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'blog-category-editor',
    templateUrl: './blog-category-editor.html'
})

export class BlogCategoryEditorComponent implements OnInit {
    objBlogCat:BlogCategoryModel = new BlogCategoryModel();
    blogCategoryForm:FormGroup;
    isSubmitted:boolean = false;
    blogCategoryId:string;

    constructor(private router: Router, private activatedRoute: ActivatedRoute, private _objService:BlogService, private _formBuilder:FormBuilder) {
        activatedRoute.params.subscribe(param => this.blogCategoryId = param['id']);
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
        Swal("Success !", res.message, "success");
        this.triggerCancelForm();
    }

    errorMessage(objResponse:any) {
        Swal("Alert !", objResponse, "info");
    }

    triggerCancelForm() {
        this.router.navigate(['/blog/category']);
    }
}

