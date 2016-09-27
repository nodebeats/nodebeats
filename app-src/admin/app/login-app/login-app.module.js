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
var login_app_component_1 = require('./login-app.component');
// import {loginAppRouting} from './login-app.route';
var login_app_route_1 = require('./login-app.route');
var login_component_1 = require('./components/login/login.component');
var shared_module_1 = require('../shared/shared.module');
var forgot_password_service_1 = require('./components/forgot-password/forgot-password.service');
var LoginAppModule = (function () {
    function LoginAppModule() {
    }
    LoginAppModule.forRoot = function () {
        return {
            ngModule: LoginAppModule,
            providers: [login_app_route_1.authGuardProvider]
        };
    };
    LoginAppModule = __decorate([
        core_1.NgModule({
            imports: [
                shared_module_1.SharedModule
            ],
            declarations: [login_app_component_1.LoginAppComponent, login_app_component_1.LoginAppComponent, login_component_1.LoginComponent],
            exports: [login_app_component_1.LoginAppComponent, forgot_password_service_1.ForgotPasswordService]
        }), 
        __metadata('design:paramtypes', [])
    ], LoginAppModule);
    return LoginAppModule;
}());
exports.LoginAppModule = LoginAppModule;
//# sourceMappingURL=login-app.module.js.map