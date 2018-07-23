import {Component, EventEmitter, Output, OnInit} from '@angular/core';
import {UserService} from "./user.service";
import {UserModel} from "./user.model";
import {ValidationService} from "../../../shared/services/validation.service";
import{Config} from "../../../shared/configs/general.config";
import{ImageCanvasSizeEnum} from "../../../shared/configs/enum.config";
import {Validators, FormBuilder, FormGroup, FormControl} from "@angular/forms";
import{QUESTION_LIST} from '../../../shared/configs/security-question.config'
import {RoleService} from "../role-management/role.service";
import {RoleModel} from "../role-management/role.model";
import {Response} from "@angular/http";
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'user-form',
  templateUrl: './user-form.html'
})

export class UserRegistrationComponent implements OnInit {
  // objUser: UserModel = new UserModel();
  userForm: FormGroup;
  isSubmitted: boolean = false;
  objRoleList: RoleModel[] = [];
  /* Image Upload Handle*/
  imageDeleted: boolean = false;
  file: File;
  fileName: string = "";
  drawImagePath: string = Config.DefaultAvatar;
  imageFormControl: FormControl = new FormControl('');
  canvasSize: number = ImageCanvasSizeEnum.small;
  /* End Image Upload handle */
  questionlist: string[] = QUESTION_LIST;
  imageExtension: string;
  imagePath: string;
  userId: string;
  
  constructor(private router: Router, private _objUserService: UserService, private _formBuilder: FormBuilder, private roleService: RoleService) {
    this.userForm = this._formBuilder.group({
        "firstName": ['', Validators.required],
        "lastName": ['', Validators.required],
        "email": ['', Validators.compose([Validators.required, ValidationService.emailValidator])],
        "phoneNumber": ['', Validators.compose([Validators.required,ValidationService.numberValidatorwithDash])],
        "mobileNumber": ['', Validators.compose([Validators.required,ValidationService.numberValidatorwithDash])],
        "securityQuestion": ['', Validators.required],
        "securityAnswer": ['', Validators.required],
        "password": ['', Validators.compose([Validators.required, ValidationService.passwordValidator])],
        "confirmPassword": ['', Validators.required],
        imageFormControl: this.imageFormControl,
        middleName: [''],
        userRole: ['']
      },
      {
        validator: ValidationService.matchingPasswords('password', 'confirmPassword')
      }
    );
  }

  ngOnInit() {
    this.getRoleList();
  }

  getRoleList() {
    this.roleService.getRoleList(true) /*get active role*/
      .subscribe(objRes => this.objRoleList = objRes,
        err=>this.errorMessage(err));
  }

  saveUser() {
    this.isSubmitted = true;
    if (this.userForm.valid) {
      this._objUserService.registerUser(this.userForm.value, this.file)
        .subscribe(resUser => this.saveUserStatusMessage(resUser),
          error =>this.errorMessage(error));
    }
  }

  errorMessage(objResponse: any) {
    Swal("Alert !", objResponse, "info");
  }

  saveUserStatusMessage(objResponse: any) {
    Swal("Success !", objResponse.message, "success");
    this.triggerCancelForm();
  }

  triggerCancelForm() {
    this.router.navigate(['/user-management']);
  }

  /*Image handler */

  changeFile(args: any) {
    this.file = args;
    this.fileName = this.file.name;
  }

  drawImageToCanvas(path: string) {
    this.drawImagePath = path;
  }

  deleteImage() {
  Swal({
        title: "Are you sure?",
        text: "You will not be able to recover  the image  !",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it!"
      })
      .then((result)=> {
        if(result.value){
        // this._objUserService.deleteImage(this.fileName, this.objUser.imageProperties.imageExtension, this.objUser.imageProperties.imagePath)
        //   .subscribe(resUser=> {
        //       // this.objUser.imageName = "";
        //       this.fileName = "";
        //       this.handleDeleteSuccess(resUser);
        //       Swal("Deleted!", resUser.message, "success");
        //     },
        //     error=> {
        //       Swal("Alert!", error.message, "info");
        //     });
          }
      });

  }

  handleDeleteSuccess(resUser: Response) {
    this.imageDeleted = true;
    // this.objUser.imageName = "";
    let path = Config.DefaultAvatar;
    this.drawImageToCanvas(path);
  }

  /* End Image handler */


}

