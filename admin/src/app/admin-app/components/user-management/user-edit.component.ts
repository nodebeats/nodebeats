import {Component, EventEmitter, Output, Input, OnInit} from '@angular/core';
import {UserService} from "./user.service";
import {UserModel} from "./user.model";
import {ValidationService} from "../../../shared/services/validation.service";
import {Response} from "@angular/http";
import {Config} from "../../../shared/configs/general.config";
import{ImageCanvasSizeEnum} from '../../../shared/configs/enum.config';
import {Validators, FormBuilder, FormGroup, FormControl} from "@angular/forms";
import {QUESTION_LIST} from "../../../shared/configs/security-question.config";
import {RoleService} from "../role-management/role.service";
import {RoleModel} from "../role-management/role.model";
@Component({
  selector: 'user-edit',
  templateUrl: './user-form.html'
})
export class UserEditComponent implements OnInit {
  @Input() userId: string;
  // @Input objUser:UserModel;
  @Output() showListEvent: EventEmitter<any> = new EventEmitter();
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
  /* End Image Upload handle */
  questionlist: string[] = QUESTION_LIST;


  constructor(private _objUserService: UserService, private _formBuilder: FormBuilder, private roleService: RoleService) {
    this.userForm = this._formBuilder.group({
      "firstName": ['', Validators.required],
      "lastName": ['', Validators.required],
      "email": ['', Validators.compose([Validators.required, ValidationService.emailValidator])],
      "phoneNumber": ['', Validators.minLength(7)],
      "mobileNumber": ['', Validators.minLength(10)],
      "imageFormControl": this.imageFormControl,
      middleName: [''],
      phone: [''],
      mobile: [''],
      userRole: ['']

    });
  }

  ngOnInit() {
    this.getUserDetail();
    this.getRoleList();
  }

  getRoleList() {
    this.roleService.getRoleList(true) /*get active role*/
      .subscribe(objRes => this.objRoleList = objRes,
        err=>this.errorMessage(err));
  }

  getUserDetail() {
    this._objUserService.getUserDetail(this.userId)
      .subscribe(resUser =>this.userDetailView(resUser),
        error => this.errorMessage(error));
  }

  userDetailView(objUser: UserModel) {
    this.objUser = objUser;
    let path: string = "";
    if (this.objUser.userRole == "superadmin")
      this.userForm.controls["userRole"].reset({value: this.objUser.userRole, disabled: true})
    if (this.objUser.imageName) {
      var cl = Config.Cloudinary;
      path = cl.url(this.objUser.imageName);
    }
    // path = "/uploads/avatars/" + this.objUser.imageName;
    else
      path = Config.DefaultAvatar;
    this.drawImageToCanvas(path);
  }


  saveUser() {
    //  this.dataUrl = canvas.toDataURL('image/png').replace(/^data:image\/\w+;base64,/, "");
    //let blob:Blob;
    //blob = this.imageHelper.b64toBlob(this.dataUrl, 'image/png', 512);
    //  this._objUserService.registerUser(this.objUser, blob)
    this.isSubmitted = true;
    this.objUser.password = "";
    if (this.userForm.valid) {
      this._objUserService.updateUser(this.objUser, this.file, this.imageDeleted)
        .subscribe(resUser => this.saveUserStatusMessage(resUser),
          error => this.errorMessage(error));
    }
  }

  saveUserStatusMessage(objResponse: any) {
    swal("Success !", objResponse.message, "success");

    this.showListEvent.emit(false);
  }

  errorMessage(objResponse: any) {
    swal("Alert !", objResponse.message, "info");

  }


  handleDeleteSuccess(resUser: Response) {
    this.imageDeleted = true;
    this.objUser.imageName = "";
    let path = Config.DefaultAvatar;
    this.drawImageToCanvas(path);
  }

  triggerCancelForm() {
    let isCancel: boolean = true;
    this.showListEvent.emit(isCancel);
  }

  /*Image handler */

  changeFile(args) {
    this.file = args;
    this.fileName = this.file.name;
  }

  drawImageToCanvas(path: string) {
    this.drawImagePath = path;
  }

  deleteImage() {
    swal({
        title: "Are you sure?",
        text: "You will not be able to recover  the image  !",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: false
      },
      ()=> {
        this._objUserService.deleteImage(this.objUser.imageName, this.objUser.imageProperties.imageExtension, this.objUser.imageProperties.imagePath)
          .subscribe(resUser=> {
              this.objUser.imageName = "";
              this.fileName = "";
              this.handleDeleteSuccess(resUser);
              swal("Deleted!", resUser.message, "success");
            },
            error=> {
              swal("Alert!", error.message, "info");

            });
      });

  }

}
/* End Image handler */

