import {Component, EventEmitter, Output, Input, OnInit} from '@angular/core';
import {ApiAccessModel} from "./api-access.model";
import {ApiAccessService} from "./api-access.service";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {RoleService} from "../role-management/role.service";
import {RoleModel} from "../role-management/role.model";

@Component({
  selector: 'api-access-editor',
  templateUrl: '../../views/api-access/api-access-editor.html'
})

export class ApiAccessEditorComponent implements OnInit {
  objApiAccess:ApiAccessModel = new ApiAccessModel();
  apiAccessForm:FormGroup;
  isSubmitted:boolean = false;
  objRoleList = [];
  objSelectedRole:any = null;
  @Input() accessId:string;
  @Output() showListEvent:EventEmitter<any> = new EventEmitter();


  constructor(private _objService:ApiAccessService, private roleService:RoleService, private _formBuilder:FormBuilder) {
    this.apiAccessForm = this._formBuilder.group({
        "routeApi": ['', Validators.required],
        "roleName": ['', Validators.required],
        "active": ['']
      }
    );
    this.objRoleList = [];
  }

  ngOnInit() {
    this.getRoleList();
  }

  getRoleList() {
    this.roleService.getRoleList(true) /*get active role*/
      .subscribe(objResList => {
          let roles = [];
          if (objResList.length > 0) {
            roles = objResList.map(function (objRole) {
              return {label: objRole.roleName, value: objRole.roleName};
              //return objRole.roleName;
            });
            this.objRoleList = roles;
            if (this.accessId)
              this.getAccessDetail();
          }
        },
        err=>this.errorMessage(err));
  }

  getAccessDetail() {
    this._objService.getAccessDetail(this.accessId)
      .subscribe(res => {
          this.objApiAccess = res;
          this.objSelectedRole = (res.roleName).split(',');
        },
        error => this.errorMessage(error));
  }

  saveApiAccess() {
    this.isSubmitted = true;
    if (this.apiAccessForm.valid) {
      let selectedRole:string = "";
      let objAccessSave = new ApiAccessModel();
      objAccessSave = this.objApiAccess;
      if (this.apiAccessForm.controls["roleName"].value) {
        selectedRole = this.apiAccessForm.controls["roleName"].value.join(",");
        objAccessSave.roleName = selectedRole;
      }
      if (!this.accessId) {
        this._objService.saveAccess(objAccessSave)
          .subscribe(res => this.resStatusMessage(res),
            error =>this.errorMessage(error));
      }
      else {
        this._objService.updateAccess(objAccessSave)
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

