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
    passwordType: string = 'password';
    confirmPasswordType: string = 'password';
    verifyToken: string;

    changePasswordForm: FormGroup;

    constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private forgotPasswordService: ForgotPasswordService) {
        activatedRoute.params.subscribe(param => this.verifyToken = param['token']);
    }
    
    ngOnInit() {
        this.changePasswordForm = this.fb.group({
            "password": ['', Validators.compose([Validators.required, ValidationService.passwordValidator])],
            "confirmPassword": ['', Validators.required]
        },
        {
            validator: ValidationService.matchingPasswords('password', 'confirmPassword')
        }
    );
    }

    onSubmit() {
        this.forgotPasswordService.changePassword(this.changePasswordForm.value, this.verifyToken)
            .subscribe(res => console.log(res.json()))
    }
}