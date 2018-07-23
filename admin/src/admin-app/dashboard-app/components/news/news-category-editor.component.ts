import Swal from 'sweetalert2';
import {Component, OnInit} from '@angular/core';
import {NewsCategoryModel} from "./news.model";
import {NewsService} from "./news.service";
import {FormGroup, Validators, FormBuilder,} from "@angular/forms";
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

@Component({
    selector: 'news-category-editor',
    templateUrl: './news-category-editor.html'
})

export class NewsCategoryEditorComponent implements OnInit {
    isValidImage:boolean = true;
    newsCategoryForm:FormGroup;
    isSubmitted:boolean = false;
    newsCategoryId:string;

    constructor(private location:Location,private activatedRoute:ActivatedRoute,private _objService:NewsService, private _formBuilder:FormBuilder) {
        activatedRoute.params.subscribe(param=>this.newsCategoryId=param['id']);
        this.newsCategoryForm = this._formBuilder.group({
                "categoryName": ['', Validators.required],
                "categoryDescription": ['', Validators.required],
                "active": ['']
            }
        );
    }

    ngOnInit() {
        if (this.newsCategoryId)
            this.getNewsCategoryDetail();
    }

    getNewsCategoryDetail() {
        this._objService.getNewsCategoryDetail(this.newsCategoryId)
            .subscribe(res => this.bindCatDetail(res),
                error => this.errorMessage(error));
    }

    bindCatDetail(objNewsCat: NewsCategoryModel) {
        this.newsCategoryForm.setValue({
            categoryName: objNewsCat.categoryName,
            categoryDescription: objNewsCat.categoryDescription,
            active: objNewsCat.active
        });
    }

    saveNewsCategory() {
        this.isSubmitted = true;
        if (this.newsCategoryForm.valid) {
            if (!this.newsCategoryId) {
                this._objService.saveNewsCategory(this.newsCategoryForm.value)
                    .subscribe(res => this.resStatusMessage(res),
                        error =>this.errorMessage(error));
            }
            else {
                this._objService.updateNewsCategory(this.newsCategoryForm.value,this.newsCategoryId)
                    .subscribe(res => this.resStatusMessage(res),
                        error =>this.errorMessage(error));
            }
        }
    }

    resStatusMessage(res:any) {
        Swal("Success !", res.message, "success")
        this.location.back();
    }

    errorMessage(objResponse:any) {
        Swal("Alert !", objResponse, "info");
    }

    triggerCancelForm() {
        this.location.back();
    }
}

