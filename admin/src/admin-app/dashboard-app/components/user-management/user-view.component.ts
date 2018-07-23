import Swal from 'sweetalert2';
import {Component, EventEmitter, Output, Input, OnInit} from '@angular/core';
import {UserModel, UserResponse} from "../user-management/user.model";
import {UserService} from "../user-management/user.service";
import {Config} from "../../../shared/configs/general.config";
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'user-view',
  templateUrl: './user-view.html'

})

export class UserViewComponent implements OnInit {
  userId: string;
  objUser: UserModel = new UserModel();
  objResponse: UserResponse = new UserResponse();
  imageSrc: string = Config.DefaultAvatar;

  ngOnInit() {
    this.getUserDetail();
  }

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private _objUserService: UserService) {
    activatedRoute.params.subscribe(param => this.userId = param['userId']);
  }

  getUserDetail() {
    this._objUserService.getUserDetail(this.userId)
      .subscribe(resUser => this.bindDetail(resUser),
        error => this.errorMessage(error));
  }

  errorMessage(objResponse: any) {
    Swal("Alert !", objResponse, "info");
  }

  bindDetail(objUser: UserModel) {
    this.objUser = objUser;
    if (!this.objUser.imageName)
      this.imageSrc = Config.DefaultAvatar;
    else {
      let cl = Config.Cloudinary;
      this.imageSrc = cl.url(this.objUser.imageName);
    }
  }

  triggerCancelView() {
    this.router.navigate(['/user-management']);
  }

  triggerEdit() {
    this.router.navigate(['/user-management/editor', this.userId]);
  }


}

