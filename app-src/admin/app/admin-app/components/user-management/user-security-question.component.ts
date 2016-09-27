import {Component, EventEmitter, Output, Input, ViewChild, OnInit,} from '@angular/core';
import {UserService} from "./user.service";
import {UserSecurityModel} from "./user.model";
import {FormControlMessages} from "../../../shared/components/control-valdation-message.component";
import {Validators, FormBuilder, FormGroup} from "@angular/forms";
import{QUESTION_LIST} from '../../../shared/configs/security-question.config'
@Component({
    selector: 'user-security',
    templateUrl: 'admin-templates/user-management/user-security-update.html'
})

export class UserSecurityUpdateComponent {
    @Input() userId:string;
    @Output() showListEvent:EventEmitter<any> = new EventEmitter();
    @Input() hideCancel:boolean;
    objUserSecurity:UserSecurityModel = new UserSecurityModel();
    error:any;
    userSecurityForm:FormGroup;
    isSubmitted:boolean = false;
    questionlist:string[] = QUESTION_LIST;

    constructor(private _objUserService:UserService, private _formBuilder:FormBuilder) {
        this.userSecurityForm = this._formBuilder.group({
            "securityQuestion": ['', Validators.required],
            "securityAnswer": ['', Validators.required]
        });
    }

    updateSecurity() {
        this.isSubmitted = true;
        this.objUserSecurity._id = this.userId;
        if (this.userSecurityForm.valid) {
            this._objUserService.updateSecurityQuestion(this.objUserSecurity)
                .subscribe(res => this.successStatusMessage(res),
                    error => this.errorMessage);
        }
    }

    successStatusMessage(res:any) {
        jQuery.jAlert({
            'title': 'Success',
            'content': res.message,
            'theme': 'green'
        });
       // this.triggerCancelForm();
    }

    errorMessage(objResponse:any) {
        jQuery.jAlert({
            'title': 'Alert',
            'content': objResponse.message,
            'theme': 'red'
        });
    }


    triggerCancelForm() {
        let isCancel:boolean = true;
        this.showListEvent.emit(isCancel);
    }


}

