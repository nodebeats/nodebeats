import {Component, OnInit, trigger, style, state, transition, animate} from '@angular/core';
import {LoginModel, LoginResponse} from './login.model';
import {LoginService} from "./login.service";
import {Response} from "@angular/http";
import {FormBuilder, Validators, FormControl, FormGroup} from "@angular/forms";
import {FormControlMessages} from '../../../shared/components/control-valdation-message.component';
import {Config} from "../../../shared/configs/general.config";
import {Router} from "@angular/router";
import {UserModel} from "../../../admin-app/components/user-management/user.model";

@Component(
    {
        selector: 'login-comp',
        templateUrl: 'login-templates/login-form.html',
        directives: [FormControlMessages],
        animations: [trigger(
            'slideMsg',
            [
                state('collapse, void', style({opacity: 0})),
                state('expand', style({opacity: 1})),
                transition(
                    'void <=> expand', [animate("1s ease-in", style({opacity: 1})), animate(500)])
            ])]
    })
export class LoginComponent implements OnInit {
    objLogin:LoginModel = new LoginModel();
    objResponse:LoginResponse = new LoginResponse();
    username:FormControl;
    password:FormControl;
    token:FormControl;
    loginForm:FormGroup;
    tfaForm:FormGroup;
    isValidLogin:boolean = false;
    isSubmitted:boolean = false;
    tfaEnabled:boolean = false;
    userId:string;
    formImage:string = Config.LoginImage;
    slide:string = "collapse";
    adminRoute:string = "/admin";

    ngOnInit() {
        if (Config.getAuthToken()) {
            this.checkValidLogin();
        }
    }

    constructor(private form:FormBuilder, private _loginService:LoginService, private _router:Router) {
        this.username = new FormControl('', Validators.required);
        this.password = new FormControl('', Validators.required);
        this.token = new FormControl('', Validators.required);
        this.loginForm = form.group({
            username: this.username,
            password: this.password
        });

        this.tfaForm = form.group({
            token: this.token
        });

    }

    checkValidLogin() {
        this._loginService.isValidLogin()
            .subscribe(
                isValid => {
                    this.isValidLogin = isValid;
                    let redirectRoute = Config.getAdminRoute();
                    this.adminRoute = redirectRoute ? redirectRoute : "/admin";
                },
                error => this.handleError(error)
            );
    }

    onSubmit() {
        this.isSubmitted = true;
        if (this.loginForm.valid) {
            this._loginService.login(this.loginForm.value)
                .subscribe(objRes => this.loginHandler(objRes),
                    error => this.handleError(error));
        }
    }

    loginHandler(res:LoginResponse) {
        if (res.success) {
            if (res.twoFactorAuthEnabled) {
                this.isSubmitted = false;
                this.tfaEnabled = true;
                this.formImage = Config.GoogleAuthImage;
                this.userId = res.userId;
            }
            else {

                this.forwardAfterSuccess(res.token, res.userInfo);
            }
        }
        else {
            if (!res.isToken) {
                this.objResponse = res;
                this.slide = "expand";
                setTimeout(()=> {
                    this.slide = "collapse";
                }, 5000);

            }
        }
    }

    forwardAfterSuccess(token:string, userInfo:UserModel) {
        Config.setLoggedInToken(token, userInfo);
        this._router.navigate(['/admin']);
    }

    onVerifyTfa() {
        this.isSubmitted = true;
        if (this.tfaForm.valid) {
            let token:number = this.tfaForm.controls['token'].value;
            this._loginService.tfaVerification(this.userId, token)
                .subscribe(res=> this.loginHandler(res),
                    err=>this.handleError(err));
        }
    }

    handleError(res:Response) {
        // if (res.status == 401) {
        //     let objResponse:LoginResponse = res.json();
        //     this.loginHandler(objResponse);
        // }
        // else if (res.status == 403) {
        Config.clearToken();
        let objResponse:LoginResponse = res.json();
        this.loginHandler(objResponse);
        //  }
    }

// handleError(res:any) {
//     if (res.status != 401) {
//         this.objResponse = <LoginResponse>res;
//         this.isError = true;
//         setTimeout(()=> this.isError = !this.isError, 5000);
//     }
// }

    logout() {
        this._loginService.logout();
        this.isValidLogin = false;
    }
}