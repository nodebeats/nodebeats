///<reference path="../../../shared/components/control-valdation-message.component.ts"/>
import {Component, EventEmitter, Output, Input, ViewChild, OnInit} from '@angular/core';
import {EmailServiceService} from "./email-service.service";
import {EmailServiceModel} from "./email-service.model";
import {FormControlMessages} from "../../../shared/components/control-valdation-message.component";
import {Alert} from "../../../shared/components/alert/alert";
import {AlertModel} from "../../../shared/models/alert.model";
import {FormGroup, Validators, FormBuilder} from "@angular/forms";
import {ValidationService} from "../../../shared/services/validation.service";

@Component({
    selector: 'email-service',
    templateUrl: '../../views/email-service/email-service.html'
})
export class EmailServiceComponent implements OnInit {
    objEmailService:EmailServiceModel = new EmailServiceModel();
    emailServiceProvider:string[] = ['normal', 'mailgun', 'postmark', 'mandrill', 'sendgrid', 'amazon'];
    objAlert:AlertModel = new AlertModel();
    isPost:boolean;
    isSubmitted:boolean = false;
    emailServiceForm:FormGroup;

    constructor(private _objEmailService:EmailServiceService, private _formBuilder:FormBuilder) {
        this.emailServiceForm = this._formBuilder.group({
            serviceProviderType: ['', Validators.required],
            host: [''],
            port: ['', ValidationService.numberValidator],
            authUserName: [''],
            authPassword: [''],
            pool: [''],
            api_Key: [''],
            api_Secret: [''],
            api_User: [''],
            domain: [''],
            rateLimit: ['0', Validators.compose([ValidationService.numberValidator, Validators.required])],
            secure: ['']
        });
    }

    ngOnInit() {
        this.getEmailService();
    }

    getEmailService() {
        this._objEmailService.getEmailServiceDetail()
            .subscribe(res =>this.bindDetail(res),
                error => this.errorMessage(error));
    }

    bindDetail(objEmailService:EmailServiceModel) {
        this.objEmailService = objEmailService;
    }


    saveEmailService() {
        this.isSubmitted = true;
        if (this.validateForm() && this.emailServiceForm.valid) {
            let objSave = new EmailServiceModel();
            objSave = this.emailServiceForm.value;
            if (!this.objEmailService._id) {

                this.isPost = true;
                this._objEmailService.saveEmailService(objSave)
                    .subscribe(res => this.resStatusMessage(res),
                        error => this.errorMessage(error));
            }
            else {
                this.isPost = false;
                objSave._id = this.objEmailService._id;
                this._objEmailService.updateEmailService(objSave)
                    .subscribe(res => this.resStatusMessage(res),
                        error => this.errorMessage(error));
            }
        }
    }

    validateForm() {
        if ((this.objEmailService.api_Key != "" && typeof this.objEmailService.api_Key != "undefined") || (this.objEmailService.host != "" && typeof this.objEmailService.host != "undefined"))
            return true;
        else {
            this.objAlert.showAlert("danger", "Alert !!", "Please Enter Either Host or API Key");
        }
    }

    resStatusMessage(res:any) {
        this.objAlert.hideAlert();
        if (this.isPost)
            this.getEmailService();
      swal("Success !", res.message, "success")

    }

    errorMessage(res:any) {
        this.objAlert.showAlert("danger", "Alert !!", res.message, true);

    }


}

