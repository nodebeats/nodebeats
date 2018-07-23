import {Component, EventEmitter, Output, Input, OnInit, ViewChild} from '@angular/core';
import {UserService} from "./user.service";
import {UserSettingModel, UserModel} from "./user.model";
import {Validators, FormBuilder, FormGroup, FormControl} from "@angular/forms";
import Swal from 'sweetalert2';
import { Config } from '../../../shared/configs/general.config';
import { Location } from '@angular/common';

@Component({
  selector: 'user-setting',
  templateUrl: './user-setting.html'
})

export class UserSettingComponent implements OnInit {
  userId:string;
  tfaEnabled:boolean;
  objUserSetting:UserSettingModel = new UserSettingModel();
  userSettingForm:FormGroup;
  isSubmitted:boolean = false;
  qrCodePath:string = "M0 0 L0 0 L0 0 Z";
  tfaChecked:boolean = false;

  @ViewChild('tfaEnable') tfaEnable: any;

  constructor(private location: Location, private _objUserService:UserService, private _formBuilder:FormBuilder) {
    let userInfo: UserModel = JSON.parse(Config.getUserInfoToken());
    this.userId = userInfo._id;
    this.tfaEnabled = userInfo.twoFactorAuthEnabled;    
    this.userSettingForm = this._formBuilder.group({
      "token": ['', Validators.required]
    });
  }

  ngOnInit() {
    this.tfaChecked = this.tfaEnabled;
    if (!this.tfaEnabled)
      this.getTwoFactorSecret();
  }

  getTwoFactorSecret() {
    this._objUserService.getTotpSecret()
      .subscribe(res=>this.bindData(res),
        err=>this.errorMessage(err));
  }

  bindData(res:any) {
    this.qrCodePath = res.qrcode.path;
  }

  verifyTotpToken() {
    this.isSubmitted = true;
    if (this.userSettingForm.valid) {
      let tokenValue:number = this.userSettingForm.controls['token'].value;
      this._objUserService.verifyTotpToken(tokenValue, this.userId)
        .subscribe(res=> {
            //this.toggleTfa = true;
            this.clearTextField();
            this.tfaEnabled = true;
            this.successStatusMessage(res)
          },
          err=>this.errorMessage(err));
    }
  }

  successStatusMessage(res:any) {
    Swal("Success !", res.message, "success");
  }

  errorMessage(objResponse:any) {
    Swal("Alert !", objResponse, "info");
  }

  triggerCancelForm() {
    this.location.back();
  }

  toggleEnable(args:boolean) {
    this.tfaChecked = args;
    if (!this.tfaEnabled && this.tfaChecked)
      this.getTwoFactorSecret();
    if (!args && this.tfaEnabled) {
    Swal({
          title: "Are you sure?",
          text: "You want to disable Two Factor Authentication  !",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Yes, delete it!"
        })
        .then((isConfirm)=> {
          if (isConfirm.value) {
            this.objUserSetting._id = this.userId;
            this.objUserSetting.twoFactorAuthEnabled = args;
            this._objUserService.updateSetting(this.objUserSetting)
              .subscribe(res=> {
                  this.tfaEnabled = false;
                  this.successStatusMessage(res);
                },
                error=> {
                  Swal("Alert!", error, "info");
                });
          } else {
            this.tfaChecked = true;
            this.tfaEnable.checked = true;
            Swal("Cancelled", "Your imaginary file is safe :)", "error");
          }
        });
    }
  }

  clearTextField() {
    (<FormControl>this.userSettingForm.controls['token']).patchValue("");
  }
}

