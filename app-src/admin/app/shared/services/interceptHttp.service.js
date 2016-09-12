"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var http_1 = require('@angular/http');
var general_config_1 = require("../configs/general.config");
var router_1 = require("@angular/router");
var Rx_1 = require("rxjs/Rx");
var HttpInterceptor = (function (_super) {
    __extends(HttpInterceptor, _super);
    function HttpInterceptor(backend, defaultOptions, _router) {
        _super.call(this, backend, defaultOptions);
        this._router = _router;
    }
    HttpInterceptor.prototype.request = function (url, options) {
        return this.intercept(_super.prototype.request.call(this, url, options));
    };
    HttpInterceptor.prototype.get = function (url, options) {
        return this.intercept(_super.prototype.get.call(this, url, this.getRequestOptionArgs(options)));
    };
    HttpInterceptor.prototype.post = function (url, body, options) {
        return this.intercept(_super.prototype.post.call(this, url, body, this.getRequestOptionArgs(options)));
    };
    HttpInterceptor.prototype.put = function (url, body, options) {
        return this.intercept(_super.prototype.put.call(this, url, body, this.getRequestOptionArgs(options)));
    };
    HttpInterceptor.prototype.patch = function (url, body, options) {
        return this.intercept(_super.prototype.patch.call(this, url, body, this.getRequestOptionArgs(options)));
    };
    HttpInterceptor.prototype.delete = function (url, options) {
        return this.intercept(_super.prototype.delete.call(this, url, this.getRequestOptionArgs(options)));
    };
    HttpInterceptor.prototype.getRequestOptionArgs = function (options) {
        if (options == null) {
            options = new http_1.RequestOptions();
        }
        if (options.headers == null) {
            options.headers = new http_1.Headers();
        }
        options.headers.append('Content-Type', 'application/json');
        options.headers.append('Authorization', general_config_1.Config.getAuthToken());
        return options;
    };
    HttpInterceptor.prototype.intercept = function (observable) {
        return observable.catch(function (err, source) {
            // if (err.status == 401 && !_.endsWith(err.url, 'api/auth/login')) {
            //     this._router.navigate(['/login']);
            //     return Observable.empty();
            // } else {
            return Rx_1.Observable.throw(err);
            // }
        });
    };
    HttpInterceptor = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.ConnectionBackend, http_1.RequestOptions, router_1.Router])
    ], HttpInterceptor);
    return HttpInterceptor;
}(http_1.Http));
exports.HttpInterceptor = HttpInterceptor;
//# sourceMappingURL=interceptHttp.service.js.map