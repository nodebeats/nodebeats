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
var BlogService = (function () {
    function BlogService(_http, fileService) {
        var _this = this;
        this._http = _http;
        this.fileService = fileService;
        this.blogCategoryApiRoute = "blogcategory";
        this.blogApiRoute = "blog";
        this.blogDocumentApiRoute = "blogdocument";
        this.blotTagApiRoute = "blogtag";
        this.blogMetaApiRoute = "blogseo";
        this.progress = Observable_1.Observable.create(function (observer) {
            _this.progressObserver = observer;
        }).share();
    }
    /* Blog Category */
    BlogService.prototype.saveBlogCategory = function (objCategory) {
        var body = JSON.stringify(objCategory);
        return this._http.post(env_config_1.API_URL + this.blogCategoryApiRoute, body)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    BlogService.prototype.updateBlogCategory = function (objBlogCat) {
        var body = JSON.stringify(objBlogCat);
        return this._http.put(env_config_1.API_URL + this.blogCategoryApiRoute + "/" + objBlogCat._id, body)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    BlogService.prototype.getBlogCategoryList = function (perPage, currentPage, active) {
        var queryString = "";
        queryString += perPage ? "?perpage=" + perPage : "";
        queryString += currentPage ? "&page=" + currentPage : "";
        if (perPage)
            queryString += active ? "&active=true" : "";
        else
            queryString += active ? "?active=true" : "";
        return this._http.get(env_config_1.API_URL + this.blogCategoryApiRoute + queryString)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    BlogService.prototype.getBlogCategoryDetail = function (objId) {
        return this._http.get(env_config_1.API_URL + this.blogCategoryApiRoute + "/" + objId)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    BlogService.prototype.deleteBlogCategory = function (objDel) {
        var body = JSON.stringify(objDel);
        return this._http.patch(env_config_1.API_URL + this.blogCategoryApiRoute + "/" + objDel._id, body)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    /* End News Category */
    /* Blog */
    BlogService.prototype.saveBlog = function (objBlog, file) {
        var _this = this;
        return Observable_1.Observable.create(function (observer) {
            var formData = new FormData(), xhr = new XMLHttpRequest();
            if (file) {
                formData.append('imageName', file);
            }
            formData.append('data', JSON.stringify(objBlog));
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
            xhr.open('POST', env_config_1.API_URL + _this.blogApiRoute, true);
            xhr.setRequestHeader("Authorization", general_config_1.Config.AuthToken);
            xhr.send(formData);
        });
    };
    BlogService.prototype.updateBlog = function (objBlog, file, imageDeleted) {
        var _this = this;
        return Observable_1.Observable.create(function (observer) {
            var formData = new FormData(), xhr = new XMLHttpRequest();
            if (file) {
                formData.append('imageName', file);
            }
            formData.append('data', JSON.stringify(objBlog));
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
            xhr.open('PUT', env_config_1.API_URL + _this.blogApiRoute + "/" + objBlog._id + "?imagedeleted=" + imageDeleted, true);
            xhr.setRequestHeader("Authorization", general_config_1.Config.AuthToken);
            xhr.send(formData);
        });
    };
    BlogService.prototype.getBlogList = function (perPage, currentPage, categoryId) {
        var queryString = "";
        queryString += perPage ? "?perpage=" + perPage : "";
        queryString += currentPage ? "&page=" + currentPage : "";
        queryString += categoryId ? "&categoryid=" + categoryId : "";
        return this._http.get(env_config_1.API_URL + this.blogApiRoute + queryString)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    BlogService.prototype.getBlogDetail = function (id) {
        return this._http.get(env_config_1.API_URL + this.blogApiRoute + "/" + id)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    BlogService.prototype.deleteBlog = function (objUpdate) {
        var body = JSON.stringify(objUpdate);
        return this._http.patch(env_config_1.API_URL + this.blogApiRoute + "/" + objUpdate._id, body)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    /* End Blog */
    /*
     Blog Tag
     */
    BlogService.prototype.getBlogTagList = function () {
        return this._http.get(env_config_1.API_URL + this.blotTagApiRoute)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    /*
     END Blog Tag
     */
    BlogService.prototype.deleteImage = function (fileName, orgExt, path) {
        return this.fileService.deleteFile(fileName, orgExt, path, "image");
    };
    /* Blog File */
    BlogService.prototype.saveDocument = function (blogId, objSave, file) {
        var _this = this;
        return Observable_1.Observable.create(function (observer) {
            var formData = new FormData(), xhr = new XMLHttpRequest();
            if (file) {
                formData.append('documentName', file);
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
            xhr.open('POST', env_config_1.API_URL + _this.blogDocumentApiRoute + "/" + blogId, true);
            xhr.setRequestHeader("Authorization", general_config_1.Config.AuthToken);
            xhr.send(formData);
        });
    };
    BlogService.prototype.updateDocumnet = function (blogId, objUpdate, file, fileDeleted) {
        var _this = this;
        return Observable_1.Observable.create(function (observer) {
            var formData = new FormData(), xhr = new XMLHttpRequest();
            if (file) {
                formData.append('documentName', file);
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
            xhr.open('PUT', env_config_1.API_URL + _this.blogDocumentApiRoute + "/" + blogId + "/" + objUpdate._id + "?filedeleted=" + fileDeleted, true);
            xhr.setRequestHeader("Authorization", general_config_1.Config.AuthToken);
            xhr.send(formData);
        });
    };
    //
    // updateNewsCoverImage(newsId:string, prevCoverImageID:string, objBlogImage:NewsImageModel) {
    //     let body = JSON.stringify(objBlogImage);
    //     return this._http.patch(API_URL + this.newsImageApi + "/" + newsId + "/" + prevCoverImageID, body)
    //         .map(res => res.json())
    //         .catch(this.handleError);
    //
    // }
    //
    // Use MIME type instead of Org Ext for document
    BlogService.prototype.deleteDoc = function (fileName, mimeType, path) {
        return this.fileService.deleteFile(fileName, mimeType, path, "document");
    };
    BlogService.prototype.getBlogDocList = function (blogId) {
        return this._http.get(env_config_1.API_URL + this.blogDocumentApiRoute + "/" + blogId)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    BlogService.prototype.getBlogDocDetail = function (blogId, docId) {
        return this._http.get(env_config_1.API_URL + this.blogDocumentApiRoute + "/" + blogId + "/" + docId)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    BlogService.prototype.deleteBlogDoc = function (blogId, docId) {
        var body = JSON.stringify({});
        return this._http.patch(env_config_1.API_URL + this.blogDocumentApiRoute + "/" + blogId + "/" + docId, body)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    //
    // /* End Blog Image */
    /* Blog Meta Tag*/
    BlogService.prototype.updateBlogMetaTag = function (objMeta) {
        var body = JSON.stringify(objMeta);
        return this._http.put(env_config_1.API_URL + this.blogMetaApiRoute + "/" + objMeta._id, body)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    BlogService.prototype.getBlogMetaTagDetail = function (blogId) {
        return this._http.get(env_config_1.API_URL + this.blogMetaApiRoute + "/" + blogId)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    /*
     End Blog Meta
     */
    BlogService.prototype.handleError = function (error) {
        console.log(error.json());
        return Observable_1.Observable.throw(error.json() || 'server error');
    };
    BlogService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, fileOperation_service_1.FileOperrationService])
    ], BlogService);
    return BlogService;
}());
exports.BlogService = BlogService;
//# sourceMappingURL=blog.service.js.map