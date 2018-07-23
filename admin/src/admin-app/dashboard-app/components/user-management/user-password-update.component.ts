import {
  Component,
  EventEmitter,
  Output,
  Input,
  ViewChild,
  OnInit
} from "@angular/core";
import { UserService } from "./user.service";
import { UserModel } from "./user.model";
import { ValidationService } from "../../../shared/services/validation.service";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import Swal from "sweetalert2";
import { Router } from "@angular/router";
import { LoginService } from "../../../login-app/components/login/login.service";
import { Config } from "../../../shared/configs/general.config";

@Component({
  selector: "user-password",
  templateUrl: "./user-password-update.html"
})
export class UserPasswordUpdateComponent {
  userId: string;
  showCancel: boolean;
  objUser: UserModel = new UserModel();
  userPasswordForm: FormGroup;
  isSubmitted: boolean = false;

  passwordType: string = "password";
  viewPassEye: string = "fa-eye";
  passShow: boolean = false;

  viewConfirmPassEye: string = "fa-eye";
  confirmPasswordType: string = "password";
  confirmPassShow: boolean = false;

  constructor(
    private _objUserService: UserService,
    private router: Router,
    private _formBuilder: FormBuilder,
    private loginService: LoginService
  ) {
    if (router.routerState.snapshot.url.split("/").length > 3) {
      this.userId = router.routerState.snapshot.url.split("/")[3];
      this.showCancel = true;
    } else {
      let userInfo: UserModel = JSON.parse(Config.getUserInfoToken());
      this.userId = userInfo._id;
      this.showCancel = false;
    }
    this.userPasswordForm = this._formBuilder.group(
      {
        password: [
          "",
          Validators.compose([
            Validators.required,
            ValidationService.passwordValidator
          ])
        ],
        confirmPassword: ["", Validators.required]
      },
      {
        validator: ValidationService.matchingPasswords(
          "password",
          "confirmPassword"
        )
      }
    );
  }

  updatePassword() {
    this.isSubmitted = true;
    this.objUser._id = this.userId;
    if (this.userPasswordForm.valid) {
      this._objUserService
        .updatePassword(this.objUser)
        .subscribe(
          resUser => this.saveUserStatusMessage(resUser),
          error => this.errorMessage(error)
        );
    }
  }

  saveUserStatusMessage(res: any) {
    Swal({
      title: "Success !",
      type: "success",
      text: res.message,
      timer: 3000,
      showConfirmButton: false
    });
    this.loginService.logout();
    this.router.navigate(["/login"]);
  }

  errorMessage(objResponse: any) {
    Swal("Alert !", objResponse, "info");
  }

  triggerCancelForm() {
    if (this.showCancel) this.router.navigate(["/user-management"]);
    else this.router.navigate(["/profile/password"]);
  }

  showPass() {  //password view
    this.passShow = !this.passShow;
    if (this.passShow) {
      this.passwordType = "text";
      this.viewPassEye = "fa-eye-slash";
    } else {
      this.passwordType = "password";
      this.viewPassEye = "fa-eye";
    }
  }

  showConfirmPass() {
    this.confirmPassShow = !this.confirmPassShow;
    if (this.confirmPassShow) {
      this.confirmPasswordType = "text";
      this.viewConfirmPassEye = "fa-eye-slash";
    } else {
      this.confirmPasswordType = "password";
      this.viewConfirmPassEye = "fa-eye";
    }
  }
}
