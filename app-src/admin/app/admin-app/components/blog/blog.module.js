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
var blog_service_1 = require("./blog.service");
var blog_editor_component_1 = require("./blog-editor.component");
var blog_category_editor_component_1 = require("./blog-category-editor.component");
var blog_list_component_1 = require('./blog-list.component');
var blog_doc_list_component_1 = require('./blog-doc-list.component');
var blog_metatag_component_1 = require('./blog-metatag.component');
var shared_module_1 = require('../../../shared/shared.module');
var tag_input_module_1 = require('../../../shared/components/tag-input/tag-input.module');
var blog_doc_editor_component_1 = require('./blog-doc-editor.component');
var blog_component_1 = require("./blog.component");
var blog_category_list_component_1 = require('./blog-category-list.component');
var BlogModule = (function () {
    function BlogModule() {
    }
    BlogModule = __decorate([
        core_1.NgModule({
            imports: [shared_module_1.SharedModule, tag_input_module_1.RlTagInputModule,],
            declarations: [blog_editor_component_1.BlogEditorComponent,
                blog_editor_component_1.BlogEditorComponent,
                blog_category_editor_component_1.BlogCategoryEditorComponent,
                blog_list_component_1.BlogListComponent,
                blog_doc_editor_component_1.BlogDocEditorComponent,
                blog_doc_list_component_1.BlogDocListComponent,
                blog_category_list_component_1.BlogCategoryListComponent,
                blog_component_1.BlogManagementComponent,
                blog_metatag_component_1.BlogMetaTagEditorComponent,
            ],
            providers: [blog_service_1.BlogService]
        }), 
        __metadata('design:paramtypes', [])
    ], BlogModule);
    return BlogModule;
}());
exports.BlogModule = BlogModule;
//# sourceMappingURL=blog.module.js.map