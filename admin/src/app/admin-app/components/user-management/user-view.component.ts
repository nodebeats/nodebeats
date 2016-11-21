import {Component, EventEmitter, Output, Input, OnInit} from '@angular/core';
import {UserModel, UserResponse} from "../user-management/user.model";
import {UserService} from "../user-management/user.service";
import {Config} from "../../../shared/configs/general.config";
@Component({
    selector: 'user-view',
    templateUrl: '../../views/user-management/user-view.html'

})

export class UserViewComponent implements OnInit {
    //  @Input showInfo:boolean;
    @Input() userId:string;
    @Output() userEditEvent:EventEmitter<any> = new EventEmitter();
    @Output() showListEvent:EventEmitter<any> = new EventEmitter();
    objUser:UserModel = new UserModel();
    objResponse:UserResponse = new UserResponse();
    imageSrc:string;

    ngOnInit() {
        this.getUserDetail();
    }

    constructor(private _objUserService:UserService) {

    }

    getUserDetail() {
        this._objUserService.getUserDetail(this.userId)
            .subscribe(resUser => this.bindDetail(resUser),
                error => this.errorMessage(error));
    }

    errorMessage(objResponse:any) {
      swal("Alert !", objResponse.message, "info");

    }

    bindDetail(objUser:UserModel) {
        this.objUser = objUser;
        if (!this.objUser.imageName)
            this.imageSrc = Config.DefaultAvatar;
        else {
            let cl = Config.Cloudinary;
            this.imageSrc = cl.url(this.objUser.imageName, {transformation: [{crop: "thumb", width: 150}]});
        }
    }

    triggerCancelView(event) {
        let isCancel = true;
        this.showListEvent.emit(isCancel);
    }

    triggerEdit() {
        let isEdit = false;
        // this.userEditEvent.emit({showForm: true, userId: userId});
        this.userEditEvent.emit({isEdit: true, userId: this.userId});

    }


}

