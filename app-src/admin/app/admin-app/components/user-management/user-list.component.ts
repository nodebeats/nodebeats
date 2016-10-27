import {Component, OnInit} from '@angular/core';
import {UserService} from "./user.service";
import {UserModel, UserResponse} from "./user.model";
import {RoleModel} from "../role-management/role.model";
import {RoleService} from "../role-management/role.service";
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
    objRoleList:RoleModel[] = [];
    name:string;
    /* Pagination */
    perPage:number = 10;
    currentPage:number = 1;
    totalPage:number = 1;
    first:number = 0;
    bindSort:boolean = false;
    preIndex:number = 0;

    /* End Pagination */
    constructor(private _objUserService:UserService, private roleService:RoleService) {
    }

    ngOnInit() {
        this.perPage = 10;
        this.currentPage = 1;
        this.getRoleList();
        this.getUserList();
    }

    getRoleList() {
        this.roleService.getRoleList(true) /*get active role*/
            .subscribe(objRes => this.objRoleList = objRes,
                err=>this.errorMessage(err));
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
            if (!this.bindSort) {
                this.bindSort = true;
                this.sortTable();
            }
            else
                jQuery("table").trigger("update", [true]);
        }
    }

    sortTable() {
        setTimeout(()=> {
            jQuery('.tablesorter').tablesorter({
                headers: {
                    5: {sorter: false},
                    7: {sorter: false}
                }
            });
        }, 50);
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
        {
            this.getUserList();
        }
        this.sortTable();
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
        this.first = event.first;
        if (event.first == 0)
            this.first = 1;
        this.getUserList();
    }

    roleFilter(args) {
        let role = (<HTMLSelectElement>args.srcElement).value;
        this.currentPage = 1;
        this._objUserService.getUserList(this.perPage, this.currentPage, role)
            .subscribe(res => this.bindList(res),
                error=>this.errorMessage(error));
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

