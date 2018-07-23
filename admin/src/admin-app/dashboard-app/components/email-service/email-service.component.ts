import Swal from "sweetalert2";
import {
  Component,
  OnInit
} from "@angular/core";
import { EmailServiceService } from "./email-service.service";
import { EmailServiceModel } from "./email-service.model";
import { FormControlMessages } from "../../../shared/components/control-valdation-message.component";
import { Alert } from "../../../shared/components/alert/alert";
import { AlertModel } from "../../../shared/models/alert.model";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { ValidationService } from "../../../shared/services/validation.service";

@Component({
  selector: "email-service",
  templateUrl: "./email-service.html"
})
export class EmailServiceComponent implements OnInit {
  emailServiceId: string;
  emailServiceProvider: string[] = [
    "normal",
    "mailgun",
    "postmark",
    "mandrill",
    "sendgrid",
    "amazon"
  ];
  objAlert: AlertModel = new AlertModel();
  isPost: boolean;
  isSubmitted: boolean = false;
  emailServiceForm: FormGroup;

  constructor(
    private _objEmailService: EmailServiceService,
    private _formBuilder: FormBuilder
  ) {
    this.emailServiceForm = this._formBuilder.group({
      serviceProviderType: ["", Validators.required],
      host: [""],
      port: ["", ValidationService.numberValidator],
      authUserName: [""],
      authPassword: [""],
      pool: [""],
      api_Key: [""],
      api_Secret: [""],
      api_User: [""],
      domain: [""],
      rateLimit: [
        "0",
        Validators.compose([
          ValidationService.numberValidator,
          Validators.required
        ])
      ],
      secure: [""]
    });
  }

  ngOnInit() {
    this.getEmailService();
  }

  getEmailService() {
    this._objEmailService
      .getEmailServiceDetail()
      .subscribe(
        res => this.bindDetail(res),
        error => this.errorMessage(error)
      );
  }

  bindDetail(objEmail: EmailServiceModel) {
    this.emailServiceId = objEmail._id;
    this.emailServiceForm.setValue({
      serviceProviderType: objEmail.serviceProviderType,
      host: objEmail.host ? objEmail.host : '',
      port: objEmail.port ? objEmail.port : '',
      authUserName: objEmail.authUserName ? objEmail.authUserName : '',
      authPassword: objEmail.authPassword ? objEmail.authPassword : '',
      pool: objEmail.pool ? objEmail.pool : '',
      api_Key: objEmail.api_Key ? objEmail.api_Key : '',
      api_Secret: objEmail.api_Secret ? objEmail.api_Secret : '',
      api_User: objEmail.api_User ? objEmail.api_User : '',
      domain: objEmail.domain ? objEmail.domain : '',
      rateLimit: objEmail.rateLimit,
      secure: objEmail.secure ? objEmail.secure : ''
    });
  }

  saveEmailService() {
    this.isSubmitted = true;
    if (this.validateForm() && this.emailServiceForm.valid) {
      if (!this.emailServiceId) {
        this.isPost = true;
        this._objEmailService
          .saveEmailService(this.emailServiceForm.value)
          .subscribe(
            res => this.resStatusMessage(res),
            error => this.errorMessage(error)
          );
      } else {
        this.isPost = false;
        this._objEmailService
          .updateEmailService(this.emailServiceForm.value, this.emailServiceId)
          .subscribe(
            res => this.resStatusMessage(res),
            error => this.errorMessage(error)
          );
      }
    }
  }

  validateForm() {
    if (
      (this.emailServiceForm.value.api_Key != "" &&
        typeof this.emailServiceForm.value.api_Key != "undefined") ||
      (this.emailServiceForm.value.host != "" &&
        typeof this.emailServiceForm.value.host != "undefined")
    )
      return true;
    else {
      this.objAlert.showAlert(
        "danger",
        "Alert !!",
        "Please Enter Either Host or API Key"
      );
    }
  }

  resStatusMessage(res: any) {
    this.objAlert.hideAlert();
    if (this.isPost) this.getEmailService();
    Swal("Success !", res.message, "success");
  }

  errorMessage(res: any) {
    let errorMessage: string = "";
    // if (res.length > 0) {
    //   for (let i in res) {
    //     if (i + 1 < res.length)
    //       errorMessage += res[i].msg + " & ";
    //       console.log('err => ', errorMessage);
    //     else errorMessage += res[i].msg;
    //     console.log('errMsg => ', errorMessage);
    //   }
    // } else {
      errorMessage = res;
    // }
    this.objAlert.showAlert("danger", "Alert !!", errorMessage, true);
  }
}
