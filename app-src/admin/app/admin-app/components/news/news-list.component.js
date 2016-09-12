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
var news_service_1 = require("./news.service");
var news_model_1 = require("./news.model");
var primeng_1 = require('primeng/primeng');
var news_editor_component_1 = require("./news-editor.component");
var NewsListComponent = (function () {
    function NewsListComponent(_objService) {
        this._objService = _objService;
        this.objListResponse = new news_model_1.NewsResponse();
        this.showForm = false;
        this.showImageListEvent = new core_1.EventEmitter();
        this.showSpinner = true;
        /* Pagination */
        this.perPage = 10;
        this.currentPage = 1;
        this.totalPage = 1;
        this.nextPage = 1;
        this.preIndex = 0;
    }
    /* End Pagination */
    NewsListComponent.prototype.ngOnInit = function () {
        this.perPage = 10;
        this.currentPage = 1;
        //if (!this.isCanceled)
        this.getNewsList();
        this.getCategoryList();
    };
    NewsListComponent.prototype.ngOnChanges = function () {
        if (this.showList) {
            this.showForm = !this.showList;
            this.getCategoryList();
        }
    };
    NewsListComponent.prototype.getCategoryList = function () {
        var _this = this;
        this._objService.getNewsCategoryList(true) /*active*/
            .subscribe(function (res) { return _this.objCatList = res; }, function (error) { return _this.errorMessage(error); });
    };
    NewsListComponent.prototype.categoryFilter = function (args) {
        var _this = this;
        var categoryId = args.srcElement.value;
        this.currentPage = 1;
        this._objService.getNewsList(this.perPage, this.currentPage, categoryId)
            .subscribe(function (res) { return _this.bindList(res); }, function (error) { return _this.errorMessage(error); });
    };
    NewsListComponent.prototype.getNewsList = function () {
        var _this = this;
        this._objService.getNewsList(this.perPage, this.currentPage)
            .subscribe(function (objRes) { return _this.bindList(objRes); }, function (error) { return _this.errorMessage(error); });
    };
    NewsListComponent.prototype.errorMessage = function (objResponse) {
        jQuery.jAlert({
            'title': 'Alert',
            'content': objResponse.message,
            'theme': 'red'
        });
    };
    NewsListComponent.prototype.bindList = function (objRes) {
        this.showSpinner = false;
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
        else
            jQuery(".tablesorter").find('thead th').unbind('click mousedown').removeClass('header headerSortDown headerSortUp');
    };
    NewsListComponent.prototype.addNews = function () {
        // this.showFormEvent.emit(null);
        this.showForm = true;
        this.newsId = null;
    };
    NewsListComponent.prototype.edit = function (id) {
        // this.showFormEvent.emit(id);
        this.showForm = true;
        this.newsId = id;
    };
    NewsListComponent.prototype.showNewsList = function (args) {
        if (!args)
            this.getNewsList();
        this.showForm = false;
    };
    NewsListComponent.prototype.showImageList = function (newsId) {
        this.showImageListEvent.emit(newsId);
    };
    NewsListComponent.prototype.delete = function (id) {
        var _this = this;
        jQuery.jAlert({
            'type': 'confirm',
            'title': 'Alert',
            'confirmQuestion': 'Are you sure to delete the News ?',
            'theme': 'red',
            'onConfirm': function (e, btn) {
                e.preventDefault();
                var objTemp = new news_model_1.NewsModel();
                objTemp._id = id;
                objTemp.deleted = true;
                _this._objService.deleteNews(objTemp)
                    .subscribe(function (res) {
                    _this.getNewsList();
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
    NewsListComponent.prototype.pageChanged = function (event) {
        this.perPage = event.rows;
        this.currentPage = (Math.floor(event.first / event.rows)) + 1;
        this.getNewsList();
        jQuery(".tablesorter").trigger("update");
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], NewsListComponent.prototype, "showList", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], NewsListComponent.prototype, "showImageListEvent", void 0);
    NewsListComponent = __decorate([
        core_1.Component({
            selector: 'news-list',
            templateUrl: 'admin-templates/news/news-list.html',
            directives: [primeng_1.Paginator, news_editor_component_1.NewsEditorComponent]
        }), 
        __metadata('design:paramtypes', [news_service_1.NewsService])
    ], NewsListComponent);
    return NewsListComponent;
}());
exports.NewsListComponent = NewsListComponent;
//# sourceMappingURL=news-list.component.js.map