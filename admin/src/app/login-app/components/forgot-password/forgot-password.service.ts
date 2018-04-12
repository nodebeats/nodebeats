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
    private _forgotUrl:string = API_URL + 'change-password/verify';  // URL to web api
    private _changePassUrl: string = API_URL + 'password-change/confirm/';
    private _savePassUrl: string = API_URL + 'change-password/confirm/'
    constructor(private http:Http) {
    }

    forgotPassword(objForgot:ForgotPasswordModel):Observable<any> {
        let body = JSON.stringify(objForgot);
        return this.http.post(this._forgotUrl, body)
            .map(res => res.json())
            .catch(this.handleError);
    }

    checkChangePasswordStatus(token: string): Observable<any> {
        return this.http.get(this._changePassUrl + token)
            .map(res => res.json())
            .catch(this.handleError);
    }

    saveNewPassword(objBody: any, token: string) {
        let body = JSON.stringify(objBody);
        return this.http.patch(this._savePassUrl + token, body)
            .map(res => res.json())
            .catch(this.handleError);
    }

    private handleError(error) {
        console.error(error);
        return Observable.throw(error.json() || 'Server error');
    }
}