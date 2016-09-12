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
/**
 * Created by sanedev on 4/8/16.
 */
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var Observable_1 = require("rxjs/Observable");
require('rxjs/add/operator/do');
var env_config_1 = require('../../../shared/configs/env.config');
var general_config_1 = require('../../../shared/configs/general.config');
var LoginService = (function () {
    // getEmailTemplate(){
    //     return  EmailTemp
    // }
    function LoginService(http) {
        var _this = this;
        this.http = http;
        this._loginUrl = env_config_1.API_URL + 'login'; // URL to web api
        this._checkLoginUrl = env_config_1.API_URL + "authenticate"; // URL to web api
        this._tfaVerificationApi = env_config_1.API_URL + "two-factor-auth-validate";
        this.loggedIn = false;
        this.isValidLogin = function () {
            return _this.http.get(_this._checkLoginUrl)
                .map(function (res) { return res.json(); })
                .map(function (res) {
                if (res.success)
                    _this.loggedIn = true;
                else
                    general_config_1.Config.clearToken();
                return res;
            });
            // .catch(this.handleError);
        };
        this.login = function (objLogin) {
            var body = JSON.stringify(objLogin);
            return _this.http.post(_this._loginUrl, body)
                .map(function (res) { return res.json(); })
                .map(function (res) {
                if (res.success && !res.twoFactorAuthEnabled) {
                    _this.loggedIn = true;
                }
                return res;
            });
            //    .catch(this.handleError);
        };
        this.tfaVerification = function (userId, token) {
            var body = JSON.stringify({ totpToken: token });
            return _this.http.post(_this._tfaVerificationApi + "/" + userId, body)
                .map(function (res) { return res.json(); })
                .map(function (res) {
                if (res.success) {
                    _this.loggedIn = true;
                }
                return res;
            });
            // .catch(this.handleError);
        };
        this.loggedIn = false;
    }
    LoginService.prototype.logout = function () {
        general_config_1.Config.clearToken();
        window.history.pushState(null, null, 'login');
        this.loggedIn = false;
    };
    // private extractData(res: Response) {
    //     // if (res.status < 200 || res.status >= 300) {
    //     //     throw new Error('Bad response status: ' + res.status);
    //     // }
    //     if(res.status == 200 || res.status == 401)
    //     { let body = res.json();}
    //     return body.data || { };
    // }
    LoginService.prototype.handleError = function (error) {
        // in a real world app, we may send the error to some remote logging infrastructure
        // instead of just logging it to the console
        general_config_1.Config.clearToken();
        console.error(error);
        return Observable_1.Observable.throw(error.json() || 'Server error');
    };
    LoginService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], LoginService);
    return LoginService;
}());
exports.LoginService = LoginService;
//# sourceMappingURL=login.service.js.map