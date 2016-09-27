"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var comment_service_1 = require("./comment.service");
var comment_model_1 = require("./comment.model");
var alert_model_1 = require("../../../shared/models/alert.model");
var forms_1 = require("@angular/forms");
var CommentSettingComponent = (function () {
    function CommentSettingComponent(_objService, _formBuilder) {
        this._objService = _objService;
        this._formBuilder = _formBuilder;
        this.objComment = new comment_model_1.CommentSettingModel();
        this.isSubmitted = false;
        this.objAlert = new alert_model_1.AlertModel();
        this.commentSettingForm = this._formBuilder.group({
            "disqusUsername": [''],
            "disqusURL": ['', forms_1.Validators.required],
            "disqusApiKey": ['']
        });
    }
    CommentSettingComponent.prototype.ngOnInit = function () {
        this.getCommentSetting();
    };
    CommentSettingComponent.prototype.getCommentSetting = function () {
        var _this = this;
        this._objService.getCommentSettings()
            .subscribe(function (res) { return _this.bindInfo(res); }, function (error) { return _this.errorMessage(error); });
    };
    CommentSettingComponent.prototype.bindInfo = function (objRes) {
        this.objComment = objRes;
    };
    CommentSettingComponent.prototype.saveCommentSetting = function () {
        var _this = this;
        this.isSubmitted = true;
        if (this.commentSettingForm.valid) {
            if (!this.objComment._id) {
                this.isPost = true;
                this._objService.saveCommentSettings(this.objComment)
                    .subscribe(function (res) { return _this.resStatusMessage(res); }, function (error) { return _this.errorMessage(error); });
            }
            else {
                this.isPost = false;
                this._objService.updateCommentSettings(this.objComment)
                    .subscribe(function (res) { return _this.resStatusMessage(res); }, function (error) { return _this.errorMessage(error); });
            }
        }
        else {
            this.objAlert.showAlert("danger", "Alert !!", "Please fill all the mandatory field", true);
        }
    };
    CommentSettingComponent.prototype.closeAlert = function (event) {
        this.objAlert.hideAlert();
    };
    CommentSettingComponent.prototype.resStatusMessage = function (res) {
        if (this.isPost)
            this.getCommentSetting();
        this.objAlert.hideAlert();
        jQuery.jAlert({
            'title': 'Success',
            'content': res.message,
            'theme': 'green'
        });
    };
    CommentSettingComponent.prototype.errorMessage = function (objResponse) {
        this.objAlert.showAlert("danger", "Alert !!", objResponse.message, true);
    };
    CommentSettingComponent = __decorate([
        core_1.Component({
            selector: 'comment-setting',
            templateUrl: 'admin-templates/comment-setting/comment-setting.html'
        }), 
        __metadata('design:paramtypes', [comment_service_1.CommentSettingService, forms_1.FormBuilder])
    ], CommentSettingComponent);
    return CommentSettingComponent;
}());
exports.CommentSettingComponent = CommentSettingComponent;
//# sourceMappingURL=comment-setting.component.js.map