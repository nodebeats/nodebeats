import {Component, EventEmitter, Output, Input, OnInit} from '@angular/core';
import {RoleModel} from "./role.model";
import {RoleService} from "./role.service";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import Swal from 'sweetalert2';

@Component({
    selector: 'role-editor',
    templateUrl: './role-editor.html',
    styleUrls: ['./role-management.scss']
})

export class RoleEditorComponent implements OnInit {
    // objRole:RoleModel = new RoleModel();
    roleForm:FormGroup;
    isSubmitted:boolean = false;
    roleId:string;

    constructor(private router: Router, private _objService:RoleService, private _formBuilder:FormBuilder, private location: Location, private activatedRoute: ActivatedRoute) {
       activatedRoute.params.subscribe(param => this.roleId = param['roleId']);
        this.roleForm = this._formBuilder.group({
                "roleName": ['', Validators.required],
                "read": [''],
                "create": [false],
                "write": [false],
                "delete": [false],
                "change": [false],
                "active": [false]
            }
        );
    }

    ngOnInit() {
        if (this.roleId)
            this.getRoleDetail();
    }

    getRoleDetail() {
        this._objService.getRoleDetail(this.roleId)
            .subscribe(res =>this.bindRole(res),
                error => this.errorMessage(error));
    }
    bindRole(objRole:RoleModel){
        this.roleForm.setValue({
            roleName:objRole.roleName,
            read: objRole.read,
            create:objRole.create,
            write: objRole.write,
            delete: objRole.delete,
            change: objRole.change,
            active: objRole.active
        });
    }


    saveRole() {
        this.isSubmitted = true;
        if (this.roleForm.valid) {
            if (!this.roleId) {
                this._objService.saveRole(this.roleForm.value)
                    .subscribe(res => this.resStatusMessage(res),
                        error =>this.errorMessage(error));
            }
            else {
                this._objService.updateRole(this.roleForm.value,this.roleId)
                    .subscribe(res => this.resStatusMessage(res),
                        error =>this.errorMessage(error));
            }
        }
    }

    resStatusMessage(res:any) {
        this.triggerCancelForm();
        Swal("Success !", res.message, "success")
    }

    errorMessage(objResponse:any) {
        Swal("Alert !", objResponse, "info");
    }

    triggerCancelForm() {
        this.router.navigate(['/role']);
    }
}

