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
var news_category_editor_component_1 = require("./news-category-editor.component");
var news_category_list_component_1 = require("./news-category-list.component");
var news_editor_component_1 = require("./news-editor.component");
var news_list_component_1 = require("./news-list.component");
var news_image_editor_component_1 = require("./news-image-editor.component");
var news_image_list_component_1 = require("./news-image-list.component");
var news_service_1 = require('./news.service');
var shared_module_1 = require('../../../shared/shared.module');
var news_management_component_1 = require("./news-management.component");
var NewsModule = (function () {
    function NewsModule() {
    }
    NewsModule = __decorate([
        core_1.NgModule({
            imports: [shared_module_1.SharedModule],
            declarations: [news_image_list_component_1.NewsImageListComponent,
                news_image_editor_component_1.NewsImageEditorComponent,
                news_management_component_1.NewsManagementComponent,
                news_list_component_1.NewsListComponent,
                news_editor_component_1.NewsEditorComponent,
                news_category_list_component_1.NewsCategoryListComponent,
                news_category_editor_component_1.NewsCategoryEditorComponent
            ],
            providers: [news_service_1.NewsService]
        }), 
        __metadata('design:paramtypes', [])
    ], NewsModule);
    return NewsModule;
}());
exports.NewsModule = NewsModule;
//# sourceMappingURL=news.module.js.map