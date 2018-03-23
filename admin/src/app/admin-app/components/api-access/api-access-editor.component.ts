import {Component, EventEmitter, Output, Input, OnInit} from '@angular/core';
import {ApiAccessModel} from "./api-access.model";
import {ApiAccessService} from "./api-access.service";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {RoleService} from "../role-management/role.service";
import {Config} from "../../../shared/configs/general.config";
import {ActivatedRoute} from "@angular/router";
import { Location } from "@angular/common";
import "rxjs/add/operator/switchMap";

@Component({
  selector: 'api-access-editor',
  templateUrl: './api-access-editor.html',
})

export class ApiAccessEditorComponent implements OnInit {
  // objApiAccess: ApiAccessModel = new ApiAccessModel();
  apiAccessForm: FormGroup;
  isSubmitted: boolean = false;
  objRoleList = [];
  objSelectedRole: any[] = [];
  accessId:string;


  constructor(private location: Location, private _objService: ApiAccessService, private roleService: RoleService, private _formBuilder: FormBuilder ,private activatedRoute: ActivatedRoute) {
    activatedRoute.params.subscribe(param => this.accessId = param['id']);
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
            this.objSelectedRole = ["superadmin"];
            if (this.accessId)
              this.getAccessDetail();
          }
        },
        err=>this.errorMessage(err));
  }

  getAccessDetail() {
    this._objService.getAccessDetail(this.accessId)
      .subscribe(res =>{this.bindApiAccess(res)
          },
          error => this.errorMessage(error));
  }
  
  bindApiAccess(objApi:ApiAccessModel){
    this.objSelectedRole = (objApi.roleName).split(',')
    this.apiAccessForm.setValue({
    routeApi: objApi.routeApi,
    roleName: this.objSelectedRole,
    active:objApi.active
    })

  }

  saveApiAccess() {
    this.isSubmitted = true;
    if (this.apiAccessForm.valid) {
      let selectedRole: string = "";
      if (this.apiAccessForm.controls["roleName"].value) {
        selectedRole = this.apiAccessForm.controls["roleName"].value.join(", ");
        this.apiAccessForm.value.roleName = selectedRole;
      }
      if (!this.accessId) {
        this._objService.saveAccess(this.apiAccessForm.value)
          .subscribe(res => this.resStatusMessage(res),
            error =>this.errorMessage(error));
      }
      else {
        this._objService.updateAccess(this.apiAccessForm.value,this.accessId)
          .subscribe(res => this.resStatusMessage(res),
            error =>this.errorMessage(error));
      }
    }
  }

  resStatusMessage(res: any) {
    swal("Success !", res.message, "success");
    this.location.back();    
  }

  errorMessage(objResponse: any) {
    swal("Alert !", objResponse.message, "info");
  }

  triggerCancelForm() {
    this.location.back();
  }


}

