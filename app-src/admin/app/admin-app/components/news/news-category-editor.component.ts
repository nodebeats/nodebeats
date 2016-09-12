import {Component, EventEmitter, Output, Input, AfterViewInit, OnInit} from '@angular/core';
import {FormControlMessages} from "../../../shared/components/control-valdation-message.component";
import {NewsCategoryModel} from "./news.model";
import {NewsService} from "./news.service";
import {FormGroup, Validators, FormBuilder,} from "@angular/forms";

@Component({
    selector: 'news-category-editor',
    templateUrl: 'admin-templates/news/news-category-editor.html',
    directives: [FormControlMessages]
})

export class NewsCategoryEditorComponent implements OnInit {
    objNewsCat:NewsCategoryModel = new NewsCategoryModel();
    isValidImage:boolean = true;
    newsCategoryForm:FormGroup;
    isSubmitted:boolean = false;
    @Input() newsCategoryId:string;
    @Output() showListEvent:EventEmitter<any> = new EventEmitter();


    constructor(private _objService:NewsService, private _formBuilder:FormBuilder) {
        this.newsCategoryForm = this._formBuilder.group({
                "newsCategory": ['', Validators.required],
                "newsCategoryDescription": ['', Validators.required],
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
            .subscribe(res => {
                    this.objNewsCat = res;
                },
                error => this.errorMessage(error));
    }


    saveNewsCategory() {
        this.isSubmitted = true;
        if (this.newsCategoryForm.valid) {
            if (!this.newsCategoryId) {
                this._objService.saveNewsCategory(this.objNewsCat)
                    .subscribe(res => this.resStatusMessage(res),
                        error =>this.errorMessage(error));
            }
            else {
                this._objService.updateNewsCategory(this.objNewsCat)
                    .subscribe(res => this.resStatusMessage(res),
                        error =>this.errorMessage(error));
            }
        }
    }

    resStatusMessage(res:any) {
        this.showListEvent.emit(false); // * isCanceled = false
        jQuery.jAlert({
            'title': 'Success',
            'content': res.message,
            'theme': 'green'
        });
    }

    errorMessage(objResponse:any) {
        jQuery.jAlert({
            'title': 'Alert',
            'content': objResponse.message,
            'theme': 'red'
        });
    }

    triggerCancelForm() {
        let isCanceled = true;
        this.showListEvent.emit(isCanceled);
    }


}

