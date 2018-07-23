import {Component, OnInit, trigger, style, state, transition, animate} from '@angular/core';
import {ForgotPasswordModel} from './forgot-password.model';
import {ForgotPasswordService} from "./forgot-password.service";
import {FormBuilder, Validators, FormControl, FormGroup} from "@angular/forms";
import {FormControlMessages} from '../../../shared/components/control-valdation-message.component';
import{QUESTION_LIST} from '../../../shared/configs/security-question.config';
import {ValidationService} from "../../../shared/services/validation.service";
import {environment} from "../../../../environments/environment";

@Component(
  {
    selector: 'forgot-password',
    templateUrl: './forgot-password.html',
    animations: [trigger(
      'slideMsg',
      [
        state('collapse, void', style({opacity: 0})),
        state('expand', style({opacity: 1})),
        transition(
          'void <=> expand', [animate("1s ease-in", style({opacity: 1})), animate(500)])
      ])],
    providers: [ForgotPasswordService]
  })
export class ForgotPasswordComponent {
  objForgotPassword: ForgotPasswordModel = new ForgotPasswordModel();
  email: FormControl;
  securityQuestion: FormControl;
  securityAnswer: FormControl;
  slide: string = "collapse";
  questionlist: string[] = QUESTION_LIST;
  forgotPasswordForm: FormGroup;
  alertClass: string = "alert-danger";
  objResponse: string;
  isValidUser: boolean;
  isSubmitted: boolean;
  // homeRoute: string = environment.host;

  constructor(private form: FormBuilder, private _passwordService: ForgotPasswordService) {
    this.email = new FormControl('', Validators.compose([Validators.required, ValidationService.emailValidator]));
    this.securityAnswer = new FormControl('', Validators.required);
    this.securityQuestion = new FormControl('', Validators.required);
    this.forgotPasswordForm = form.group({
      email: this.email,
      securityQuestion: this.securityQuestion,
      securityAnswer: this.securityAnswer
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.forgotPasswordForm.valid) {
      this._passwordService.forgotPassword(this.forgotPasswordForm.value)
        .subscribe(objRes => this.handleSuccessResponse(objRes),
          error => this.handleError(error));
    }
  }

  handleSuccessResponse(res: any) {
    this.objResponse = res.message;
    this.alertClass = "alert-success";
    this.slide = "expand";
    this.isValidUser = true;
  }

  handleError(res: any) {
    this.objResponse = res;
    this.alertClass = "alert-danger";
    this.isValidUser = false;
    this.slide = "expand";
  }

}
