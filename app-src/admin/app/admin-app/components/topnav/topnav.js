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
var router_1 = require('@angular/router');
var login_service_1 = require('../../../login-app/components/login/login.service');
var general_config_1 = require("../../../shared/configs/general.config");
var TopNavCmp = (function () {
    function TopNavCmp(_router, loginService) {
        this._router = _router;
        this.loginService = loginService;
        this.oneAtATime = true;
        this.items = [{ name: 'google', link: 'https://google.com' }, {
                name: 'facebook',
                link: 'https://facebook.com'
            }];
        this.status = {
            isFirstOpen: true,
            isFirstDisabled: false
        };
        var userInfo = JSON.parse(general_config_1.Config.getUserInfoToken());
        this.userName = userInfo.username;
        this.twoFactorEnabled = userInfo.twoFactorAuthEnabled;
    }
    TopNavCmp.prototype.logout = function () {
        this.loginService.logout();
        this._router.navigate(['/login']);
    };
    TopNavCmp = __decorate([
        core_1.Component({
            selector: 'topnav',
            templateUrl: 'admin-templates/shared/topnav.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, login_service_1.LoginService])
    ], TopNavCmp);
    return TopNavCmp;
}());
exports.TopNavCmp = TopNavCmp;
//# sourceMappingURL=topnav.js.map