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
var NewsManagementComponent = (function () {
    function NewsManagementComponent() {
        this.isCatList = true;
        this.isNewsList = false;
        this.isImageList = false;
        this.isCanceled = false;
        this.showForm = false;
    }
    NewsManagementComponent.prototype.showCategoryList = function (args) {
        this.hideAll();
        this.isCatList = true;
        this.isCanceled = args;
    };
    NewsManagementComponent.prototype.showNewsList = function (args) {
        this.hideAll();
        this.isNewsList = true;
        this.isCanceled = args;
    };
    NewsManagementComponent.prototype.showImageList = function (args) {
        this.hideAll();
        this.isImageList = true;
        this.id = args;
    };
    NewsManagementComponent.prototype.hideAll = function () {
        this.isCatList = false;
        this.isNewsList = false;
        this.isImageList = false;
    };
    NewsManagementComponent.prototype.tabSwitch = function (args) {
        if (1 == args.index) {
            this.hideAll();
            this.isNewsList = true;
        }
        else {
            this.hideAll();
            this.isCatList = true;
        }
    };
    NewsManagementComponent = __decorate([
        core_1.Component({
            selector: 'news-management',
            templateUrl: 'admin-templates/news/news-management.html'
        }), 
        __metadata('design:paramtypes', [])
    ], NewsManagementComponent);
    return NewsManagementComponent;
}());
exports.NewsManagementComponent = NewsManagementComponent;
//# sourceMappingURL=news-management.component.js.map