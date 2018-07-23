import Swal from 'sweetalert2';
import {Component, OnInit} from '@angular/core';
import {CloudinaryService} from "./cloudinary.service";
import {CloudinaryModel, CloudinaryResponse} from "./cloudinary.model";
import {AlertModel} from "../../../shared/models/alert.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Config} from "../../../shared/configs/general.config";

@Component({
    selector: 'cloudinary-settings',
    templateUrl: './cloudinary.html'
})
export class CloudinarySettingComponent implements OnInit {
    isSubmitted:boolean = false;
    id: string = '';
    objAlert:AlertModel = new AlertModel();
    cloudinaryForm:FormGroup;
    isPost:boolean; // to detect the first data entry
    swalMessage: any;

    constructor(private _objService:CloudinaryService, private _formBuilder:FormBuilder) {
        this.cloudinaryForm = this._formBuilder.group({
            cloudinaryCloudName: ['', Validators.required],
            cloudinaryApiKey: ['', Validators.required],
            cloudinaryApiSecret: ['', Validators.required]
        });
    }
    
    ngOnInit() {
        this.getCloudinarySetting();
    }
  
    getCloudinarySetting() {
        this._objService.getCloudinarySettings()
            .subscribe(res =>this.bindInfo(res),
                error => this.errorMessage(error));
    }

    bindInfo(objRes:CloudinaryModel) {
        if(objRes._id)
            this.id = objRes._id;
        this.cloudinaryForm.setValue({
            cloudinaryCloudName : objRes.cloudinaryCloudName,
            cloudinaryApiKey : objRes.cloudinaryApiKey,
            cloudinaryApiSecret: objRes.cloudinaryApiSecret
         });
    }


    saveCloudinarySetting() {
        this.isSubmitted = true;
        if (this.cloudinaryForm.valid) {
            if (!this.id) {
                this.isPost = true;
                this._objService.saveCloudinarySettings(this.cloudinaryForm.value)
                    .subscribe(res => this.resStatusMessage(res),
                        error => this.errorMessage(error));
            }
            else {
                this.isPost = false;
                this._objService.updateCloudinarySettings(this.cloudinaryForm.value, this.id)
                    .subscribe(res => this.resStatusMessage(res),
                        error => this.errorMessage(error));
            }
        }
        else {
            this.objAlert.showAlert("danger", "Alert !!", "Please fill all the mandatory field", true);
        }
    }

    closeAlert(event: any) {
        this.objAlert.hideAlert();
    }

    resStatusMessage(res:any) {
        this.swalMessage = res.message;
        let cloudValues = this.cloudinaryForm.value;
        Config.setCloudinary(cloudValues.cloudinaryCloudName, cloudValues.cloudinaryApiKey, cloudValues.cloudinaryApiSecret);
        if (this.isPost)
            this.getCloudinarySetting();
        this.objAlert.hideAlert();
        Swal("Success !", this.swalMessage, "success")
    }

    errorMessage(objResponse:CloudinaryResponse) {
        this.swalMessage = objResponse;
        this.objAlert.showAlert("danger", "Alert !!", this.swalMessage, true);
    }
}
    

