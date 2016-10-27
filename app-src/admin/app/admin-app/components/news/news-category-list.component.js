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
var NewsCategoryListComponent = (function () {
    function NewsCategoryListComponent(_objService) {
        this._objService = _objService;
        this.showFormEvent = new core_1.EventEmitter();
        this.showForm = false;
        /* Pagination */
        this.perPage = 10;
        this.currentPage = 1;
        this.totalPage = 1;
        this.first = 0;
    }
    NewsCategoryListComponent.prototype.ngOnInit = function () {
        this.perPage = 10;
        this.currentPage = 1;
        //   if (!this.isCanceled)
        this.getNewsCategoryList();
    };
    NewsCategoryListComponent.prototype.ngOnChanges = function () {
        if (this.showList)
            this.showForm = !this.showList;
    };
    NewsCategoryListComponent.prototype.getNewsCategoryList = function () {
        var _this = this;
        this._objService.getNewsCategoryList()
            .subscribe(function (objRes) { return _this.bindList(objRes); }, function (error) { return _this.errorMessage(error); });
    };
    NewsCategoryListComponent.prototype.errorMessage = function (objResponse) {
        jQuery.jAlert({
            'title': 'Alert',
            'content': objResponse.message,
            'theme': 'red'
        });
    };
    NewsCategoryListComponent.prototype.bindList = function (objRes) {
        this.objListResponse = objRes;
        if (objRes.length > 0) {
            this.sortTable();
        }
    };
    NewsCategoryListComponent.prototype.sortTable = function () {
        setTimeout(function () {
            jQuery('.tablesorter').tablesorter({
                headers: {
                    2: { sorter: false },
                    3: { sorter: false }
                }
            });
        }, 50);
    };
    NewsCategoryListComponent.prototype.edit = function (id) {
        //  this.showFormEvent.emit(id);
        this.showForm = true;
        this.categoryId = id;
    };
    NewsCategoryListComponent.prototype.addCategory = function () {
        // this.showFormEvent.emit(null);
        this.showForm = true;
        this.categoryId = null;
    };
    NewsCategoryListComponent.prototype.showCategoryList = function (args) {
        if (!args)
            this.getNewsCategoryList();
        this.showForm = false;
        this.sortTable();
    };
    NewsCategoryListComponent.prototype.delete = function (id) {
        var _this = this;
        jQuery.jAlert({
            'type': 'confirm',
            'title': 'Alert',
            'confirmQuestion': 'Are you sure to delete the News Category ?',
            'theme': 'red',
            'onConfirm': function (e, btn) {
                e.preventDefault();
                var objTemp = new news_model_1.NewsCategoryModel();
                objTemp._id = id;
                objTemp.deleted = true;
                _this._objService.deleteNewsCategory(objTemp)
                    .subscribe(function (res) {
                    _this.getNewsCategoryList();
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
    NewsCategoryListComponent.prototype.vppChanged = function (event) {
        this.perPage = Number(event.srcElement.value);
        this.getNewsCategoryList();
    };
    NewsCategoryListComponent.prototype.pageChanged = function (arg) {
        this.currentPage = arg;
        this.getNewsCategoryList();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], NewsCategoryListComponent.prototype, "showList", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], NewsCategoryListComponent.prototype, "showFormEvent", void 0);
    NewsCategoryListComponent = __decorate([
        core_1.Component({
            selector: 'news-category-list',
            templateUrl: 'admin-templates/news/news-category-list.html'
        }), 
        __metadata('design:paramtypes', [news_service_1.NewsService])
    ], NewsCategoryListComponent);
    return NewsCategoryListComponent;
}());
exports.NewsCategoryListComponent = NewsCategoryListComponent;
//# sourceMappingURL=news-category-list.component.js.map