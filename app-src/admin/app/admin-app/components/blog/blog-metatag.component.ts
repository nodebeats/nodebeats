import {Component, EventEmitter, Output, Input, OnInit} from '@angular/core';
import {FormControlMessages} from "../../../shared/components/control-valdation-message.component";
import {BlogMetaTagModel, BlogTagModel} from "./blog.model";
import {BlogService} from "./blog.service";
import {FormGroup, Validators, FormBuilder} from "@angular/forms";
import {TagInputComponent} from '../../../shared/components/tag-input/tag-input.component';

@Component({
    selector: 'blog-metatag-editor',
    templateUrl: 'admin-templates/blog/blog-metatag.html',
    directives: [FormControlMessages, TagInputComponent]
})

export class BlogMetaTagEditorComponent implements OnInit {
    objBlogMeta:BlogMetaTagModel = new BlogMetaTagModel();
    blogMetaForm:FormGroup;
    isSubmitted:boolean = false;
    @Input() blogId:string;
    @Output() showBlogListEvent:EventEmitter<any> = new EventEmitter();
    autoCompleteData:Array<string>;

    constructor(private _objService:BlogService, private _formBuilder:FormBuilder) {
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
        console.log(`Selected value: ${e.item}`);
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

    resStatusMessage(res:any) {
        this.showBlogListEvent.emit(false); // * isCanceled = false
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
        this.showBlogListEvent.emit(isCanceled);
    }


}

