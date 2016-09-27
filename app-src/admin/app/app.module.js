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
var platform_browser_1 = require('@angular/platform-browser');
var app_component_1 = require('./app.component');
var shared_module_1 = require('./shared/shared.module');
var app_route_1 = require('./app.route');
//
// //Vendor js
require('../app-config/helperscript');
require('../app-config/rxjs-operator');
var app_route_2 = require('./app.route');
var login_component_1 = require('./login-app/components/login/login.component');
var admin_app_module_1 = require('./admin-app/admin-app.module');
var forgot_password_component_1 = require("./login-app/components/forgot-password/forgot-password.component");
var page_not_found_1 = require("./shared/components/page-not-found/page-not-found");
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule,
                shared_module_1.SharedModule.forRoot(),
                admin_app_module_1.AdminAppModule,
                app_route_1.routing
            ],
            declarations: [app_component_1.AppComponent,
                login_component_1.LoginComponent,
                forgot_password_component_1.ForgotPasswordComponent,
                page_not_found_1.PageNotFoundComponent],
            providers: [app_route_2.appRoutingProviders],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map