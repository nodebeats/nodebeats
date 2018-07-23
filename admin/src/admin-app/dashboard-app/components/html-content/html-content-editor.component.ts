import Swal from 'sweetalert2';
import {Component, OnInit} from '@angular/core';
import {HtmlContentService} from "./html-content.service";
import {HtmlContentModel} from "./html-content.model";
import {FormControlMessages} from "../../../shared/components/control-valdation-message.component";
import {TinyEditor} from "../../../shared/components/tinymce.component";
import { FormGroup, Validators, FormBuilder, FormControl} from "@angular/forms";
import {Router, ActivatedRoute} from "@angular/router";
 
@Component({
    selector: 'html-content-editor',
    templateUrl: './html-content-editor.html'
})
export class HtmlContentEditorComponent implements OnInit {
    objHtml:HtmlContentModel = new HtmlContentModel();
    htmlForm:FormGroup;
    contentId:string;
    isSubmitted:boolean = false;

    editorFormControl:FormControl = new FormControl('', Validators.required);

    constructor(private router:Router, private activatedRoute:ActivatedRoute, private _objService:HtmlContentService, private _formBuilder:FormBuilder) {
        activatedRoute.params.subscribe(param=>this.contentId=param['id']);
        this.htmlForm = this._formBuilder.group({
            "htmlContentTitle": ['', Validators.required],
            "htmlModuleContent": this.editorFormControl,
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
        this.objHtml.htmlModuleContent=objRes.htmlModuleContent;
        this.htmlForm.patchValue({
            htmlContentTitle:objRes.htmlContentTitle,
            active:objRes.active
        });
        this.editorFormControl.patchValue(objRes.htmlModuleContent);
    }

    saveHtmlEditor() {
        this.isSubmitted = true;
        if (this.htmlForm.valid) {
            if (!this.contentId) {
                this._objService.saveHtmlEditor(this.htmlForm.value)
                    .subscribe(resUser => this.resStatusMessage(resUser),
                        error => this.errorMessage(error));
            }
            else {
                this._objService.updateHtmlEditor(this.htmlForm.value, this.contentId)
                    .subscribe(resUser => this.resStatusMessage(resUser),
                        error => this.errorMessage(error));
            }
        }
    }

    resStatusMessage(res:any) {
        Swal("Success !", res.message, "success");
        this.triggerCancelForm();
    }

    editorValueChange(args: any) {
        (<FormControl>this.htmlForm.controls["htmlModuleContent"]).patchValue(args);
    }

    triggerCancelForm() {
        this.router.navigate(['/html']);
    }

    errorMessage(objResponse:any) {
        Swal("Alert !", objResponse, "info");
    }
}

