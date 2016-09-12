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
var router_1 = require("@angular/router");
var login_service_1 = require("./components/login/login.service");
var general_config_1 = require("../shared/configs/general.config");
var AuthGuardService = (function () {
    function AuthGuardService(router, _loginService) {
        this.router = router;
        this._loginService = _loginService;
    }
    AuthGuardService.prototype.ngOnInit = function () {
        this._loginService.isValidLogin();
    };
    AuthGuardService.prototype.canActivate = function (route, state) {
        if (this._loginService.loggedIn) {
            general_config_1.Config.removeAdminRouteToken();
            return true;
        }
        /* To navigate to the current route when authenticate logged In / Valid Login */
        general_config_1.Config.setAdminRouteToken(state.url);
        this.router.navigate(['/login']);
        return false;
    };
    AuthGuardService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [router_1.Router, login_service_1.LoginService])
    ], AuthGuardService);
    return AuthGuardService;
}());
exports.AuthGuardService = AuthGuardService;
//# sourceMappingURL=auth.guard.service.js.map