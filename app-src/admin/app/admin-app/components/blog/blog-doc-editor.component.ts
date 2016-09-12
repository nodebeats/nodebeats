import {Component, EventEmitter, Output, Input, AfterViewInit, ViewChild, OnInit} from '@angular/core';
import {FormControlMessages} from "../../../shared/components/control-valdation-message.component";
import {BlogDocumentModel} from "./blog.model";
import {BlogService} from "./blog.service";
import {Config} from "../../../shared/configs/general.config";
import {DocumentUploader} from "../../../shared/components/doc-uploader.component";
import {REACTIVE_FORM_DIRECTIVES, FormGroup, FormControl, Validators, FormBuilder} from "@angular/forms";


@Component({
    selector: 'blog-doc-editor',
    templateUrl: 'admin-templates/blog/blog-doc-editor.html',
    directives: [FormControlMessages, DocumentUploader, REACTIVE_FORM_DIRECTIVES],
    // styles: [style]
})
export class BlogDocEditorComponent implements OnInit {
    objBlogDoc:BlogDocumentModel = new BlogDocumentModel();
    @Input() docId:string;
    @Input() blogId:string;
    @Output() showListEvent:EventEmitter<any> = new EventEmitter();
    blogDocForm:FormGroup;
    isSubmitted:boolean = false;
    /* File Upload Handle*/
    allowedExt:string[] = ['pdf', 'doc', 'ppt', 'pptx', 'docx'];/// For valdiation of file ext
    allowedSize:number = 3;
    fileDeleted:boolean = false;
    file:File;
    fileName:string;
    docFormControl:FormControl = new FormControl('', Validators.required);
    /* End File Upload handle */


    constructor(private _objService:BlogService, private _formBuilder:FormBuilder) {
        this.blogDocForm = this._formBuilder.group({
            "docTitle": ['', Validators.required],
            "docFormControl": this.docFormControl,
            active: ['']
        });
    }

    ngOnInit() {
        if (this.docId)
            this.getBlogDocDetail();
    }

    getBlogDocDetail() {
        this._objService.getBlogDocDetail(this.blogId, this.docId)
            .subscribe(res =>this.bindDetail(res),
                error => this.errorMessage(error));
    }

    bindDetail(objRes:BlogDocumentModel) {
        this.objBlogDoc = objRes;
        this.fileName = this.objBlogDoc.documentName;
    }

    saveBlogDoc() {
        this.isSubmitted = true;
        this.docFormControl.updateValue(this.fileName);
        if (this.blogDocForm.valid) {
            if (!this.docId) {
                this._objService.saveDocument(this.blogId, this.objBlogDoc, this.file)
                    .subscribe(res => this.resStatusMessage(res),
                        error => this.errorMessage(error));
            }
            else {
                this._objService.updateDocumnet(this.blogId, this.objBlogDoc, this.file, this.fileDeleted)
                    .subscribe(res => this.resStatusMessage(res),
                        error => this.errorMessage(error));
            }

        }
    }

    resStatusMessage(objSave:any) {
        this.showListEvent.emit(false); // is Form Canceled
        jQuery.jAlert({
            'title': 'Success',
            'content': objSave.message,
            'theme': 'green'
        });
    }

    triggerCancelForm() {
        let isCanceled = true;
        this.showListEvent.emit(isCanceled);
    }

    errorMessage(objResponse:any) {
        jQuery.jAlert({
            'title': 'Alert',
            'content': objResponse.message,
            'theme': 'red'
        });
    }

    /*file handler */
    onFileSelect(args) {
        this.file = args;
        if (this.file)
            this.fileName = this.file.name;
    }

    onDeleteFile(id:string) {
        jQuery.jAlert({
            'type': 'confirm',
            'title': 'Alert',
            'confirmQuestion': 'Are you sure to delete the Document ?',
            'theme': 'red',
            'onConfirm': (e, btn)=> {
                e.preventDefault();
                this._objService.deleteDoc(this.objBlogDoc.documentName, this.objBlogDoc.docProperties.documentMimeType, this.objBlogDoc.docProperties.docPath)
                    .subscribe(res=> {
                            this.fileDeleted = true;
                            jQuery.jAlert({
                                'title': 'Success',
                                'content': res.message,
                                'theme': 'green'
                            });
                        },
                        error=> {
                            jQuery.jAlert({
                                'title': 'Alert',
                                'content': error.message,
                                'theme': 'red'
                            });
                        });
            }
        });
    }

    /* End File Handler */
}

