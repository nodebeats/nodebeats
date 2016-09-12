"use strict";
var http_1 = require("@angular/http");
var login_service_1 = require('./login.service');
var login_model_1 = require('./login.model');
var testing_1 = require('@angular/http/testing');
var testing_2 = require('@angular/core/testing');
testing_2.describe('Login Service with http call', function () {
    beforeEach(function () {
        testing_2.addProviders([
            http_1.HTTP_PROVIDERS,
            login_service_1.LoginService
        ]);
    });
    testing_2.it('should login successfully when username and password is matched for 2FA Disaled', testing_2.async(testing_2.inject([login_service_1.LoginService], function (loginService) {
        var loginModel = new login_model_1.LoginModel();
        loginModel.username = "superadmin";
        loginModel.password = "superadmin@123";
        loginService.login(loginModel).subscribe(function (successResult) {
            testing_2.expect(successResult).toBeDefined();
            testing_2.expect(successResult.success).toBe(true);
        });
    })));
});
testing_2.describe('Login Service', function () {
    beforeEach(function () {
        testing_2.addProviders([
            http_1.HTTP_PROVIDERS,
            { provide: http_1.XHRBackend, useClass: testing_1.MockBackend },
            login_service_1.LoginService
        ]);
    });
    testing_2.it('should  when password is matched for 2FA Disaled', testing_2.inject([http_1.XHRBackend, login_service_1.LoginService], function (mockBackend, loginService) {
        // first we register a mock response - when a connection
        // comes in, we will respond by giving it
        mockBackend.connections.subscribe(function (connection) {
            connection.mockRespond(new http_1.Response(new http_1.ResponseOptions({
                body: {
                    success: true
                }
            })));
        });
        // with our mock response configured, we now can
        // ask the login service to verify login
        // and then test them
        var loginModel = new login_model_1.LoginModel();
        loginModel.username = "superadmin";
        loginModel.password = "superadmin@123";
        loginService.login(loginModel).subscribe(function (successResult) {
            testing_2.expect(successResult).toBeDefined();
            testing_2.expect(successResult.success).toBe(true);
        });
    }));
    testing_2.it('should return error with username and password mismatch for 2FA Disabled', testing_2.inject([http_1.XHRBackend, login_service_1.LoginService], function (mockBackend, loginService) {
        // first we register a mock response - when a connection
        // comes in, we will respond by giving it
        mockBackend.connections.subscribe(function (connection) {
            connection.mockRespond(new http_1.Response(new http_1.ResponseOptions({
                body: {
                    success: false,
                    message: 'invalid credential'
                }
            })));
        });
        // with our mock response configured, we now can
        // ask the login service to verify login
        // and then test them
        var loginModel = new login_model_1.LoginModel();
        loginModel.username = "wronguser";
        loginModel.password = "wrongpassword";
        loginService.login(loginModel).subscribe(function (response) {
            testing_2.expect(response).toBeDefined();
            testing_2.expect(response.success).toBe(false);
            testing_2.expect(response.message).toBe("invalid credential");
        });
    }));
});
// describe('Login Service Test', () => {
//     beforeEachProviders(() => [LoginService, HTTP_PROVIDERS, XHRBackend]);
//     let loginCred:LoginModel = new LoginModel();
//
//     it('Should not logged in', inject([LoginService], (service)=> {
//         loginCred.username = "test";
//         loginCred.password = "1234";
//         service.login(loginCred).subscribe((res)=> {
//             expect(res.success).toBe(false);
//             expect(res.message).toBe("Invalid Credential");
//         });
//     }));
//
//     it('Should be successfully logged in', inject([LoginService], (service)=> {
//         loginCred.username = "superadmin";
//         loginCred.password = "superadmin@123";
//         service.login(loginCred).subscribe((res)=> {
//             expect(res.success).toBe(true);
//             window.localStorage.setItem("NodeBeatAuthToken", res.token);
//         });
//     }));
//
// }); 
//# sourceMappingURL=login-service-spec.js.map