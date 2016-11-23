import {Component, EventEmitter, Output, Input, OnInit} from '@angular/core';
import {HtmlContentService} from "./html-content.service";
import {HtmlContentModel} from "./html-content.model";
import {FormControlMessages} from "../../../shared/components/control-valdation-message.component";
import {TinyEditor} from "../../../shared/components/tinymce.component";
import { FormGroup, Validators, FormBuilder, FormControl} from "@angular/forms";

@Component({
    selector: 'html-content-editor',
    templateUrl: './html-content-editor.html'
})
export class HtmlContentEditorComponent implements OnInit {
    objHtml:HtmlContentModel = new HtmlContentModel();
    htmlForm:FormGroup;
    @Input() contentId:string;
    @Output() showListEvent:EventEmitter<any> = new EventEmitter();
    isSubmitted:boolean = false;

    editorFormControl:FormControl = new FormControl('', Validators.required);

    constructor(private _objService:HtmlContentService, private _formBuilder:FormBuilder) {
        this.htmlForm = this._formBuilder.group({
            "title": ['', Validators.required],
            "editorFormControl": this.editorFormControl,
            active: ['']
        });
    }

    ngOnInit() {
        if (this.contentId)
            this.getEditorDetail();
    }

    getEditorDetail() {
        this._objService.getHtmlEditorById(this.contentId)
            .subscribe(res =>this.bindDetail(res),
                error => this.errorMessage(error));
    }

    bindDetail(objRes:HtmlContentModel) {
        this.objHtml = objRes;
        (<FormControl>this.htmlForm.controls["editorFormControl"]).patchValue(objRes.htmlModuleContent);
    }

    saveHtmlEditor() {
        this.isSubmitted = true;
        if (this.htmlForm.valid) {
            if (!this.contentId) {
                this._objService.saveHtmlEditor(this.objHtml)
                    .subscribe(resUser => this.resStatusMessage(resUser),
                        error => this.errorMessage(error));
            }
            else {
                this._objService.updateHtmlEditor(this.objHtml)
                    .subscribe(resUser => this.resStatusMessage(resUser),
                        error => this.errorMessage(error));
            }
        }
    }

    resStatusMessage(res:any) {
        this.showListEvent.emit(false); //isCanceled
      swal("Success !", res.message, "success")
    }

    editorValueChange(args) {
        this.objHtml.htmlModuleContent = args;
        // (<FormControl>this.htmlForm.controls["editorFormControl"]).updateValue(args);

    }

    triggerCancelForm() {
        this.showListEvent.emit(true); // is Canceled = true
    }

    errorMessage(objResponse:any) {
      swal("Alert !", objResponse.message, "info");

    }


}

