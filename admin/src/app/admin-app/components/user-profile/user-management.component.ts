/**
 * Created by sanedev on 6/27/16.
 */
import{Component, Output, EventEmitter, Input, OnInit}from'@angular/core';

import {UserModel} from '../user-management/user.model';
import {Config} from "../../../shared/configs/general.config";
@Component({
    selector: 'user-management',
    templateUrl: './user-management.html'
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

