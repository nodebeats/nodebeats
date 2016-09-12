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
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
var general_config_1 = require("../../../shared/configs/general.config");
var env_config_1 = require("../../../shared/configs/env.config");
var fileOperation_service_1 = require('../../../shared/services/fileOperation.service');
var NewsService = (function () {
    function NewsService(_http, fileService) {
        var _this = this;
        this._http = _http;
        this.fileService = fileService;
        this.NewsCategoryApiRoute = "newscategory";
        this.newsApiRoute = "news";
        this.newsImageApi = "newsimage";
        this.progress = Observable_1.Observable.create(function (observer) {
            _this.progressObserver = observer;
        }).share();
    }
    /* News Category */
    NewsService.prototype.saveNewsCategory = function (objNewsCat) {
        var body = JSON.stringify(objNewsCat);
        return this._http.post(env_config_1.API_URL + this.NewsCategoryApiRoute, body)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    NewsService.prototype.updateNewsCategory = function (objNewsCat) {
        var body = JSON.stringify(objNewsCat);
        return this._http.put(env_config_1.API_URL + this.NewsCategoryApiRoute + "/" + objNewsCat._id, body)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    NewsService.prototype.getNewsCategoryList = function (active) {
        var queryString = "";
        if (active)
            queryString = "?active=true";
        return this._http.get(env_config_1.API_URL + this.NewsCategoryApiRoute + queryString)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    NewsService.prototype.getNewsCategoryDetail = function (objId) {
        return this._http.get(env_config_1.API_URL + this.NewsCategoryApiRoute + "/" + objId)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    NewsService.prototype.deleteNewsCategory = function (objDel) {
        var body = JSON.stringify(objDel);
        return this._http.patch(env_config_1.API_URL + this.NewsCategoryApiRoute + "/" + objDel._id, body)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    /* End News Category */
    /* News */
    NewsService.prototype.saveNews = function (objNews, file) {
        var _this = this;
        return Observable_1.Observable.create(function (observer) {
            var formData = new FormData(), xhr = new XMLHttpRequest();
            if (file) {
                formData.append('imageName', file);
            }
            formData.append('data', JSON.stringify(objNews));
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        observer.next(JSON.parse(xhr.response));
                        observer.complete();
                    }
                    else {
                        observer.error(JSON.parse(xhr.response));
                        console.log(xhr.response);
                    }
                }
            };
            xhr.upload.onprogress = function (event) {
                _this.progress = Math.round(event.loaded / event.total * 100);
                //this.progressObserver.next(this.progress);
            };
            xhr.open('POST', env_config_1.API_URL + _this.newsApiRoute, true);
            xhr.setRequestHeader("Authorization", general_config_1.Config.AuthToken);
            xhr.send(formData);
        });
    };
    NewsService.prototype.updateNews = function (objNews, file, imageDeleted) {
        var _this = this;
        return Observable_1.Observable.create(function (observer) {
            var formData = new FormData(), xhr = new XMLHttpRequest();
            if (file) {
                formData.append('imageName', file);
            }
            formData.append('data', JSON.stringify(objNews));
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        observer.next(JSON.parse(xhr.response));
                        observer.complete();
                    }
                    else {
                        observer.error(xhr.response);
                        console.log(xhr.response);
                    }
                }
            };
            xhr.upload.onprogress = function (event) {
                _this.progress = Math.round(event.loaded / event.total * 100);
                //this.progressObserver.next(this.progress);
            };
            xhr.open('PUT', env_config_1.API_URL + _this.newsApiRoute + "/" + objNews._id + "?imagedeleted=" + imageDeleted, true);
            xhr.setRequestHeader("Authorization", general_config_1.Config.AuthToken);
            xhr.send(formData);
        });
    };
    NewsService.prototype.getNewsList = function (perPage, currentPage, categoryId) {
        var queryString = "";
        queryString += perPage ? "?perpage=" + perPage : "";
        queryString += currentPage ? "&page=" + currentPage : "";
        queryString += categoryId ? "&categoryid=" + categoryId : "";
        return this._http.get(env_config_1.API_URL + this.newsApiRoute + queryString)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    NewsService.prototype.getNewsDetail = function (id) {
        return this._http.get(env_config_1.API_URL + this.newsApiRoute + "/" + id)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    NewsService.prototype.deleteNews = function (objUpdate) {
        var body = JSON.stringify(objUpdate);
        return this._http.patch(env_config_1.API_URL + this.newsApiRoute + "/" + objUpdate._id, body)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
        ;
    };
    /* End News */
    NewsService.prototype.deleteImage = function (fileName, orgExt, path) {
        return this.fileService.deleteFile(fileName, orgExt, path, "image");
    };
    /* News Image */
    NewsService.prototype.saveNewsImage = function (newsId, objSave, file) {
        var _this = this;
        return Observable_1.Observable.create(function (observer) {
            var formData = new FormData(), xhr = new XMLHttpRequest();
            if (file) {
                formData.append('imageName', file);
            }
            formData.append('data', JSON.stringify(objSave));
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        observer.next(JSON.parse(xhr.response));
                        observer.complete();
                    }
                    else {
                        observer.error(JSON.parse(xhr.response));
                        console.log(xhr.response);
                    }
                }
            };
            xhr.upload.onprogress = function (event) {
                _this.progress = Math.round(event.loaded / event.total * 100);
                //this.progressObserver.next(this.progress);
            };
            xhr.open('POST', env_config_1.API_URL + _this.newsImageApi + "/" + newsId, true);
            xhr.setRequestHeader("Authorization", general_config_1.Config.AuthToken);
            xhr.send(formData);
        });
    };
    NewsService.prototype.updateNewsImage = function (newsId, objUpdate, file, imageDeleted) {
        var _this = this;
        return Observable_1.Observable.create(function (observer) {
            var formData = new FormData(), xhr = new XMLHttpRequest();
            if (file) {
                formData.append('imageName', file);
            }
            formData.append('data', JSON.stringify(objUpdate));
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        observer.next(JSON.parse(xhr.response));
                        observer.complete();
                    }
                    else {
                        observer.error(JSON.parse(xhr.response));
                        console.log(xhr.response);
                    }
                }
            };
            xhr.upload.onprogress = function (event) {
                _this.progress = Math.round(event.loaded / event.total * 100);
                //this.progressObserver.next(this.progress);
            };
            xhr.open('PUT', env_config_1.API_URL + _this.newsImageApi + "/" + newsId + "/" + objUpdate._id + "?imagedeleted=" + imageDeleted, true);
            xhr.setRequestHeader("Authorization", general_config_1.Config.AuthToken);
            xhr.send(formData);
        });
    };
    NewsService.prototype.updateNewsCoverImage = function (newsId, prevCoverImageID, objNewsImage) {
        var body = JSON.stringify(objNewsImage);
        return this._http.patch(env_config_1.API_URL + this.newsImageApi + "/" + newsId + "/" + prevCoverImageID, body)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    NewsService.prototype.getNewsImageList = function (newsId) {
        return this._http.get(env_config_1.API_URL + this.newsImageApi + "/" + newsId)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    NewsService.prototype.getNewsImageDetail = function (newsId, newsImageId) {
        return this._http.get(env_config_1.API_URL + this.newsImageApi + "/" + newsId + "/" + newsImageId)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    NewsService.prototype.deleteNewsImage = function (newsId, newsImageId) {
        return this._http.delete(env_config_1.API_URL + this.newsImageApi + "/" + newsId + "/" + newsImageId)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    /* End News Image */
    NewsService.prototype.handleError = function (error) {
        console.log(error.json());
        return Observable_1.Observable.throw(error.json() || 'server error');
    };
    NewsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, fileOperation_service_1.FileOperrationService])
    ], NewsService);
    return NewsService;
}());
exports.NewsService = NewsService;
//# sourceMappingURL=news.service.js.map