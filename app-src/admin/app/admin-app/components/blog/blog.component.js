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
/**
 * Created by sanedev on 6/27/16.
 */
// import {TAB_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
var primeng_1 = require('primeng/primeng');
var core_1 = require('@angular/core');
var blog_service_1 = require("./blog.service");
var blog_category_list_component_1 = require('./blog-category-list.component');
var blog_list_component_1 = require('./blog-list.component');
var blog_doc_list_component_1 = require('./blog-doc-list.component');
var blog_metatag_component_1 = require('./blog-metatag.component');
var BlogManagementComponent = (function () {
    function BlogManagementComponent() {
        this.isCatList = true;
        this.isBlogList = false;
        this.isDocList = false;
        this.isMetaForm = false;
        this.isCanceled = false;
    }
    BlogManagementComponent.prototype.showBlogList = function (args) {
        this.hideAll();
        this.isBlogList = true;
        this.isCanceled = args;
    };
    BlogManagementComponent.prototype.showDocList = function (args) {
        this.hideAll();
        this.isDocList = true;
        this.id = args;
    };
    BlogManagementComponent.prototype.showMetaForm = function (args) {
        this.hideAll();
        this.isMetaForm = true;
        this.id = args;
    };
    BlogManagementComponent.prototype.hideAll = function () {
        this.isCatList = false;
        this.isDocList = false;
        this.isBlogList = false;
        this.isMetaForm = false;
    };
    BlogManagementComponent.prototype.tabSwitch = function (args) {
        //  if (args.active) {
        if (1 == args.index) {
            this.hideAll();
            this.isBlogList = true;
        }
        else {
            this.hideAll();
            this.isCatList = true;
        }
    };
    BlogManagementComponent = __decorate([
        core_1.Component({
            selector: 'blog-management',
            templateUrl: 'admin-templates/blog/blog-management.html',
            providers: [blog_service_1.BlogService],
            directives: [primeng_1.TabView, primeng_1.TabPanel, blog_category_list_component_1.BlogCategoryListComponent, blog_list_component_1.BlogListComponent, blog_metatag_component_1.BlogMetaTagEditorComponent, blog_doc_list_component_1.BlogDocListComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], BlogManagementComponent);
    return BlogManagementComponent;
}());
exports.BlogManagementComponent = BlogManagementComponent;
//# sourceMappingURL=blog.component.js.map