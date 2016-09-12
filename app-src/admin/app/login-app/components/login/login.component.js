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
var login_model_1 = require('./login.model');
var login_service_1 = require("./login.service");
var forms_1 = require("@angular/forms");
var control_valdation_message_component_1 = require('../../../shared/components/control-valdation-message.component');
var general_config_1 = require("../../../shared/configs/general.config");
var router_1 = require("@angular/router");
var LoginComponent = (function () {
    function LoginComponent(form, _loginService, _router) {
        this.form = form;
        this._loginService = _loginService;
        this._router = _router;
        this.objLogin = new login_model_1.LoginModel();
        this.objResponse = new login_model_1.LoginResponse();
        this.isValidLogin = false;
        this.isSubmitted = false;
        this.tfaEnabled = false;
        this.formImage = general_config_1.Config.LoginImage;
        this.slide = "collapse";
        this.adminRoute = "/admin";
        this.username = new forms_1.FormControl('', forms_1.Validators.required);
        this.password = new forms_1.FormControl('', forms_1.Validators.required);
        this.token = new forms_1.FormControl('', forms_1.Validators.required);
        this.loginForm = form.group({
            username: this.username,
            password: this.password
        });
        this.tfaForm = form.group({
            token: this.token
        });
    }
    LoginComponent.prototype.ngOnInit = function () {
        if (general_config_1.Config.getAuthToken()) {
            this.checkValidLogin();
        }
    };
    LoginComponent.prototype.checkValidLogin = function () {
        var _this = this;
        this._loginService.isValidLogin()
            .subscribe(function (isValid) {
            _this.isValidLogin = isValid;
            var redirectRoute = general_config_1.Config.getAdminRoute();
            _this.adminRoute = redirectRoute ? redirectRoute : "/admin";
        }, function (error) { return _this.handleError(error); });
    };
    LoginComponent.prototype.onSubmit = function () {
        var _this = this;
        this.isSubmitted = true;
        if (this.loginForm.valid) {
            this._loginService.login(this.loginForm.value)
                .subscribe(function (objRes) { return _this.loginHandler(objRes); }, function (error) { return _this.handleError(error); });
        }
    };
    LoginComponent.prototype.loginHandler = function (res) {
        var _this = this;
        if (res.success) {
            if (res.twoFactorAuthEnabled) {
                this.isSubmitted = false;
                this.tfaEnabled = true;
                this.formImage = general_config_1.Config.GoogleAuthImage;
                this.userId = res.userId;
            }
            else {
                this.forwardAfterSuccess(res.token, res.userInfo);
            }
        }
        else {
            if (!res.isToken) {
                this.objResponse = res;
                this.slide = "expand";
                setTimeout(function () {
                    _this.slide = "collapse";
                }, 5000);
            }
        }
    };
    LoginComponent.prototype.forwardAfterSuccess = function (token, userInfo) {
        general_config_1.Config.setLoggedInToken(token, userInfo);
        this._router.navigate(['/admin']);
    };
    LoginComponent.prototype.onVerifyTfa = function () {
        var _this = this;
        this.isSubmitted = true;
        if (this.tfaForm.valid) {
            var token = this.tfaForm.controls['token'].value;
            this._loginService.tfaVerification(this.userId, token)
                .subscribe(function (res) { return _this.loginHandler(res); }, function (err) { return _this.handleError(err); });
        }
    };
    LoginComponent.prototype.handleError = function (res) {
        // if (res.status == 401) {
        //     let objResponse:LoginResponse = res.json();
        //     this.loginHandler(objResponse);
        // }
        // else if (res.status == 403) {
        general_config_1.Config.clearToken();
        var objResponse = res.json();
        this.loginHandler(objResponse);
        //  }
    };
    // handleError(res:any) {
    //     if (res.status != 401) {
    //         this.objResponse = <LoginResponse>res;
    //         this.isError = true;
    //         setTimeout(()=> this.isError = !this.isError, 5000);
    //     }
    // }
    LoginComponent.prototype.logout = function () {
        this._loginService.logout();
        this.isValidLogin = false;
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'login-comp',
            templateUrl: 'login-templates/login-form.html',
            directives: [control_valdation_message_component_1.FormControlMessages],
            animations: [core_1.trigger('slideMsg', [
                    core_1.state('collapse, void', core_1.style({ opacity: 0 })),
                    core_1.state('expand', core_1.style({ opacity: 1 })),
                    core_1.transition('void <=> expand', [core_1.animate("1s ease-in", core_1.style({ opacity: 1 })), core_1.animate(500)])
                ])]
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder, login_service_1.LoginService, router_1.Router])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map