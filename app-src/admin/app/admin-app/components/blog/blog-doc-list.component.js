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
// import {Pagination} from 'fuel-ui/fuel-ui';
var blog_doc_editor_component_1 = require("./blog-doc-editor.component");
var BlogDocListComponent = (function () {
    /* Pagination */
    // perPage:number = 10;
    // currentPage:number = 1;
    // totalPage:number = 1;
    // nextPage:number = 1;
    /* End Pagination */
    function BlogDocListComponent(_objService) {
        this._objService = _objService;
        this.showBlogListEvent = new core_1.EventEmitter();
        this.showForm = false;
    }
    BlogDocListComponent.prototype.ngOnInit = function () {
        this.getBlogDocList();
    };
    BlogDocListComponent.prototype.getBlogDocList = function () {
        var _this = this;
        this._objService.getBlogDocList(this.blogId)
            .subscribe(function (objRes) { return _this.bindList(objRes); }, function (error) { return _this.errorMessage(error); });
    };
    BlogDocListComponent.prototype.errorMessage = function (objResponse) {
        jQuery.jAlert({
            'title': 'Alert',
            'content': objResponse.message,
            'theme': 'red'
        });
    };
    BlogDocListComponent.prototype.bindList = function (objRes) {
        this.objListResponse = objRes;
        if (objRes.length > 0) {
            setTimeout(function () {
                jQuery('.tablesorter').tablesorter({
                    headers: {
                        2: { sorter: false },
                        3: { sorter: false }
                    }
                });
            }, 50);
        }
    };
    BlogDocListComponent.prototype.edit = function (id) {
        this.showForm = true;
        this.docId = id;
    };
    BlogDocListComponent.prototype.addDoc = function () {
        this.showForm = true;
        this.docId = null;
    };
    BlogDocListComponent.prototype.delete = function (id) {
        var _this = this;
        jQuery.jAlert({
            'type': 'confirm',
            'title': 'Alert',
            'confirmQuestion': 'Are you sure to delete this Document ?',
            'theme': 'red',
            'onConfirm': function (e, btn) {
                e.preventDefault();
                _this._objService.deleteBlogDoc(_this.blogId, id)
                    .subscribe(function (res) {
                    _this.getBlogDocList();
                    jQuery.jAlert({
                        'title': 'Success',
                        'content': res.message,
                        'theme': 'green'
                    });
                }, function (error) {
                    jQuery.jAlert({
                        'title': 'Alert',
                        'content': error.message,
                        'theme': 'red'
                    });
                });
            }
        });
    };
    BlogDocListComponent.prototype.back = function () {
        this.showBlogListEvent.emit(true); // cancelled true
    };
    BlogDocListComponent.prototype.showDocList = function (arg) {
        if (!arg)
            this.getBlogDocList();
        this.showForm = false;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], BlogDocListComponent.prototype, "blogId", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], BlogDocListComponent.prototype, "showBlogListEvent", void 0);
    BlogDocListComponent = __decorate([
        core_1.Component({
            selector: 'blog-doc-list',
            templateUrl: 'admin-templates/blog/blog-doc-list.html',
            directives: [blog_doc_editor_component_1.BlogDocEditorComponent]
        }), 
        __metadata('design:paramtypes', [blog_service_1.BlogService])
    ], BlogDocListComponent);
    return BlogDocListComponent;
}());
exports.BlogDocListComponent = BlogDocListComponent;
//# sourceMappingURL=blog-doc-list.component.js.map