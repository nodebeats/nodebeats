import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { UserService } from "./user.service";
import { UserModel, UserResponse } from "./user.model";
import { RoleModel } from "../role-management/role.model";
import { RoleService } from "../role-management/role.service";
import { Router } from '@angular/router';
import { MatPaginator, MatTableDataSource, MatSelectModule } from '@angular/material';

@Component({
    selector: 'admin-user',
    templateUrl: './user-list.html'
})

export class UserListComponent implements OnInit {

    displayedColumns = ['SN', 'First Name', 'Last Name', 'User Name', '2FA Enabled', 'Role', 'Actions'];    
    dataSource: any;    
    userId: string;
    objResponse: UserResponse;
    objRoleList: RoleModel[] = [];
    
    /* Pagination */
    pageSizeOptions = [5, 10, 25, 50, 100];
    perPage:number = 10;
    currentPage:number = 1;
    totalItems:number = 1;
    preIndex:number = 0;
    /* End Pagination */


    constructor(private router: Router, private _Service:UserService, private roleService:RoleService) {
    }

    ngOnInit() {
        this.getRoleList();
        this.getUserList();
    }

    getRoleList() {
        this.roleService.getRoleList(true) /*get active role*/
            .subscribe(objRes => this.objRoleList = objRes,
                err=>this.errorMessage(err));
    }

    getUserList() {
        this._Service.getUserList(this.perPage, this.currentPage)
            .subscribe(resUser =>this.bindList(resUser),
                error => this.errorMessage(error));
    }

    errorMessage(objResponse:any) {
        Swal("Alert !", objResponse, "info");
    }

    bindList(objRes:UserResponse) {
        this.objResponse = objRes;
        this.dataSource = new MatTableDataSource(this.objResponse.dataList);           
        this.totalItems = objRes.totalItems;
        this.preIndex = (this.perPage * (this.currentPage - 1));
    }

    addUser() {
        this.router.navigate(['/user-management/editor']);
    }

    manage(userId: number) {
        this.router.navigate(['/user-management/manage', userId]);
    }

    showUserDetail(userId:string) {
        this.router.navigate(['/user-management/detail', userId]);
    }

    editUser(userId:string) {
        this.router.navigate(['/user-management/editor', userId]);
    }

    pageChanged(event: any) {
        this.perPage = event.pageSize;
        this.currentPage = event.pageIndex + 1;
        this.getUserList();
    }
    
    roleFilter(args: any) {
        let role = (<HTMLSelectElement>args).value;
        this.currentPage = 1;
        this._Service.getUserList(this.perPage, this.currentPage, role)
            .subscribe(res => this.bindList(res),
                error => this.errorMessage(error));
    }
}

