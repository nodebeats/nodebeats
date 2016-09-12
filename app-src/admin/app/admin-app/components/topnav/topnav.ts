import {Component} from '@angular/core';
import {DropdownDirective, DropdownToggleDirective} from 'ng2-bootstrap/ng2-bootstrap';
import {DROPDOWN_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import {Router} from '@angular/router';
import{LoginService} from '../../../login-app/components/login/login.service';
import {Config} from "../../../shared/configs/general.config";
import {UserModel} from "../user-management/user.model";
@Component({
    selector: 'topnav',
    templateUrl: 'admin-templates/shared/topnav.html',
    directives: [DropdownDirective, DropdownToggleDirective],
    viewProviders: [DropdownToggleDirective, DROPDOWN_DIRECTIVES]
})
// @RouteConfig([
//     {path: '/home', component: HomeCmp, as: 'Home'}
// ])
export class TopNavCmp {
    public oneAtATime:boolean = true;
    public items:Array<any> = [{name: 'google', link: 'https://google.com'}, {
        name: 'facebook',
        link: 'https://facebook.com'
    }];
    public status:Object = {
        isFirstOpen: true,
        isFirstDisabled: false
    };
    userName:string;
    twoFactorEnabled:boolean;

    constructor(private _router:Router, private loginService:LoginService) {
        let userInfo:UserModel = JSON.parse(Config.getUserInfoToken());
        this.userName = userInfo.username;
        this.twoFactorEnabled = userInfo.twoFactorAuthEnabled;
    }

    logout() {
        this.loginService.logout();
        this._router.navigate(['/login']);
    }
}
