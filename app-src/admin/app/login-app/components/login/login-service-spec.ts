import {Http, HTTP_PROVIDERS, XHRBackend, ResponseOptions, Response} from "@angular/http";
import {LoginService} from  './login.service'
import {LoginModel, LoginResponse} from './login.model';
import {MockBackend, MockConnection} from '@angular/http/testing';

import {
    it,
    describe,
    expect,
    inject,
    addProviders,
    async
} from '@angular/core/testing';

describe('Login Service with http call', ()=> {
    beforeEach(() => {
        addProviders([
            HTTP_PROVIDERS,
            LoginService
        ])
    });

    it('should login successfully when username and password is matched for 2FA Disaled', async(inject([LoginService], (loginService) => {

            let loginModel:LoginModel = new LoginModel();
            loginModel.username = "superadmin";
            loginModel.password = "superadmin@123";
            loginService.login(loginModel).subscribe(
                (successResult:LoginResponse) => {
                    expect(successResult).toBeDefined();
                    expect(successResult.success).toBe(true);
                });
        })
    ));


});

describe('Login Service', ()=> {
    beforeEach(() => {
        addProviders([
            HTTP_PROVIDERS,
            {provide: XHRBackend, useClass: MockBackend},
            LoginService
        ])
    });

    it('should  when password is matched for 2FA Disaled', inject([XHRBackend, LoginService], (mockBackend, loginService) => {
            // first we register a mock response - when a connection
            // comes in, we will respond by giving it
            mockBackend.connections.subscribe(
                (connection:MockConnection) => {
                    connection.mockRespond(new Response(
                        new ResponseOptions({
                            body: {
                                success: true
                            }
                        })));
                });
            // with our mock response configured, we now can
            // ask the login service to verify login
            // and then test them
            let loginModel:LoginModel = new LoginModel();
            loginModel.username = "superadmin";
            loginModel.password = "superadmin@123";
            loginService.login(loginModel).subscribe(
                (successResult:LoginResponse) => {
                    expect(successResult).toBeDefined();
                    expect(successResult.success).toBe(true);
                });
        })
    );

    it('should return error with username and password mismatch for 2FA Disabled', inject([XHRBackend, LoginService], (mockBackend, loginService) => {
            // first we register a mock response - when a connection
            // comes in, we will respond by giving it
            mockBackend.connections.subscribe(
                (connection:MockConnection) => {
                    connection.mockRespond(new Response(
                        new ResponseOptions({
                            body: {
                                success: false,
                                message: 'invalid credential'
                            }
                        })));
                });
            // with our mock response configured, we now can
            // ask the login service to verify login
            // and then test them
            let loginModel:LoginModel = new LoginModel();
            loginModel.username = "wronguser";
            loginModel.password = "wrongpassword";
            loginService.login(loginModel).subscribe(
                (response:LoginResponse) => {
                    expect(response).toBeDefined();
                    expect(response.success).toBe(false);
                    expect(response.message).toBe("invalid credential");
                });
        })
    );
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