import Swal from 'sweetalert2';
import {Component} from '@angular/core';
import {UserService} from "./user.service";
import {UserSecurityModel, UserModel} from "./user.model";
import {Validators, FormBuilder, FormGroup} from "@angular/forms";
import {QUESTION_LIST} from '../../../shared/configs/security-question.config';
import { Router } from '@angular/router';
import { Config } from '../../../shared/configs/general.config';

@Component({
    selector: 'user-security',
    templateUrl: './user-security-update.html'
})

export class UserSecurityUpdateComponent {
    userId:string;
    showCancel: boolean;
    objUserSecurity:UserSecurityModel = new UserSecurityModel();
    userSecurityForm:FormGroup;
    isSubmitted:boolean = false;
    questionlist:string[] = QUESTION_LIST;

    constructor(private router: Router, private _objUserService:UserService, private _formBuilder:FormBuilder) {
        if(router.routerState.snapshot.url.split('/').length>3){
            this.userId = router.routerState.snapshot.url.split('/')[3];
            this.showCancel = true;
        }else{
            let userInfo: UserModel = JSON.parse(Config.getUserInfoToken());
            this.userId = userInfo._id;
            this.showCancel = false;
        }
        this.userSecurityForm = this._formBuilder.group({
            "securityQuestion": ['', Validators.required],
            "securityAnswer": ['', Validators.required]
        });
    }

    getSecurityQuestionDetail() {
        this._objUserService.getUserDetail(this.userId)
            .subscribe(res => console.log(res));
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
        Swal("Success !", res.message, "success");
        this.triggerCancelForm();
    }

    errorMessage(objResponse:any) {
        Swal("Alert !", objResponse, "info");
    }

    triggerCancelForm() {
        if(this.showCancel)
            this.router.navigate(['/user-management']);
        else
            this.router.navigate(['/profile/security']);
    }
}

