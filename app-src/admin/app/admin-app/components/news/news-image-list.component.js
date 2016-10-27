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
var NewsImageListComponent = (function () {
    /* Pagination */
    // perPage:number = 10;
    // currentPage:number = 1;
    // totalPage:number = 1;
    // first:number = 0;
    /* End Pagination */
    function NewsImageListComponent(_objService, eleRef) {
        this._objService = _objService;
        this.eleRef = eleRef;
        this.showNewsListEvent = new core_1.EventEmitter();
        this.showImageForm = false;
    }
    NewsImageListComponent.prototype.ngOnInit = function () {
        this.getNewsImageList();
    };
    NewsImageListComponent.prototype.getNewsImageList = function () {
        var _this = this;
        this._objService.getNewsImageList(this.newsId)
            .subscribe(function (objRes) { return _this.bindList(objRes); }, function (error) { return _this.errorMessage(error); });
    };
    NewsImageListComponent.prototype.errorMessage = function (objResponse) {
        jQuery.jAlert({
            'title': 'Alert',
            'content': objResponse.message,
            'theme': 'red'
        });
    };
    NewsImageListComponent.prototype.bindList = function (objRes) {
        this.objListResponse = objRes;
        if (objRes.image.length > 0) {
            this.sortTable();
        }
    };
    NewsImageListComponent.prototype.sortTable = function () {
        setTimeout(function () {
            jQuery('.tablesorter').tablesorter({
                headers: {
                    2: { sorter: false },
                    3: { sorter: false },
                    4: { sorter: false }
                }
            });
        }, 50);
    };
    NewsImageListComponent.prototype.edit = function (id) {
        this.showImageForm = true;
        this.imageId = id;
    };
    NewsImageListComponent.prototype.addImage = function () {
        this.showImageForm = true;
        this.imageId = null;
    };
    NewsImageListComponent.prototype.delete = function (id) {
        var _this = this;
        jQuery.jAlert({
            'type': 'confirm',
            'title': 'Alert',
            'confirmQuestion': 'Are you sure to delete the Image ?',
            'theme': 'red',
            'onConfirm': function (e, btn) {
                e.preventDefault();
                _this._objService.deleteNewsImage(_this.newsId, id)
                    .subscribe(function (res) {
                    _this.getNewsImageList();
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
    NewsImageListComponent.prototype.back = function () {
        this.showNewsListEvent.emit(true); // cancelled true
    };
    NewsImageListComponent.prototype.showImageList = function (arg) {
        if (!arg)
            this.getNewsImageList();
        this.showImageForm = false;
        this.sortTable();
    };
    NewsImageListComponent.prototype.changeCoverImage = function (args) {
        var _this = this;
        var newsImageId = args.target.value;
        jQuery.jAlert({
            'type': 'confirm',
            'title': 'Alert',
            'confirmQuestion': 'Are you sure to change cover image ?',
            'theme': 'red',
            'onConfirm': function (e, btn) {
                e.preventDefault();
                // let prevCoverImage:NewsImageModel[] = this.objListResponse.image.filter(function (img:NewsImageModel) {
                //     return img.coverImage == true;
                // });
                // if (prevCoverImage.length > 0)
                //  prevCoverImageId = prevCoverImage[0]._id;
                var prevCoverImageId = _this.prevCoverImage ? _this.prevCoverImage.nativeElement.value : "";
                var objNewsImage = new news_model_1.NewsImageModel();
                objNewsImage._id = newsImageId;
                objNewsImage.coverImage = true;
                _this._objService.updateNewsCoverImage(_this.newsId, prevCoverImageId, objNewsImage)
                    .subscribe(function (res) {
                    _this.getNewsImageList();
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
            },
            "onDeny": function (e) {
                var prevCoverImageId = "";
                if (_this.prevCoverImage.nativeElement.value)
                    jQuery('input[name=rdbCoverImage][value=' + _this.prevCoverImage.nativeElement.value + ']').prop('checked', true);
                //    this.eleRef.nativeElement.querySelector('input:radio').value = this.prevCoverImage.nativeElement.value;
            }
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], NewsImageListComponent.prototype, "newsId", void 0);
    __decorate([
        core_1.ViewChild('prevCoverImage'), 
        __metadata('design:type', core_1.ElementRef)
    ], NewsImageListComponent.prototype, "prevCoverImage", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], NewsImageListComponent.prototype, "showNewsListEvent", void 0);
    NewsImageListComponent = __decorate([
        core_1.Component({
            selector: 'news-image-list',
            templateUrl: 'admin-templates/news/news-image-list.html'
        }), 
        __metadata('design:paramtypes', [news_service_1.NewsService, core_1.ElementRef])
    ], NewsImageListComponent);
    return NewsImageListComponent;
}());
exports.NewsImageListComponent = NewsImageListComponent;
//# sourceMappingURL=news-image-list.component.js.map