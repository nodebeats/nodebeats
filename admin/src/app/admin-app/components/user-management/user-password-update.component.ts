import {Component, EventEmitter, Output, Input, ViewChild, OnInit,} from '@angular/core';
import {UserService} from "./user.service";
import {UserModel} from "./user.model";
import {FormControlMessages} from "../../../shared/components/control-valdation-message.component";
import {ValidationService} from "../../../shared/services/validation.service";
import {Validators, FormBuilder, FormGroup} from "@angular/forms";
import {Password} from 'primeng/primeng';
import {Config} from "../../../shared/configs/general.config";
import {ActivatedRoute, Router} from "@angular/router";
import {LoginService} from "../../../login-app/components/login/login.service";
@Component({
  selector: 'user-password',
  templateUrl: '../../views/user-management/user-password-update.html'
})

export class UserPasswordUpdateComponent {
  @Input() userId:string;
  @Input() hideCancel:boolean;
  @Output() showListEvent:EventEmitter<any> = new EventEmitter();
  objUser:UserModel = new UserModel();
  error:any;
  userPasswordForm:FormGroup;
  isSubmitted:boolean = false;

  constructor(private _objUserService:UserService, private router:Router, private _formBuilder:FormBuilder, private activatedRoute:ActivatedRoute, private loginService:LoginService) {
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

  saveUserStatusMessage(res:any) {
    swal("Success !", res.message, "success",
      ()=> {
        if (this.activatedRoute.snapshot.url[0].path.indexOf("profile") != -1) {
          this.loginService.logout();
          this.router.navigate(['/login']);
        }
      });


    // this.triggerCancelForm();
  }

  errorMessage(objResponse:any) {

    swal("Alert !", objResponse.message, "info");

  }


  triggerCancelForm() {
    let isCancel:boolean = true;
    this.showListEvent.emit(isCancel);
  }


}

