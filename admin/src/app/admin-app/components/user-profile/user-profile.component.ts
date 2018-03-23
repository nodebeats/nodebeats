import {Component, EventEmitter, Output, Input, OnInit} from '@angular/core';
import {UserModel, UserResponse} from "../user-management/user.model";
import {UserService} from "../user-management/user.service";
import {Config} from "../../../shared/configs/general.config";
@Component({
    selector: 'user-profile',
    templateUrl: './user-profile.html'

})

export class UserProfileComponent implements OnInit {
    //  @Input showInfo:boolean;
    @Input() userId:string;
    @Output() userEditEvent:EventEmitter<any> = new EventEmitter();
    @Input() showView:boolean;
    objUser:UserModel = new UserModel();
    objResponse:UserResponse = new UserResponse();
    imageSrc:string=Config.DefaultAvatar;
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
            this.imageSrc = cl.url(this.objUser.imageName, {transformation: [{width: 100, crop: "scale"}]});
        }
    }

    onShowView(args) {
        if (!args) // isCanceled
            this.getUserDetail();
        this.showView = true;
    }

    onShowEdit() {
        this.showView = false;
    }

}

