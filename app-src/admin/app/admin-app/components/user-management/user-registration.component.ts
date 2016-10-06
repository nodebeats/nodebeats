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

declare var jQuery:any;
@Component({
    selector: 'user-form',
    templateUrl: 'admin-templates/user-management/user-form.html'
})

export class UserRegistrationComponent implements OnInit {
    // @Input() userId:string;
    // @Input objUser:UserModel;
    @Output() showListEvent:EventEmitter<any> = new EventEmitter();
    objUser:UserModel = new UserModel();
    userForm:FormGroup;
    isSubmitted:boolean = false;
    objRoleList:RoleModel[]=[];
    /* Image Upload Handle*/
    imageDeleted:boolean = false;
    file:File;
    fileName:string = "";
    drawImagePath:string = Config.DefaultAvatar;
    imageFormControl:FormControl = new FormControl('');
    canvasSize:number = ImageCanvasSizeEnum.small;
    /* End Image Upload handle */
    questionlist:string[] = QUESTION_LIST;

    constructor(private _objUserService:UserService, private _formBuilder:FormBuilder, private roleService:RoleService) {
        this.userForm = this._formBuilder.group({
                "firstName": ['', Validators.required],
                "lastName": ['', Validators.required],
                "email": ['', Validators.compose([Validators.required, ValidationService.emailValidator])],
                "phoneNumber": ['', Validators.minLength(7)],
                "mobileNumber": ['', Validators.minLength(10)],
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
            this._objUserService.registerUser(this.objUser, this.file)
                .subscribe(resUser => this.saveUserStatusMessage(resUser),
                    error =>this.errorMessage(error));
        }
    }

    errorMessage(objResponse:any) {
        jQuery.jAlert({
            'title': 'Alert',
            'content': objResponse.message,
            'theme': 'red'
        });
    }

    saveUserStatusMessage(objUser:UserModel) {
        jQuery.jAlert({
            'title': 'Success',
            'content': 'User Registered Successfully',
            'theme': 'green'
        });
        this.showListEvent.emit(false); //isCancel false
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

    /* End Image handler */


}

