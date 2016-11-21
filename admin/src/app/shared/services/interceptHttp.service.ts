import {Injectable} from '@angular/core';
import {Http, Headers, ConnectionBackend, RequestOptions, Request, RequestOptionsArgs, Response} from '@angular/http';
import{Config} from"../configs/general.config";
import {Router} from "@angular/router";
import {Observable} from "rxjs/Rx";

@Injectable()
export class HttpInterceptor extends Http {


    constructor(backend:ConnectionBackend, defaultOptions:RequestOptions, private _router:Router) {
        super(backend, defaultOptions);
    }

    request(url:string | Request, options?:RequestOptionsArgs):Observable<Response> {
        return this.intercept(super.request(url, options));
    }

    get(url:string, options?:RequestOptionsArgs):Observable<Response> {
        return this.intercept(super.get(url, this.getRequestOptionArgs(options)));
    }

    post(url:string, body:string, options?:RequestOptionsArgs):Observable<Response> {
        return this.intercept(super.post(url, body, this.getRequestOptionArgs(options)));
    }

    put(url:string, body:string, options?:RequestOptionsArgs):Observable<Response> {
        return this.intercept(super.put(url, body, this.getRequestOptionArgs(options)));
    }

    patch(url:string, body:string, options?:RequestOptionsArgs):Observable<Response> {
        return this.intercept(super.patch(url, body, this.getRequestOptionArgs(options)));
    }

    delete(url:string, options?:RequestOptionsArgs):Observable<Response> {
        return this.intercept(super.delete(url, this.getRequestOptionArgs(options)));
    }

    getRequestOptionArgs(options?:RequestOptionsArgs):RequestOptionsArgs {
        if (options == null) {
            options = new RequestOptions();
        }
        if (options.headers == null) {
            options.headers = new Headers();
        }
        options.headers.append('Content-Type', 'application/json');
        options.headers.append('Authorization', Config.getAuthToken());
        return options;
    }

    intercept(observable:Observable<Response>):Observable<Response> {
        return observable.catch((err, source) => {
            // if (err.status == 401 && !_.endsWith(err.url, 'api/auth/login')) {
            //     this._router.navigate(['/login']);
            //     return Observable.empty();
            // } else {
            return Observable.throw(err);
            // }
        });

    }
}