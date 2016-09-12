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
var env_config_1 = require("../../../shared/configs/env.config");
var general_config_1 = require('../../../shared/configs/general.config');
var fileOperation_service_1 = require('../../../shared/services/fileOperation.service');
var GoogleAnalyticsService = (function () {
    function GoogleAnalyticsService(_http, fileService) {
        this._http = _http;
        this.fileService = fileService;
        this.apiRoute = "analytics";
    }
    GoogleAnalyticsService.prototype.saveGoogleAnalytics = function (objSave, file) {
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
            xhr.open('POST', env_config_1.API_URL + _this.apiRoute, true);
            xhr.setRequestHeader("Authorization", general_config_1.Config.AuthToken);
            xhr.send(formData);
        });
    };
    GoogleAnalyticsService.prototype.updateGoogleAnalytics = function (objUpdate, file) {
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
            xhr.open('PUT', env_config_1.API_URL + _this.apiRoute + "/" + objUpdate._id, true);
            xhr.setRequestHeader("Authorization", general_config_1.Config.AuthToken);
            xhr.send(formData);
        });
    };
    GoogleAnalyticsService.prototype.getAnalyticsDetail = function () {
        return this._http.get(env_config_1.API_URL + this.apiRoute)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    GoogleAnalyticsService.prototype.deleteFile = function (fileName, path) {
        return this.fileService.deleteFile(fileName, ".json", path, "doc");
    };
    GoogleAnalyticsService.prototype.handleError = function (error) {
        console.log(error.json());
        return Observable_1.Observable.throw(error.json() || 'server error');
    };
    GoogleAnalyticsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, fileOperation_service_1.FileOperrationService])
    ], GoogleAnalyticsService);
    return GoogleAnalyticsService;
}());
exports.GoogleAnalyticsService = GoogleAnalyticsService;
//# sourceMappingURL=google-analytics.service.js.map