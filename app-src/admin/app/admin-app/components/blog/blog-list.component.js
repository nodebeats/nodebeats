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
var BlogListComponent = (function () {
    function BlogListComponent(_objService) {
        this._objService = _objService;
        this.objListResponse = new blog_model_1.BlogResponse();
        this.objCatList = new blog_model_1.BlogCategoryResponse();
        this.showForm = false;
        // @Output() showFormEvent:EventEmitter<any> = new EventEmitter();
        this.showDocListEvent = new core_1.EventEmitter();
        this.showMetaFormEvent = new core_1.EventEmitter();
        /* Pagination */
        this.perPage = 10;
        this.currentPage = 1;
        this.totalPage = 1;
        this.nextPage = 1;
        this.preIndex = 0;
    }
    /* End Pagination */
    BlogListComponent.prototype.ngOnInit = function () {
        this.perPage = 10;
        this.currentPage = 1;
        //if (!this.isCanceled)
        this.getBlogList();
    };
    BlogListComponent.prototype.ngOnChanges = function () {
        if (this.showList) {
            this.showForm = !this.showList;
            this.getCategoryList();
        }
    };
    BlogListComponent.prototype.getCategoryList = function () {
        var _this = this;
        this._objService.getBlogCategoryList(100, 1, true)
            .subscribe(function (res) { return _this.objCatList = res; }, function (error) { return _this.errorMessage(error); });
    };
    BlogListComponent.prototype.categoryFilter = function (args) {
        var _this = this;
        var categoryId = args.srcElement.value;
        this.currentPage = 1;
        this._objService.getBlogList(this.perPage, this.currentPage, categoryId)
            .subscribe(function (res) { return _this.bindList(res); }, function (error) { return _this.errorMessage(error); });
    };
    BlogListComponent.prototype.getBlogList = function () {
        var _this = this;
        this._objService.getBlogList(this.perPage, this.currentPage)
            .subscribe(function (objRes) { return _this.bindList(objRes); }, function (error) { return _this.errorMessage(error); });
    };
    BlogListComponent.prototype.errorMessage = function (objResponse) {
        jQuery.jAlert({
            'title': 'Alert',
            'content': objResponse.message,
            'theme': 'red'
        });
    };
    BlogListComponent.prototype.bindList = function (objRes) {
        this.objListResponse = objRes;
        this.preIndex = (this.perPage * (this.currentPage - 1));
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
    BlogListComponent.prototype.addNews = function () {
        // this.showFormEvent.emit(null);
        this.showForm = true;
        this.blogId = null;
    };
    BlogListComponent.prototype.edit = function (id) {
        // this.showFormEvent.emit(id);
        this.showForm = true;
        this.blogId = id;
    };
    BlogListComponent.prototype.showBlogList = function (args) {
        if (!args)
            this.getBlogList();
        this.showForm = false;
    };
    BlogListComponent.prototype.showDocList = function (blogId) {
        this.showDocListEvent.emit(blogId);
    };
    BlogListComponent.prototype.showMetaForm = function (blogId) {
        this.showMetaFormEvent.emit(blogId);
    };
    BlogListComponent.prototype.delete = function (id) {
        var _this = this;
        jQuery.jAlert({
            'type': 'confirm',
            'title': 'Alert',
            'confirmQuestion': 'Are you sure to delete the Blog ?',
            'theme': 'red',
            'onConfirm': function (e, btn) {
                e.preventDefault();
                var objTemp = new blog_model_1.BlogModel();
                objTemp._id = id;
                objTemp.deleted = true;
                _this._objService.deleteBlog(objTemp)
                    .subscribe(function (res) {
                    _this.getBlogList();
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
    BlogListComponent.prototype.pageChanged = function (event) {
        this.perPage = event.rows;
        this.currentPage = (Math.floor(event.first / event.rows)) + 1;
        this.getBlogList();
        jQuery(".tablesorter").trigger("update");
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], BlogListComponent.prototype, "showDocListEvent", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], BlogListComponent.prototype, "showMetaFormEvent", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], BlogListComponent.prototype, "autoCompleteData", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], BlogListComponent.prototype, "isCanceled", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], BlogListComponent.prototype, "showList", void 0);
    BlogListComponent = __decorate([
        core_1.Component({
            selector: 'blog-list',
            templateUrl: 'admin-templates/blog/blog-list.html'
        }), 
        __metadata('design:paramtypes', [blog_service_1.BlogService])
    ], BlogListComponent);
    return BlogListComponent;
}());
exports.BlogListComponent = BlogListComponent;
//# sourceMappingURL=blog-list.component.js.map