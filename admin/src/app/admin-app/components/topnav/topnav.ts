import {Component} from '@angular/core';
import {Router} from '@angular/router';
import{LoginService} from '../../../login-app/components/login/login.service';
import {Config} from "../../../shared/configs/general.config";
import {UserModel} from "../user-management/user.model";
import {environment} from "../../../../environments/environment";
@Component({
  selector: 'topnav',
  templateUrl: './topnav.html',
  styleUrls: ['./topnav.scss']
})

export class TopNavCmp {
  public oneAtATime: boolean = true;
  public items: Array<any> = [{name: 'google', link: 'https://google.com'}, {
    name: 'facebook',
    link: 'https://facebook.com'
  }];

  userName: string;
  twoFactorEnabled: boolean;
  homeRoute: string = environment.host;

  constructor(private _router: Router, private loginService: LoginService) {
    let userInfo: UserModel = JSON.parse(Config.getUserInfoToken());
    this.userName = userInfo.username;
    this.twoFactorEnabled = userInfo.twoFactorAuthEnabled;
  }

  logout() {
    this.loginService.logout();
    this._router.navigate(['/login']);
  }
}
