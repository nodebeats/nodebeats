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
var blog_model_1 = require("./blog.model");
var BlogCategoryListComponent = (function () {
    function BlogCategoryListComponent(_objService) {
        this._objService = _objService;
        this.objListResponse = new blog_model_1.BlogCategoryResponse();
        this.showFormEvent = new core_1.EventEmitter();
        this.showForm = false;
        /* Pagination */
        this.perPage = 10;
        this.currentPage = 1;
        this.totalPage = 1;
        this.nextPage = 1;
    }
    BlogCategoryListComponent.prototype.ngOnInit = function () {
        this.perPage = 10;
        this.currentPage = 1;
        //   if (!this.isCanceled)
        this.getBlogCategoryList();
    };
    BlogCategoryListComponent.prototype.ngOnChanges = function () {
        if (this.showList)
            this.showForm = !this.showList;
    };
    BlogCategoryListComponent.prototype.getBlogCategoryList = function () {
        var _this = this;
        this._objService.getBlogCategoryList(this.perPage, this.currentPage)
            .subscribe(function (objRes) { return _this.bindList(objRes); }, function (error) { return _this.errorMessage(error); });
    };
    BlogCategoryListComponent.prototype.errorMessage = function (objResponse) {
        jQuery.jAlert({
            'title': 'Alert',
            'content': objResponse.message,
            'theme': 'red'
        });
    };
    BlogCategoryListComponent.prototype.bindList = function (objRes) {
        this.objListResponse = objRes;
        if (objRes.dataList.length > 0) {
            var totalPage = objRes.totalItems / this.perPage;
            this.totalPage = totalPage > 1 ? Math.ceil(totalPage) : 1;
            setTimeout(function () {
                jQuery('.tablesorter').tablesorter({
                    headers: {
                        3: { sorter: false },
                        4: { sorter: false }
                    }
                });
            }, 50);
        }
    };
    BlogCategoryListComponent.prototype.edit = function (id) {
        //  this.showFormEvent.emit(id);
        this.showForm = true;
        this.categoryId = id;
    };
    BlogCategoryListComponent.prototype.addCategory = function () {
        // this.showFormEvent.emit(null);
        this.showForm = true;
        this.categoryId = null;
    };
    BlogCategoryListComponent.prototype.showCategoryList = function (args) {
        if (!args)
            this.getBlogCategoryList();
        this.showForm = false;
    };
    BlogCategoryListComponent.prototype.delete = function (id) {
        var _this = this;
        jQuery.jAlert({
            'type': 'confirm',
            'title': 'Alert',
            'confirmQuestion': 'Are you sure to delete the Blog Category ?',
            'theme': 'red',
            'onConfirm': function (e, btn) {
                e.preventDefault();
                var objTemp = new blog_model_1.BlogCategoryModel();
                objTemp._id = id;
                objTemp.deleted = true;
                _this._objService.deleteBlogCategory(objTemp)
                    .subscribe(function (res) {
                    _this.getBlogCategoryList();
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
    BlogCategoryListComponent.prototype.vppChanged = function (event) {
        this.perPage = Number(event.srcElement.value);
        this.getBlogCategoryList();
    };
    BlogCategoryListComponent.prototype.pageChanged = function (arg) {
        if (arg != this.nextPage) {
            this.nextPage = arg;
            this.currentPage = arg;
            this.getBlogCategoryList();
            jQuery(".tablesorter").trigger("update");
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], BlogCategoryListComponent.prototype, "showList", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], BlogCategoryListComponent.prototype, "showFormEvent", void 0);
    BlogCategoryListComponent = __decorate([
        core_1.Component({
            selector: 'blog-category-list',
            templateUrl: 'admin-templates/blog/blog-category-list.html'
        }), 
        __metadata('design:paramtypes', [blog_service_1.BlogService])
    ], BlogCategoryListComponent);
    return BlogCategoryListComponent;
}());
exports.BlogCategoryListComponent = BlogCategoryListComponent;
//# sourceMappingURL=blog-category-list.component.js.map