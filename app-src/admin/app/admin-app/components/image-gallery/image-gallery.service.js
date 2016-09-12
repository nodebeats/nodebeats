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
var ImageGalleryService = (function () {
    function ImageGalleryService(_http, fileService) {
        var _this = this;
        this._http = _http;
        this.fileService = fileService;
        this.imageAlbumApiRoute = "gallery/album";
        this.imageGalleryApiRoute = "gallery/albumimage";
        this.progress = Observable_1.Observable.create(function (observer) {
            _this.progressObserver = observer;
        }).share();
    }
    /*  Image Album */
    ImageGalleryService.prototype.saveImageAlbum = function (objSave) {
        var body = JSON.stringify(objSave);
        return this._http.post(env_config_1.API_URL + this.imageAlbumApiRoute, body)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    ImageGalleryService.prototype.updateImageAlbum = function (objUpdate) {
        var body = JSON.stringify(objUpdate);
        return this._http.put(env_config_1.API_URL + this.imageAlbumApiRoute + "/" + objUpdate._id, body)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    ImageGalleryService.prototype.getImageAlbumList = function (perPage, currentPage) {
        return this._http.get(env_config_1.API_URL + this.imageAlbumApiRoute + "?perpage=" + perPage + "&page=" + currentPage)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    ImageGalleryService.prototype.getImageAlbumDetail = function (objId) {
        return this._http.get(env_config_1.API_URL + this.imageAlbumApiRoute + "/" + objId)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    ImageGalleryService.prototype.deleteImageAlbum = function (objDel) {
        var body = JSON.stringify(objDel);
        return this._http.patch(env_config_1.API_URL + this.imageAlbumApiRoute + "/" + objDel._id, body)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    /*  End Image Album */
    /*  Image Gallery */
    ImageGalleryService.prototype.saveImage = function (albumId, objSave, file) {
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
                    }
                }
            };
            xhr.upload.onprogress = function (event) {
                _this.progress = Math.round(event.loaded / event.total * 100);
                //this.progressObserver.next(this.progress);
            };
            xhr.open('POST', env_config_1.API_URL + _this.imageGalleryApiRoute + "/" + albumId, true);
            xhr.setRequestHeader("Authorization", general_config_1.Config.AuthToken);
            xhr.send(formData);
        });
    };
    ImageGalleryService.prototype.updateImage = function (albumId, objUpdate, file, imageDeleted) {
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
                    }
                }
            };
            xhr.upload.onprogress = function (event) {
                _this.progress = Math.round(event.loaded / event.total * 100);
                //this.progressObserver.next(this.progress);
            };
            xhr.open('PUT', env_config_1.API_URL + _this.imageGalleryApiRoute + "/" + albumId + "/" + objUpdate._id + "?imagedeleted=" + imageDeleted, true);
            xhr.setRequestHeader("Authorization", general_config_1.Config.AuthToken);
            xhr.send(formData);
        });
    };
    ImageGalleryService.prototype.updateCoverImage = function (albumId, objImage) {
        var body = JSON.stringify({});
        return this._http.patch(env_config_1.API_URL + this.imageGalleryApiRoute + "/" + albumId + "/" + objImage._id, body)
            .map(function (res) { return res.json(); });
    };
    ImageGalleryService.prototype.getAlbumImageList = function (albumId, perPage, currentPage) {
        return this._http.get(env_config_1.API_URL + this.imageGalleryApiRoute + "/" + albumId + "?perpage=" + perPage + "&page=" + currentPage)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    ImageGalleryService.prototype.getImageDetail = function (albumId, imageId) {
        return this._http.get(env_config_1.API_URL + this.imageGalleryApiRoute + "/" + albumId + "/" + imageId)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    ImageGalleryService.prototype.deleteAlbumImage = function (albumId, imageId) {
        return this._http.delete(env_config_1.API_URL + this.imageGalleryApiRoute + "/" + albumId + "/" + imageId)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    ImageGalleryService.prototype.deleteImageFile = function (fileName, orgExt, path) {
        return this.fileService.deleteFile(fileName, orgExt, path, "image");
    };
    /* End  Image Gallery */
    ImageGalleryService.prototype.handleError = function (error) {
        console.log(error.json());
        return Observable_1.Observable.throw(error.json() || 'server error');
    };
    ImageGalleryService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, fileOperation_service_1.FileOperrationService])
    ], ImageGalleryService);
    return ImageGalleryService;
}());
exports.ImageGalleryService = ImageGalleryService;
//# sourceMappingURL=image-gallery.service.js.map