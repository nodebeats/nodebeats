/**
 * Created by sanedev on 6/27/16.
 */
// import {TAB_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import {TabView, TabPanel} from 'primeng/primeng';
import{Component, Output, EventEmitter, Input, OnInit}from'@angular/core';
import {UserService} from "../user-management/user.service";
import {UserSecurityUpdateComponent} from '../user-management/user-security-question.component';
import {UserPasswordUpdateComponent} from '../user-management/user-password-update.component';
import {UserSettingComponent} from '../user-management/user-setting.component';
import {UserModel} from '../user-management/user.model';
import {UserProfileComponent} from "./user-profile.component";
import {Config} from "../../../shared/configs/general.config";
@Component({
    selector: 'user-management',
    templateUrl: 'admin-templates/user-profile/user-management.html',
    providers: [UserService],
    directives: [TabView, TabPanel, UserProfileComponent, UserSettingComponent, UserSecurityUpdateComponent, UserPasswordUpdateComponent]
})
export class UserProfileManagementComponent implements OnInit {
    @Output() showListEvent:EventEmitter<any> = new EventEmitter();
    @Input() hideCancel:boolean;
    userId:string;
    showView:boolean = true;
    tfaEnabled:boolean = false;

    constructor() {
        let userInfo:UserModel = JSON.parse(Config.getUserInfoToken());
        this.userId = userInfo._id;
        this.tfaEnabled = userInfo.twoFactorAuthEnabled;
    }

    ngOnInit() {
    }

    onShowView(args) {
        this.showListEvent.emit(args);
    }

    public tabSwitch(args) {
        if (0 == args.index) {
            this.showView = true;
        }
    }

}

