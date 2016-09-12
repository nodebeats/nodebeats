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
var control_valdation_message_component_1 = require("../../../shared/components/control-valdation-message.component");
var news_model_1 = require("./news.model");
var news_service_1 = require("./news.service");
var forms_1 = require("@angular/forms");
var NewsCategoryEditorComponent = (function () {
    function NewsCategoryEditorComponent(_objService, _formBuilder) {
        this._objService = _objService;
        this._formBuilder = _formBuilder;
        this.objNewsCat = new news_model_1.NewsCategoryModel();
        this.isValidImage = true;
        this.isSubmitted = false;
        this.showListEvent = new core_1.EventEmitter();
        this.newsCategoryForm = this._formBuilder.group({
            "newsCategory": ['', forms_1.Validators.required],
            "newsCategoryDescription": ['', forms_1.Validators.required],
            "active": ['']
        });
    }
    NewsCategoryEditorComponent.prototype.ngOnInit = function () {
        if (this.newsCategoryId)
            this.getNewsCategoryDetail();
    };
    NewsCategoryEditorComponent.prototype.getNewsCategoryDetail = function () {
        var _this = this;
        this._objService.getNewsCategoryDetail(this.newsCategoryId)
            .subscribe(function (res) {
            _this.objNewsCat = res;
        }, function (error) { return _this.errorMessage(error); });
    };
    NewsCategoryEditorComponent.prototype.saveNewsCategory = function () {
        var _this = this;
        this.isSubmitted = true;
        if (this.newsCategoryForm.valid) {
            if (!this.newsCategoryId) {
                this._objService.saveNewsCategory(this.objNewsCat)
                    .subscribe(function (res) { return _this.resStatusMessage(res); }, function (error) { return _this.errorMessage(error); });
            }
            else {
                this._objService.updateNewsCategory(this.objNewsCat)
                    .subscribe(function (res) { return _this.resStatusMessage(res); }, function (error) { return _this.errorMessage(error); });
            }
        }
    };
    NewsCategoryEditorComponent.prototype.resStatusMessage = function (res) {
        this.showListEvent.emit(false); // * isCanceled = false
        jQuery.jAlert({
            'title': 'Success',
            'content': res.message,
            'theme': 'green'
        });
    };
    NewsCategoryEditorComponent.prototype.errorMessage = function (objResponse) {
        jQuery.jAlert({
            'title': 'Alert',
            'content': objResponse.message,
            'theme': 'red'
        });
    };
    NewsCategoryEditorComponent.prototype.triggerCancelForm = function () {
        var isCanceled = true;
        this.showListEvent.emit(isCanceled);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], NewsCategoryEditorComponent.prototype, "newsCategoryId", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], NewsCategoryEditorComponent.prototype, "showListEvent", void 0);
    NewsCategoryEditorComponent = __decorate([
        core_1.Component({
            selector: 'news-category-editor',
            templateUrl: 'admin-templates/news/news-category-editor.html',
            directives: [control_valdation_message_component_1.FormControlMessages]
        }), 
        __metadata('design:paramtypes', [news_service_1.NewsService, forms_1.FormBuilder])
    ], NewsCategoryEditorComponent);
    return NewsCategoryEditorComponent;
}());
exports.NewsCategoryEditorComponent = NewsCategoryEditorComponent;
//# sourceMappingURL=news-category-editor.component.js.map