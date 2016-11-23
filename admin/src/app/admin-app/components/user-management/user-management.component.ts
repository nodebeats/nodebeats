/**
 * Created by sanedev on 6/27/16.
 */

import{Component, Output, EventEmitter, Input, OnInit}from'@angular/core';

import {UserModel} from './user.model';
@Component({
    selector: 'user-management',
    templateUrl: './user-management.html',
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

