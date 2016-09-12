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
var login_component_1 = require('./components/login/login.component');
var LoginAppComponent = (function () {
    function LoginAppComponent(viewContainerRef) {
        this.viewContainerRef = viewContainerRef;
        this.containerSlide = false;
        // modal.defaultViewContainer = viewContainerRef;
        // Read the RouteConfig annotation so we can pass it to the breadcrumb component
        // let annotations = Reflect.getOwnMetadata('annotations', AppComponent);
        // for (let i = 0; i < annotations.length; i += 1) {
        //     if (annotations[i].constructor.name === 'RouteConfig') {
        //         this.routeConfig = annotations[i].configs;
        //     }
        // }
    }
    LoginAppComponent.prototype.toggleContainer = function (args) {
        this.containerSlide = args;
    };
    LoginAppComponent = __decorate([
        core_1.Component({
            selector: 'login-app',
            templateUrl: 'login-app/login-index.html',
            precompile: [login_component_1.LoginComponent]
        }), 
        __metadata('design:paramtypes', [core_1.ViewContainerRef])
    ], LoginAppComponent);
    return LoginAppComponent;
}());
exports.LoginAppComponent = LoginAppComponent;
//# sourceMappingURL=login-app.component.js.map