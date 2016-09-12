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
var UserService = (function () {
    function UserService(_http, fileService) {
        var _this = this;
        this._http = _http;
        this.fileService = fileService;
        this.apiRoute = "user";
        this.totpSetupApiRoute = "totp-setup";
        this.totpVerifyApiRoute = "totp-verify";
        this.totpDisableApiRoute = "totp-disable";
        this.progress = Observable_1.Observable.create(function (observer) {
            _this.progressObserver = observer;
        }).share();
    }
    UserService.prototype.registerUser = function (objUser, file) {
        var _this = this;
        return Observable_1.Observable.create(function (observer) {
            var formData = new FormData(), xhr = new XMLHttpRequest();
            formData.append('avatar', file);
            formData.append('data', JSON.stringify(objUser));
            console.log(formData);
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
    UserService.prototype.updateUser = function (objUser, file, imageDeleted) {
        var _this = this;
        return Observable_1.Observable.create(function (observer) {
            var formData = new FormData(), xhr = new XMLHttpRequest();
            if (file) {
                formData.append('avatar', file);
            }
            formData.append('data', JSON.stringify(objUser));
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
            xhr.open('PUT', env_config_1.API_URL + _this.apiRoute + "/" + objUser._id + "?imagedeleted=" + imageDeleted, true);
            xhr.setRequestHeader("Authorization", general_config_1.Config.AuthToken);
            xhr.send(formData);
        });
    };
    UserService.prototype.getUserList = function (perPage, currentPage) {
        return this._http.get(env_config_1.API_URL + this.apiRoute + "?perpage=" + perPage + "&page=" + currentPage)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    UserService.prototype.updatePassword = function (objUser) {
        var body = JSON.stringify(objUser);
        return this._http.patch(env_config_1.API_URL + this.apiRoute + "/" + objUser._id, body)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    UserService.prototype.updateSecurityQuestion = function (objUserSecurity) {
        var body = JSON.stringify(objUserSecurity);
        return this._http.patch(env_config_1.API_URL + this.apiRoute + "/" + objUserSecurity._id, body)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    //  For Two Factor authentication setup
    UserService.prototype.getTotpSecret = function () {
        return this._http.get(env_config_1.API_URL + this.totpSetupApiRoute)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    UserService.prototype.verifyTotpToken = function (totpToken, userId) {
        var body = JSON.stringify({ totpToken: totpToken });
        return this._http.post(env_config_1.API_URL + this.totpVerifyApiRoute + "/" + userId, body)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    UserService.prototype.updateSetting = function (objUserSetting) {
        var body = JSON.stringify(objUserSetting);
        return this._http.put(env_config_1.API_URL + this.totpDisableApiRoute + "/" + objUserSetting._id, body)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    // End Two Factor authentication
    UserService.prototype.getUserDetail = function (userId) {
        return this._http.get(env_config_1.API_URL + this.apiRoute + "/" + userId)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    UserService.prototype.deleteImage = function (fileName, orgExt, path) {
        return this.fileService.deleteFile(fileName, orgExt, path, "image");
    };
    UserService.prototype.userBlock = function (userId) {
    };
    UserService.prototype.handleError = function (error) {
        console.log(error.json());
        return Observable_1.Observable.throw(error.json() || 'server error');
    };
    UserService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, fileOperation_service_1.FileOperrationService])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map