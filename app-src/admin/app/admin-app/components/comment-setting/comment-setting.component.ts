import {Component, OnInit} from '@angular/core';
import {CommentSettingService} from "./comment.service";
import {CommentSettingModel} from "./comment.model";
import {FormControlMessages} from "../../../shared/components/control-valdation-message.component";
import {AlertModel} from "../../../shared/models/alert.model";
import {Alert} from "../../../shared/components/alert/alert";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
@Component({
    selector: 'comment-setting',
    templateUrl: 'admin-templates/comment-setting/comment-setting.html',
    providers: [CommentSettingService],
    directives: [FormControlMessages, Alert]
})
export class CommentSettingComponent implements OnInit {
    objComment:CommentSettingModel = new CommentSettingModel();
    isSubmitted:boolean = false;
    objAlert:AlertModel = new AlertModel();
    commentSettingForm:FormGroup;
    isPost:boolean; // to detect the first data entry

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
        this.objComment = objRes;
    }


    saveCommentSetting() {
        this.isSubmitted = true;
        if (this.commentSettingForm.valid) {
            if (!this.objComment._id) {
                this.isPost = true;
                this._objService.saveCommentSettings(this.objComment)
                    .subscribe(res => this.resStatusMessage(res),
                        error => this.errorMessage(error));
            }
            else {
                this.isPost = false;
                this._objService.updateCommentSettings(this.objComment)
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
        if (this.isPost)
            this.getCommentSetting();
        this.objAlert.hideAlert();
        jQuery.jAlert({
            'title': 'Success',
            'content': res.message,
            'theme': 'green'
        });
    }

    errorMessage(objResponse:any) {
        this.objAlert.showAlert("danger", "Alert !!", objResponse.message, true);
    }


}

