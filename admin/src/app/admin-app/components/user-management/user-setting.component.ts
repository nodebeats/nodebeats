import {Component, EventEmitter, Output, Input, OnInit} from '@angular/core';
import {UserService} from "./user.service";
import {UserSettingModel} from "./user.model";
import {Validators, FormBuilder, FormGroup, FormControl} from "@angular/forms";
@Component({
  selector: 'user-setting',
  templateUrl: './user-setting.html'
})

export class UserSettingComponent implements OnInit {
  @Input() userId:string;
  @Input() tfaEnabled:boolean;
  @Input() hideCancel:boolean;
  @Output() showListEvent:EventEmitter<any> = new EventEmitter();
  objUserSetting:UserSettingModel = new UserSettingModel();
  userSettingForm:FormGroup;
  isSubmitted:boolean = false;
  qrCodePath:string = "M0 0 L0 0 L0 0 Z";
  tfaChecked:boolean = false;
  isCancel:boolean = true;

  constructor(private _objUserService:UserService, private _formBuilder:FormBuilder) {
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
    this.isCancel = false;
    swal("Success !", res.message, "success")

  }

  errorMessage(objResponse:any) {
    swal("Alert !", objResponse.message, "info");

  }

  triggerCancelForm() {
    this.showListEvent.emit(this.isCancel);
  }

  toggleEnable(args:boolean) {
    this.tfaChecked = args;
    if (!this.tfaEnabled && this.tfaChecked)
      this.getTwoFactorSecret();
    if (!args && this.tfaEnabled) {
      swal({
          title: "Are you sure?",
          text: "You want to disable Two Factor Authentication  !",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Yes, delete it!",
          closeOnConfirm: false
        },
        (isConfirm)=> {
          if (isConfirm) {
            this.objUserSetting._id = this.userId;
            this.objUserSetting.twoFactorAuthEnabled = args;
            this._objUserService.updateSetting(this.objUserSetting)
              .subscribe(res=> {
                  this.tfaEnabled = false;
                  this.successStatusMessage(res);
                },
                error=> {
                  swal("Alert!", error.message, "info");

                });
          } else {
            this.tfaChecked = true;
            swal("Cancelled", "Your imaginary file is safe :)", "error");
          }
        });
    }
  }

  clearTextField() {
    (<FormControl>this.userSettingForm.controls['token']).patchValue("");
  }


}

