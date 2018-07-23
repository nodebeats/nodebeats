import Swal from 'sweetalert2';
import {Component, OnInit} from '@angular/core';
import {FormControlMessages} from "../../../shared/components/control-valdation-message.component";
import {BlogMetaTagModel, BlogTagModel} from "./blog.model";
import {BlogService} from "./blog.service";
import {FormGroup, Validators, FormBuilder} from "@angular/forms";
import {TagInputComponent} from '../../../shared/components/tag-input/tag-input.component';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'blog-metatag-editor',
    templateUrl: './blog-metatag.html'
})

export class BlogMetaTagEditorComponent implements OnInit {
    objBlogMeta:BlogMetaTagModel = new BlogMetaTagModel();
    blogMetaForm:FormGroup;
    isSubmitted:boolean = false;
    blogId:string;
    autoCompleteData:Array<string>;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private _objService:BlogService, private _formBuilder:FormBuilder) {
        activatedRoute.params.subscribe(param => this.blogId = param['blogId']);
        this.blogMetaForm = this._formBuilder.group({
            metaKeyword: [''],
            titleTag: ['', Validators.required],
            metaDescription: ['', Validators.required],
            metaAuthor: ['', Validators.required],
        });
    }

    ngOnInit() {
        if (this.blogId)
            this.getBlogMetaTagDetail();
        this.getBlogTagList();
    }

    public typeaheadOnSelect(e:any):void {
    }

    getBlogTagList():void {
        this._objService.getBlogTagList()
            .subscribe(res =>this.bindTagForAutoComplete(res),
                error => this.errorMessage(error));
    }

    bindTagForAutoComplete(res:BlogTagModel[]) {
        let data:string[] = res.map(function (row) {
            return row.tag;
        });
        this.autoCompleteData = data;
    }

    getBlogMetaTagDetail() {
        this._objService.getBlogMetaTagDetail(this.blogId)
            .subscribe(res =>this.bindDetail(res),
                error => this.errorMessage(error));
    }

    bindDetail(objRes:BlogMetaTagModel) {
        objRes.metaKeyword = objRes.metaKeyword.split(',');
        this.objBlogMeta = objRes;
    }

    saveBlogMetaTag() {
        this.isSubmitted = true;
        if (this.blogMetaForm.valid) {
            this._objService.updateBlogMetaTag(this.objBlogMeta)
                .subscribe(res => this.resStatusMessage(res),
                    error =>this.errorMessage(error));
        }
    }

    resStatusMessage(res:any){ 
        this.triggerCancelForm();    
        Swal("Success !", res.message, "success")
    }

    errorMessage(objResponse:any) {
        Swal("Alert !", objResponse, "info");
    }

    triggerCancelForm() {
        this.router.navigate(['/blog']);
    }
}

