import Swal from 'sweetalert2';
import {Component, OnInit} from '@angular/core';
import {CommentSettingService} from "./comment.service";
import {CommentSettingModel} from "./comment.model";
import {AlertModel} from "../../../shared/models/alert.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
@Component({
    selector: 'comment-setting',
    templateUrl: './comment-setting.html'
})
export class CommentSettingComponent implements OnInit {
    isSubmitted:boolean = false;
    objAlert:AlertModel = new AlertModel();
    commentSettingForm:FormGroup;
    isPost:boolean; // to detect the first data entry
    commentId: string;

    constructor(private _objService:CommentSettingService, private _formBuilder:FormBuilder) {
        this.commentSettingForm = this._formBuilder.group({
            "disqusUsername": [''],
            "disqusURL": ['', Validators.required],
            "disqusApiKey": ['']
        });
    }

    ngOnInit() {
        this.getCommentSetting();
    }

    getCommentSetting() {
        this._objService.getCommentSettings()
            .subscribe(res =>this.bindInfo(res),
                error => this.errorMessage(error));
    }

    bindInfo(objRes:CommentSettingModel) {
        // this.objComment = objRes;
        this.commentId =objRes._id;
        this.commentSettingForm.patchValue({
            disqusUsername: objRes.disqusUsername,
            disqusURL:objRes.disqusURL,
            disqusApiKey: objRes.disqusApiKey
        });
    }


    saveCommentSetting() {
        this.isSubmitted = true;
        if (this.commentSettingForm.valid) {
            if (!this.commentId) {
                this.isPost = true;
                this._objService.saveCommentSettings(this.commentSettingForm.value)
                    .subscribe(res => this.resStatusMessage(res),
                        error => this.errorMessage(error));
            }
            else {
                this.isPost = false;
                this._objService.updateCommentSettings(this.commentSettingForm.value, this.commentId)
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
        if (this.isPost)
            this.getCommentSetting();
        this.objAlert.hideAlert();
        Swal("Success !", res.message, "success")
    }

    errorMessage(objResponse:any) {
        this.objAlert.showAlert("danger", "Alert !!", objResponse, true);
    }
}

