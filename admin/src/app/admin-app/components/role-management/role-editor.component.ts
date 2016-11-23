import {Component, EventEmitter, Output, Input, OnInit} from '@angular/core';
import {RoleModel} from "./role.model";
import {RoleService} from "./role.service";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";

@Component({
    selector: 'role-editor',
    templateUrl: './role-editor.html'
})

export class RoleEditorComponent implements OnInit {
    objRole:RoleModel = new RoleModel();
    roleForm:FormGroup;
    isSubmitted:boolean = false;
    @Input() roleId:string;
    @Output() showListEvent:EventEmitter<any> = new EventEmitter();


    constructor(private _objService:RoleService, private _formBuilder:FormBuilder) {
        this.roleForm = this._formBuilder.group({
                "roleName": ['', Validators.required],
                "read": [''],
                "create": [''],
                "write": [''],
                "delete": [''],
                "change": [''],
                "active": ['']
            }
        );
    }

    ngOnInit() {
        if (this.roleId)
            this.getRoleDetail();
    }

    getRoleDetail() {
        this._objService.getRoleDetail(this.roleId)
            .subscribe(res => {
                    this.objRole = res;
                },
                error => this.errorMessage(error));
    }


    saveRole() {
        this.isSubmitted = true;
        if (this.roleForm.valid) {
            if (!this.roleId) {
                this._objService.saveRole(this.objRole)
                    .subscribe(res => this.resStatusMessage(res),
                        error =>this.errorMessage(error));
            }
            else {
                this._objService.updateRole(this.objRole)
                    .subscribe(res => this.resStatusMessage(res),
                        error =>this.errorMessage(error));
            }
        }
    }

    resStatusMessage(res:any) {
        this.showListEvent.emit(false); // * isCanceled = false
      swal("Success !", res.message, "success")

    }

    errorMessage(objResponse:any) {
      swal("Alert !", objResponse.message, "info");

    }

    triggerCancelForm() {
        let isCanceled = true;
        this.showListEvent.emit(isCanceled);
    }


}

