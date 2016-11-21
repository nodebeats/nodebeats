/**
 * Created by sanedev on 6/27/16.
 */
// import {TAB_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import {TabView, TabPanel} from 'primeng/primeng';

import{Component, Output, EventEmitter, Input, OnInit}from'@angular/core';
import {UserService} from "./user.service";
import {UserSecurityUpdateComponent} from './user-security-question.component';
import {UserPasswordUpdateComponent} from './user-password-update.component';
import {UserSettingComponent} from './user-setting.component';
import {UserModel} from './user.model';
@Component({
    selector: 'user-management',
    templateUrl: '../../views/user-management/user-management.html',
})
export class UserManagementComponent implements OnInit {
    @Output() showListEvent:EventEmitter<any> = new EventEmitter();
    @Input('userInfo') objUser :UserModel = new UserModel();
    userId:string;
    constructor() {
    }

    ngOnInit() {
        this.userId = this.objUser._id;        
    }

    onShowList(args) {
        this.showListEvent.emit(args);
    }

    public tabSwitch(args) {
        if (args.active) {

        }
    }

}

