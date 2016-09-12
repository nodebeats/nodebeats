import {Component, EventEmitter, Output, Input, ViewChild, OnInit} from '@angular/core';
import {UserService} from "./user.service";
import {UserModel, UserResponse} from "./user.model";
import {FormControlMessages} from "../../../shared/components/control-valdation-message.component";
import {ValidationService} from "../../../shared/services/validation.service";
import {Response} from "@angular/http";
import {Config} from "../../../shared/configs/general.config";
import{ImageCanvasSizeEnum} from '../../../shared/configs/enum.config';
import {ImageUploader} from "../../../shared/components/image-uploader.component";
import {Validators, FormBuilder, FormGroup,  FormControl} from "@angular/forms";
import {Password} from 'primeng/primeng';
import {QUESTION_LIST} from "../../../shared/configs/security-question.config";

@Component({
    selector: 'user-edit',
    templateUrl: 'admin-templates/user-management/user-form.html',
    directives: [Password, FormControlMessages, ImageUploader/*, FILE_UPLOAD_DIRECTIVES, NgClass, NgStyle, CORE_DIRECTIVES, TinyEditor*/]
})
export class UserEditComponent implements OnInit {
    @Input() userId:string;
    // @Input objUser:UserModel;
    @Output() showListEvent:EventEmitter<any> = new EventEmitter();
    userForm:FormGroup;
    objUser:UserModel = new UserModel();
    isSubmitted:boolean = false;
    /* Image Upload Handle*/
    imageDeleted:boolean = false;
    file:File;
    fileName:string = "";
    drawImagePath:string = Config.DefaultAvatar;
    imageFormControl:FormControl = new FormControl('');
    canvasSize:number = ImageCanvasSizeEnum.small;
    /* End Image Upload handle */
    questionlist:string[] = QUESTION_LIST;


    constructor(private _objUserService:UserService, private _formBuilder:FormBuilder) {
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
    }

    getUserDetail() {
        this._objUserService.getUserDetail(this.userId)
            .subscribe(resUser =>this.userDetailView(resUser),
                error => this.errorMessage(error));
    }

    userDetailView(objUser:UserModel) {
        this.objUser = objUser;
        let path:string = "";
        if (this.objUser.imageName) {
            var cl = Config.Cloudinary;
            path = cl.url(this.objUser.imageName);
        }
        // path = "/uploads/avatars/" + this.objUser.imageName;
        else
            path = "/img/defaults/default_avatar.png";
        this.drawImageToCanvas(path);
    }


    saveUser() {
        //  this.dataUrl = canvas.toDataURL('image/png').replace(/^data:image\/\w+;base64,/, "");
        //let blob:Blob;
        //blob = this.imageHelper.b64toBlob(this.dataUrl, 'image/png', 512);
        //  this._objUserService.registerUser(this.objUser, blob)
        this.isSubmitted = true;
        this.objUser.password = ""
        if (this.userForm.valid) {
            this._objUserService.updateUser(this.objUser, this.file, this.imageDeleted)
                .subscribe(resUser => this.saveUserStatusMessage(resUser),
                    error => this.errorMessage(error));
        }
    }

    saveUserStatusMessage(objUser:UserModel) {
        jQuery.jAlert({
            'title': 'Success',
            'content': 'User Updated Successfully',
            'theme': 'green'
        });
        this.showListEvent.emit(false);
    }

    errorMessage(objResponse:any) {
        jQuery.jAlert({
            'title': 'Alert',
            'content': objResponse.message,
            'theme': 'red'
        });
    }


    handleDeleteSuccess(resUser:Response) {
        this.imageDeleted = true;
        this.objUser.imageName = "";
        let path = "/img/defaults/default_avatar.png";
        this.drawImageToCanvas(path);
    }

    triggerCancelForm() {
        let isCancel:boolean = true;
        this.showListEvent.emit(isCancel);
    }

    /*Image handler */

    changeFile(args) {
        this.file = args;
        if (this.file)
            this.fileName = this.file.name;
    }

    drawImageToCanvas(path:string) {
        this.drawImagePath = path;
    }

    deleteImage() {
        jQuery.jAlert({
            'type': 'confirm',
            'title': 'Alert',
            'confirmQuestion': 'Are you sure to delete the image ?',
            'theme': 'red',
            'onConfirm': (e, btn)=> {
                e.preventDefault();
                this._objUserService.deleteImage(this.objUser.imageName, this.objUser.imageProperties.imageExtension, this.objUser.imageProperties.imagePath)
                    .subscribe(resUser=>this.handleDeleteSuccess(resUser),
                        error => this.errorMessage(error)
                    );
            }
        });
    }

}
/* End Image handler */

