import {Component, OnInit, trigger, style, state, transition, animate} from '@angular/core';
import {LoginModel, LoginResponse} from './login.model';
import {LoginService} from "./login.service";
// import {Response} from "@angular/http";
import {FormBuilder, Validators, FormControl, FormGroup} from "@angular/forms";
import {Config} from "../../../shared/configs/general.config";
import {Router} from "@angular/router";
import {UserModel} from "../../../dashboard-app/components/user-management/user.model";

@Component(
  {
    selector: 'login-comp',
    templateUrl: './login-form.html',
    animations: [trigger(
      'slideMsg',
      [
        state('collapse, void', style({opacity: 0})),
        state('expand', style({opacity: 1})),
        transition(
          'collapse => expand', [animate("1s ease-in", style({opacity: 1})), animate(500)])
      ])]
  })
export class LoginComponent implements OnInit {
  objLogin: LoginModel = new LoginModel();
  // objResponse: LoginResponse = new LoginResponse();
  objResponse: string;
  username: FormControl;
  password: FormControl;
  token: FormControl;
  loginForm: FormGroup;
  tfaForm: FormGroup;
  isValidLogin: boolean = false;
  isSubmitted: boolean = false;
  tfaEnabled: boolean = false;
  userId: string;
  formImage: string = Config.LoginImage;
  slide: string = "collapse";
  adminRoute: string = "/dashboard";
  passwordShow: boolean = false;
  viewEye: string = 'fa-eye';
  passwordType: string = 'password';
  showTokenMsg: boolean = false;
  tokenResponse: any;

  constructor(private form: FormBuilder, private loginService: LoginService, private router: Router) {
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

  ngOnInit() {
    if (localStorage.verificationResponse !== undefined){
      this.showTokenMsg = true;
      const verificationResponse = JSON.parse(localStorage.getItem('verificationResponse'));
      this.tokenResponse = verificationResponse;
    }
    if (Config.getAuthToken()) {
      this.isValidLogin = true;
    }
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value)
        .subscribe(objRes => this.loginHandler(objRes),
          error => this.handleError(error));
    }
  }

  loginHandler(res: any) {
    if (res.success) {
      this.slide = "collapse";
      if (res.twoFactorAuthEnabled) {
        this.isSubmitted = false;
        this.tfaEnabled = true;
        this.formImage = Config.GoogleAuthImage;
        this.userId = res.userId;
      }
      else {
        this.forwardAfterSuccess(res.token, res.userInfo, res.tokenExpiryDate);
        localStorage.removeItem('verificationResponse');
      }
    }
    else {
      if (!res.isToken) {
        this.objResponse = res;
        this.slide = "expand";
      }
    }
  }

  forwardAfterSuccess(token: string, userInfo: UserModel, tokenExpiryDate:string) {
    Config.setLoggedInToken(token, userInfo, tokenExpiryDate);
    this.router.navigate(['/dashboard']);
  }

  onVerifyTfa() {
    this.isSubmitted = true;
    if (this.tfaForm.valid) {
      let token: number = this.tfaForm.controls['token'].value;
      this.loginService.tfaVerification(this.userId, token)
        .subscribe(res=> this.loginHandler(res),
          err=>this.handleError(err));
    }
  }

  handleError(res) {
    // if (res.status == 401) {
    //     let objResponse:LoginResponse = res.json();
    //     this.loginHandler(objResponse);
    // }
    // else if (res.status == 403) {
    Config.clearToken();
    this.objResponse = res;
    if (res.status == 401)
      this.loginHandler(this.objResponse);
  }

  //  }


// handleError(res:any) {
//     if (res.status != 401) {
//         this.objResponse = <LoginResponse>res;
//         this.isError = true;
//         setTimeout(()=> this.isError = !this.isError, 5000);
//     }
// }

  logout() {
    this.loginService.logout();
    this.isValidLogin = false;
  }
  
  showPass(){
    this.passwordShow= !this.passwordShow;
    if(this.passwordShow) {
      this.passwordType = 'text';
      this.viewEye = 'fa-eye-slash';
    }
    else{
      this.passwordType = 'password';
      this.viewEye = 'fa-eye';
    }
  }

}
