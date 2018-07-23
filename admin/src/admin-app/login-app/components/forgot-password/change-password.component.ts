import { ForgotPasswordService } from './forgot-password.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ValidationService } from '../../../shared/services/validation.service';

@Component({
    selector: 'change-password',
    templateUrl: './change-password.component.html',
    providers: [ForgotPasswordService]
})

export class ChangePasswordComponent implements OnInit{
    verifyToken: string;
    allowChange: boolean = false;
    changePasswordForm: FormGroup;
    message: string = '';
    alertClass: string = 'alert-danger';

    passwordType: string = 'password';
    viewPassEye: string = 'fa-eye';
    passShow: boolean = false;

    viewConfirmPassEye: string = 'fa-eye';
    confirmPasswordType: string = 'password';
    confirmPassShow: boolean = false;
    
    constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private forgotPasswordService: ForgotPasswordService) {
        activatedRoute.params.subscribe(param => this.verifyToken = param['token']);
    }
    
    ngOnInit() {
        this.checkPasswordChangeStatus();
        this.changePasswordForm = this.fb.group({
            "password": ['', Validators.compose([Validators.required, ValidationService.passwordValidator])],
            "confirmPassword": ['', Validators.required]
        },
        {
            validator: ValidationService.matchingPasswords('password', 'confirmPassword')
        }
    );
    }

    checkPasswordChangeStatus() {
        this.forgotPasswordService.checkChangePasswordStatus(this.verifyToken)
            .subscribe(res => this.bindStatus(res));
    }

    bindStatus(res: any) {
        this.allowChange = res.status;
        this.message = res.message ? res.message : '';
    }

    onSubmit() {
        this.forgotPasswordService.saveNewPassword(this.changePasswordForm.value, this.verifyToken)
            .subscribe(res => this.successResMessage(res),
            error => this.errorResMessage(error))
    }

    successResMessage(res: any) {
        this.allowChange = false;
        this.alertClass = "alert-success";
        this.message = res.message;
    }

    errorResMessage(error: any) {
        this.allowChange = true;
        this.alertClass = "alert-danger";
        this.message = error;
    }

    showPass(){
        this.passShow= !this.passShow;
        if(this.passShow) {
          this.passwordType = 'text';
          this.viewPassEye = 'fa-eye-slash';
        }
        else{
          this.passwordType = 'password';
          this.viewPassEye = 'fa-eye';
        }
    }

    showConfirmPass() {
        this.confirmPassShow= !this.confirmPassShow;
        if(this.confirmPassShow) {
          this.confirmPasswordType = 'text';
          this.viewConfirmPassEye = 'fa-eye-slash';
        }
        else{
          this.confirmPasswordType = 'password';
          this.viewConfirmPassEye = 'fa-eye';
        }
    }
}