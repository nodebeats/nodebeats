import { UserService } from './user.service';
import { ActivatedRoute } from '@angular/router';
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
    objUser :UserModel;
    userId:string;
    navLinks: any[];
    
    constructor(private activatedRoute: ActivatedRoute, private userService: UserService) {
        activatedRoute.params.subscribe(param => this.userId = param['userId']);
        this.navLinks = [{label:'Security', path: '/user-management/manage/'+this.userId+'/security'}, {label: 'Password', path: '/user-management/manage/'+this.userId+'/password'}];
    }

    ngOnInit() {
        this.getUserDetail();
    }

    getUserDetail(){
        this.userService.getUserDetail(this.userId)
            .subscribe(res => {
                this.objUser = res;
            });
    }

}

