import { Config } from './../../configs/general.config';
import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()

export class AuthInterceptor implements HttpInterceptor {

    constructor() {}
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        // Get the auth token from Config.
        const authToken = Config.getAuthTokenValid() ? Config.getAuthToken(): null;
        let authReq: any;
        // // Clone the request and replace the original headers with
        // // cloned headers, updated with the authorization.
        // const authReq = req.clone({
        //     headers: req.headers.set('Authorization', authToken)
        // });

        // Clone the request and set the new header in one step.
        if(authToken != null)
            authReq = req.clone({ setHeaders: { Authorization: `${authToken}`, 'Content-Type': 'application/json' } });
        else
            authReq = req.clone({headers: req.headers.set('Content-Type', 'application/json')})
        // send cloned request with header to the next handler.
        return next.handle(authReq);
    }

}