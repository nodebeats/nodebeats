import {Component, OnInit} from '@angular/core';
import {CloudinaryService} from "./cloudinary.service";
import {CloudinaryModel, CloudinaryResponse} from "./cloudinary.model";
import {FormControlMessages} from "../../../shared/components/control-valdation-message.component";
import {AlertModel} from "../../../shared/models/alert.model";
import {Alert} from "../../../shared/components/alert/alert";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Config} from "../../../shared/configs/general.config";
@Component({
    selector: 'cloudinary-settings',
    templateUrl: 'admin-templates/cloudinary/cloudinary.html',
    providers: [CloudinaryService],
    directives: [FormControlMessages, Alert]
})
export class CloudinarySettingComponent implements OnInit {
    objCloudinary:CloudinaryModel = new CloudinaryModel();
    isSubmitted:boolean = false;
    objAlert:AlertModel = new AlertModel();
    cloudinaryForm:FormGroup;
    isPost:boolean; // to detect the first data entry

    constructor(private _objService:CloudinaryService, private _formBuilder:FormBuilder) {
        this.cloudinaryForm = this._formBuilder.group({
            "cloudinaryCloudName": ['', Validators.required],
            "cloudinaryApiKey": ['', Validators.required],
            "cloudinaryApiSecret": ['', Validators.required]
        });
    }

    ngOnInit() {
        this.getClouindarySetting();
    }

    getClouindarySetting() {
        this._objService.getCloudinarySettings()
            .subscribe(res =>this.bindInfo(res),
                error => this.errorMessage(error));
    }

    bindInfo(objRes:CloudinaryModel) {
        this.objCloudinary = objRes;
    }


    saveCloudinarySetting() {
        this.isSubmitted = true;
        if (this.cloudinaryForm.valid) {
            if (!this.objCloudinary._id) {
                this.isPost = true;
                this._objService.saveCloudinarySettings(this.objCloudinary)
                    .subscribe(res => this.resStatusMessage(res),
                        error => this.errorMessage(error));
            }
            else {
                this.isPost = false;
                this._objService.updateCloudinarySettings(this.objCloudinary)
                    .subscribe(res => this.resStatusMessage(res),
                        error => this.errorMessage(error));
            }
        }
        else {
            this.objAlert.showAlert("danger", "Alert !!", "Please fill all the mandatory field", true);
        }
    }

    closeAlert(event) {
        this.objAlert.hideAlert();
    }

    resStatusMessage(res:any) {
        Config.setCloudinary(this.objCloudinary.cloudinaryCloudName);
        if (this.isPost)
            this.getClouindarySetting();
        this.objAlert.hideAlert();
        jQuery.jAlert({
            'title': 'Success',
            'content': res.message,
            'theme': 'green'
        });
    }

    errorMessage(objResponse:CloudinaryResponse) {
        this.objAlert.showAlert("danger", "Alert !!", objResponse.message, true);
    }

    triggerCancelForm() {
        let isEdit = false;
        //this.editCancelEvent.emit(false);
    }


}

