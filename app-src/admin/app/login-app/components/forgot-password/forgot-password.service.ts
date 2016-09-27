/**
 * Created by sanedev on 4/8/16.
 */
import {Injectable} from '@angular/core';
import {ForgotPasswordModel} from './forgot-password.model';
import{Http} from '@angular/http';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/do';
import {API_URL} from '../../../shared/configs/env.config';
@Injectable()
export class ForgotPasswordService {
    private _forgotUrl:string = API_URL + '/change-password/verify';  // URL to web api

    constructor(private http:Http) {
    }

    forgotPassword(objForgot:ForgotPasswordModel):Observable<any> {
        let body = JSON.stringify(objForgot);
        return this.http.post(this._forgotUrl, body)
            .map(res => res.json())
            .catch(this.handleError);
    }

    private handleError(error) {
        // in a real world app, we may send the error to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json() || 'Server error');
    }
}