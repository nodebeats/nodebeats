import {Component, EventEmitter, Output, Input, ViewChild, OnInit,} from '@angular/core';
import {UserService} from "./user.service";
import {UserModel} from "./user.model";
import {ValidationService} from "../../../shared/services/validation.service";
import {Validators, FormBuilder, FormGroup} from "@angular/forms";
import Swal from 'sweetalert2';
import {Router} from "@angular/router";
import {LoginService} from "../../../login-app/components/login/login.service";
import { Config } from '../../../shared/configs/general.config';

@Component({
  selector: 'user-password',
  templateUrl: './user-password-update.html'
})

export class UserPasswordUpdateComponent {
  userId: string;
  objUser: UserModel = new UserModel();
  userPasswordForm: FormGroup;
  isSubmitted: boolean = false;

  constructor(private _objUserService: UserService, private router: Router, private _formBuilder: FormBuilder, private loginService: LoginService) {
    if(router.routerState.snapshot.url.split('/').length>3){
      this.userId = router.routerState.snapshot.url.split('/')[3];
    }else{
      let userInfo: UserModel = JSON.parse(Config.getUserInfoToken());
      this.userId = userInfo._id;
    }
    this.userPasswordForm = this._formBuilder.group({
        "password": ['', Validators.compose([Validators.required, ValidationService.passwordValidator])],
        "confirmPassword": ['', Validators.required]
      },
      {
        validator: ValidationService.matchingPasswords('password', 'confirmPassword')
      }
    );
  }

  updatePassword() {
    this.isSubmitted = true;
    this.objUser._id = this.userId;
    if (this.userPasswordForm.valid) {
      this._objUserService.updatePassword(this.objUser)
        .subscribe(resUser => this.saveUserStatusMessage(resUser),
          error => this.errorMessage(error));
    }
  }

  saveUserStatusMessage(res: any) {
  Swal({
      title: "Success !",
      type:"success",
      text:res.message,
      timer: 3000,
      showConfirmButton: false
    });
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

  errorMessage(objResponse: any) {
    Swal("Alert !", objResponse.message, "info");
  }

  triggerCancelForm() {
    
  }


}

