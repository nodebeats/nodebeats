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
var DashboardService = (function () {
    function DashboardService(_http) {
        this._http = _http;
        this.accessTokenApiRoute = "google/accesstoken";
        this.realTimeApiRoute = "https://content.googleapis.com/analytics/v3/data/realtime?";
    }
    DashboardService.prototype.getAccessToken = function () {
        var _this = this;
        return this._http.get(env_config_1.API_URL + this.accessTokenApiRoute)
            .map(function (res) { return res.json(); })
            .catch(function (err) { return _this.handleError(err); });
    };
    DashboardService.prototype.queryGoogleApi = function (params) {
        return new Promise(function (resolve, reject) {
            var data = new gapi.analytics.report.Data({ query: params });
            data.once('success', function (response) {
                resolve(response);
            })
                .once('error', function (response) {
                reject(response);
            })
                .execute();
        });
    };
    DashboardService.prototype.queryGoogleRealtimeApi = function (params) {
        var _this = this;
        return this._http.get(this.realTimeApiRoute + params)
            .map(function (res) { return res.json(); })
            .catch(function (err) { return _this.handleError(err); });
    };
    DashboardService.prototype.handleError = function (error) {
        console.log(error.json());
        return Observable_1.Observable.throw(error.json() || 'server error');
    };
    DashboardService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], DashboardService);
    return DashboardService;
}());
exports.DashboardService = DashboardService;
//# sourceMappingURL=dashboard.service.js.map