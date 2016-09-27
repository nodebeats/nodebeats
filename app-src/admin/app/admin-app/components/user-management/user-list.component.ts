import {Component, ElementRef, OnInit} from '@angular/core';
import {UserService} from "./user.service";
import {UserModel, UserResponse} from "./user.model";
import {UserRegistrationComponent} from "./user-registration.component";
import {UserManagementComponent} from './user-management.component';
import {UserViewComponent} from "./user-view.component";
import {UserEditComponent} from "./user-edit.component";
import {Paginator} from 'primeng/primeng';
@Component({
    selector: 'admin-user',
    templateUrl: 'admin-templates/user-management/user-list.html'
})

export class UserListComponent implements OnInit {

    objUser:UserModel = new UserModel();
    error:any;
    showForm:boolean = false;
    isEdit:boolean = false;
    showInfo:boolean = false;
    changePassword:boolean = false;
    showManage:boolean = false;
    userId:string;
    objResponse:UserResponse;
    name:string;
    /* Pagination */
    perPage:number = 10;
    currentPage:number = 1;
    totalPage:number = 1;
    nextPage:number = 1;
    preIndex:number = 0;

    /* End Pagination */

    ngOnInit() {
        this.perPage = 10;
        this.currentPage = 1;
        this.getUserList();
    }

    constructor(private _objUserService:UserService) {
    }

    getUserList() {
        this._objUserService.getUserList(this.perPage, this.currentPage)
            .subscribe(resUser =>this.bindList(resUser),
                error => this.errorMessage(error));
    }

    errorMessage(objResponse:any) {
        jQuery.jAlert({
            'title': 'Alert',
            'content': objResponse.message,
            'theme': 'red'
        });
    }

    bindList(objRes:UserResponse) {
        this.objResponse = objRes;
        this.preIndex = (this.perPage * (this.currentPage - 1));

        if (objRes.dataList.length > 0) {
            let totalPage = objRes.totalItems / this.perPage;
            this.totalPage = totalPage > 1 ? Math.ceil(totalPage) : 1;

            setTimeout(()=> {
                jQuery('.tablesorter').tablesorter({
                    headers: {
                        5: {sorter: false},
                        7: {sorter: false}
                    }
                });
            }, 50);
        }
    }

    addUser() {
        this.hideAll();
        this.objUser = null;
        this.userId = null;
        this.showForm = true;
    }

    getForm() {
        this.hideAll();
        this.showForm = true
    }

// updatePassword(userId:string) {
//     this.hideAll();
//     this.changePassword = true;
//     this.userId = userId;
// }

    manage(indexOfUser:number) {
        this.hideAll();
        this.showManage = true;
        this.objUser = this.objResponse.dataList[indexOfUser];
    }

    showUserDetail(userId:string) {
        this.hideAll();
        this.userId = userId;
        this.showInfo = true;
    }

    handleList(args) {
        if (!args)// not isCancel
            this.getUserList();
        this.hideAll();

    }

    handleFormCancel(arg) {
        this.showForm = false;
        //   this.isEdit = false;
    }

    handleSaveSuccess(arg) {
        this.clearAll();
        this.getUserList();
        this.hideAll();
        //   this.isEdit = false;
    }

    handleEdit(arg) {
        this.userId = arg.userId;
        this.hideAll();
        this.isEdit = arg.isEdit;
        //  this.showForm = arg.showForm;
    }

    editUser(userId:string) {
        this.hideAll();
        // this.showForm = true;
        this.isEdit = true;
        this.userId = userId;
    }


    pageChanged(event) {
        this.perPage = event.rows;
        this.currentPage = (Math.floor(event.first / event.rows)) + 1;
        this.getUserList();
        jQuery(".tablesorter").trigger("update");
    }

    hideAll() {
        this.showManage = false;
        this.showForm = false;
        this.showInfo = false;
        this.isEdit = false;
        this.changePassword = false;
    }

    clearAll() {
        this.currentPage = 1;
        this.objUser = null;

    }
}

