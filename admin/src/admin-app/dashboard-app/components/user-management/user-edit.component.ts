import { Component, OnInit } from '@angular/core';
import { UserService } from "./user.service";
import { UserModel } from "./user.model";
import { ValidationService } from "../../../shared/services/validation.service";
import { Response } from "@angular/http";
import { Config } from "../../../shared/configs/general.config";
import { ImageCanvasSizeEnum } from '../../../shared/configs/enum.config';
import { Validators, FormBuilder, FormGroup, FormControl } from "@angular/forms";
import { QUESTION_LIST } from "../../../shared/configs/security-question.config";
import { RoleService } from "../role-management/role.service";
import { RoleModel } from "../role-management/role.model";
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'user-edit',
  templateUrl: './user-form.html'
})

export class UserEditComponent implements OnInit {
  userId: string;
  userForm: FormGroup;
  objUser: UserModel = new UserModel();
  isSubmitted: boolean = false;
  objRoleList: RoleModel[] = [];
  /* Image Upload Handle*/
  imageDeleted: boolean = false;
  file: File;
  fileName: string = "";
  drawImagePath: string = Config.DefaultAvatar;
  imageFormControl: FormControl = new FormControl('');
  canvasSize: number = ImageCanvasSizeEnum.small;
  imageExtension: string;
  imagePath: string;
  /* End Image Upload handle */
  questionlist: string[] = QUESTION_LIST;


  constructor(private location: Location, private router: Router, private activatedRoute: ActivatedRoute, private _objUserService: UserService, private _formBuilder: FormBuilder, private roleService: RoleService) {
    activatedRoute.params.subscribe(param => this.userId = param['userId']);
    this.userForm = this._formBuilder.group({
      "firstName": ['', Validators.required],
      "middleName": [''],
      "lastName": ['', Validators.required],
      "email": ['', Validators.compose([Validators.required, ValidationService.emailValidator])],
      "phoneNumber": ['', Validators.minLength(7)],
      "mobileNumber": ['', Validators.minLength(10)],
      "imageFormControl": this.imageFormControl,
      "userRole": ['']
    });
  }

  ngOnInit() {
    this.getUserDetail();
    this.getRoleList();
  }

  getRoleList() {
    this.roleService.getRoleList(true) /*get active role*/
      .subscribe(objRes => {
        this.objRoleList = objRes;
        // console.log("role", this.objRoleList)
      },
        err => this.errorMessage(err));
  }

  getUserDetail() {
    this._objUserService.getUserDetail(this.userId)
      .subscribe(resUser => this.userDetailView(resUser),
        error => this.errorMessage(error));
  }

  userDetailView(objUser: UserModel) {
    this.imageExtension = objUser.imageProperties ? objUser.imageProperties.imageExtension : '';
    this.imagePath = objUser.imageProperties ? objUser.imageProperties.imagePath : '';
    this.userForm.patchValue({
      firstName: objUser.firstName,
      middleName: objUser.middleName,
      lastName: objUser.lastName,
      email: objUser.email,
      phoneNumber: objUser.phoneNumber,
      mobileNumber: objUser.mobileNumber,
      userRole: objUser.userRole
    });
    this.fileName = objUser.imageName;
    (<FormControl>this.userForm.controls['imageFormControl']).patchValue(this.fileName);
    let path: string = "";
    if (objUser.userRole == "superadmin") {
      // this.userForm.controls["userRole"].reset({value: objUser.userRole, disabled: true})
      this.userForm.controls["userRole"].patchValue(objUser.userRole);
    }
    if (this.fileName) {
      var cl = Config.Cloudinary;
      path = cl.url(this.fileName);
    }
    // path = "/uploads/avatars/" + this.objUser.imageName;
    else
      path = Config.DefaultAvatar;
    this.drawImageToCanvas(path);
  }

  saveUser() {
    this.isSubmitted = true;
    if (this.userForm.valid) {
      this._objUserService.updateUser(this.userForm.value, this.file, this.imageDeleted, this.userId)
        .subscribe(resUser => this.saveUserStatusMessage(resUser),
          error => this.errorMessage(error));
    }
  }

  saveUserStatusMessage(objResponse: any) {
    Swal("Success !", objResponse.message, "success");
    this.triggerCancelForm();
  }

  errorMessage(objResponse: any) {
    Swal("Alert !", objResponse, "info");
  }

  handleDeleteSuccess(resUser: Response) {
    this.imageDeleted = true;
    this.fileName = "";
    let path = Config.DefaultAvatar;
    this.drawImageToCanvas(path);
  }

  triggerCancelForm() {
    this.location.back();
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
      .then((result) => {
        if (result.value) {
          this._objUserService.deleteImage(this.fileName, this.imageExtension, this.imagePath)
            .subscribe(resUser => {
              // this.imageDeleted = true;
              // this.fileName = "";
              this.handleDeleteSuccess(resUser);
              Swal("Deleted!", resUser.message, "success");
            },
              error => {
                Swal("Alert!", error, "info");
              });
        }
      });
  }

}
/* End Image handler */

