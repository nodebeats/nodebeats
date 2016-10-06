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
var ApiAccessService = (function () {
    function ApiAccessService(_http) {
        var _this = this;
        this._http = _http;
        this.apiRoute = "access";
        this.progress = Observable_1.Observable.create(function (observer) {
            _this.progressObserver = observer;
        }).share();
    }
    /* News Category */
    ApiAccessService.prototype.saveAccess = function (objSave) {
        var body = JSON.stringify(objSave);
        return this._http.post(env_config_1.API_URL + this.apiRoute, body)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    ApiAccessService.prototype.updateAccess = function (objUpdate) {
        var body = JSON.stringify(objUpdate);
        return this._http.put(env_config_1.API_URL + this.apiRoute + "/" + objUpdate._id, body)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    ApiAccessService.prototype.getAccessList = function (active) {
        var queryString = "";
        if (active)
            queryString = "?active=true";
        return this._http.get(env_config_1.API_URL + this.apiRoute + queryString)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    ApiAccessService.prototype.getAccessDetail = function (objId) {
        return this._http.get(env_config_1.API_URL + this.apiRoute + "/" + objId)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    ApiAccessService.prototype.deleteAccess = function (objDel) {
        var body = JSON.stringify(objDel);
        return this._http.patch(env_config_1.API_URL + this.apiRoute + "/" + objDel._id, body)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    ApiAccessService.prototype.handleError = function (error) {
        console.log(error.json());
        return Observable_1.Observable.throw(error.json() || 'server error');
    };
    ApiAccessService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ApiAccessService);
    return ApiAccessService;
}());
exports.ApiAccessService = ApiAccessService;
//# sourceMappingURL=api-access.service.js.map