import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import {Component, OnInit} from '@angular/core';
import {UserModel, UserResponse} from "../user-management/user.model";
import {UserService} from "../user-management/user.service";
import {Config} from "../../../shared/configs/general.config";

@Component({
    selector: 'user-profile',
    templateUrl: './user-profile.html'

})

export class UserProfileComponent implements OnInit {
    userId:string;
    tfaEnabled:boolean = false;    
    objUser:UserModel = new UserModel();
    objResponse:UserResponse = new UserResponse();
    imageSrc:string=Config.DefaultAvatar;

    ngOnInit() {
        this.getUserDetail();
    }

    constructor(private _objUserService:UserService, private router: Router) {
        let userInfo:UserModel = JSON.parse(Config.getUserInfoToken());
        this.userId = userInfo._id;
        this.tfaEnabled = userInfo.twoFactorAuthEnabled;
    }

    getUserDetail() {
        this._objUserService.getUserDetail(this.userId)
            .subscribe(resUser => this.bindDetail(resUser),
                error => this.errorMessage(error));
    }

    errorMessage(objResponse:any) {
        Swal("Alert !", objResponse, "info");
    }

    bindDetail(objRes:UserModel) {
        this.objUser = objRes;
        if (!this.objUser.imageName)
            this.imageSrc = Config.DefaultAvatar;
        else {
            let cl = Config.Cloudinary;
            this.imageSrc = cl.url(this.objUser.imageName);
        }
    }

    onShowEdit() {
        this.router.navigate(['/profile/edit', this.userId]);
    }

}

