import Swal from 'sweetalert2';
import {Component, OnInit} from '@angular/core';
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
    id: string = "";
    editorFormControl:FormControl = new FormControl('', Validators.required);
    isSubmitted:boolean = false;

    constructor(private _objService:EmailTemplateService, private _formBuilder:FormBuilder, private router:Router, private activatedRoute:ActivatedRoute) {
        this.templateForm = this._formBuilder.group({
            "templateName": ['', Validators.required],
            "emailSubject": ['', Validators.required],
            "emailFrom": ['', Validators.compose([Validators.required, ValidationService.emailValidator])],
            "templateBody": this.editorFormControl,
            "active": [''],
            "attachmentAvailabilityStatus": ['']
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
        this.objEmailTemp.templateBody = objRes.templateBody;
        this.templateForm.patchValue({
            templateName: objRes.templateName,
            emailSubject: objRes.emailSubject,
            emailFrom: objRes.emailFrom,
            active: objRes.active,
            attachmentAvailabilityStatus: objRes.attachmentAvailabilityStatus
        });
        this.editorFormControl.patchValue(objRes.templateBody);
    }

    saveTemplate() {
        this.isSubmitted = true;
        // (<FormControl>this.templateForm.controls["editorFormControl"]).patchValue(this.templateForm.value.templateBody ? this.templateForm.value.templateBody : "");
        if (this.templateForm.valid) {
            if (!this.id) {
                this._objService.saveEmailTemplate(this.templateForm.value)
                    .subscribe(resUser => this.resStatusMessage(resUser),
                        error => this.errorMessage(error));
            }
            else {
                this._objService.updateEmailTemplate(this.templateForm.value,this.id)
                    .subscribe(resUser => this.resStatusMessage(resUser),
                        error => this.errorMessage(error));
            }
        }
    }

    resStatusMessage(res:any) {
        this.triggerCancelForm();
        Swal("Success !", res.message, "success")
    }

    editorValueChange(args: any) {
        // this.objEmailTemp.templateBody = args;
         (<FormControl>this.templateForm.controls["templateBody"]).patchValue(args);
    }

    triggerCancelForm() {
        this.router.navigate(['/email-template']);
    }

    errorMessage(objResponse:any) {
        Swal("Alert !", objResponse, "info");
    }
}

