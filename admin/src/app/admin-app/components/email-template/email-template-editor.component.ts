import {Component, EventEmitter, Output, Input, ViewChild, OnInit} from '@angular/core';
import {EmailTemplateService} from "./email-template.service";
import {EmailTemplateModel, EmailTempalteResponse} from "./email-template.model";
import {FormControlMessages} from "../../../shared/components/control-valdation-message.component";
import {ValidationService} from "../../../shared/services/validation.service";
import {TinyEditor} from "../../../shared/components/tinymce.component";
import {Router, ActivatedRoute} from "@angular/router";
import {FormBuilder, Validators, FormControl, FormGroup} from "@angular/forms";

@Component({
    selector: 'email-template-editor',
    templateUrl: './email-template-editor.html'
})
export class EmailTemplateEditorComponent implements OnInit {
    objEmailTemp:EmailTemplateModel = new EmailTemplateModel();
    templateForm:FormGroup;
    id:string = "";
    editorFormControl:FormControl = new FormControl('', Validators.required);
    isSubmitted:boolean = false;

    constructor(private _objService:EmailTemplateService, private _formBuilder:FormBuilder, private router:Router, private activatedRoute:ActivatedRoute) {
        this.templateForm = this._formBuilder.group({
            "templateName": ['', Validators.required],
            "emailSubject": ['', Validators.required],
            "emailFrom": ['', Validators.compose([Validators.required, ValidationService.emailValidator])],
            "editorFormControl": this.editorFormControl,
            "active": [''],
            "attachment": ['']
        });
        activatedRoute.params.subscribe(params => this.id = params['id']);
    }

    ngOnInit() {
        if (this.id)
            this.getTemplateDetail();
    }

    getTemplateDetail() {
        this._objService.getEmailTemplateById(this.id)
            .subscribe(res =>this.bindDetail(res),
                error => this.errorMessage(error));
    }

    bindDetail(objRes:EmailTemplateModel) {
        this.objEmailTemp = objRes;
    }

    saveTemplate() {
        this.isSubmitted = true;
        (<FormControl>this.templateForm.controls["editorFormControl"]).patchValue(this.objEmailTemp.templateBody ? this.objEmailTemp.templateBody : "");
        if (this.templateForm.valid) {
            if (!this.id) {
                this._objService.saveEmailTemplate(this.objEmailTemp)
                    .subscribe(resUser => this.resStatusMessage(resUser),
                        error => this.errorMessage(error));
            }
            else {
                this._objService.updateEmailTemplate(this.objEmailTemp)
                    .subscribe(resUser => this.resStatusMessage(resUser),
                        error => this.errorMessage(error));
            }
        }
    }

    resStatusMessage(res:any) {
        this.router.navigate(['/admin/email-template']);
      swal("Success !", res.message, "success")

    }

    editorValueChange(args) {
        this.objEmailTemp.templateBody = args;
        //  (<FormControl>this.templateForm.controls["editorFormControl"]).updateValue(args);
    }

    triggerCancelForm() {
        this.router.navigate(['/admin/email-template']);
    }

    errorMessage(objResponse:any) {
      swal("Alert !", objResponse.message, "info");
    }


}

