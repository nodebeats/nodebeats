/**
 * Created by sanedev on 4/8/16.
 */
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ForgotPasswordModel} from './forgot-password.model';
import {Observable} from "rxjs/Observable";
import {API_URL} from '../../../shared/configs/env.config';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError } from 'rxjs/operators/catchError';

@Injectable()

export class ForgotPasswordService {
    private _forgotUrl:string = API_URL + 'change-password/verify';  // URL to web api
    private _changePassUrl: string = API_URL + 'password-change/confirm/';
    private _savePassUrl: string = API_URL + 'change-password/confirm/';
    
    constructor(private http:HttpClient) {
    }

    forgotPassword(objForgot:ForgotPasswordModel):Observable<any> {
        let body = JSON.stringify(objForgot);
        return this.http.post(this._forgotUrl, body)
            .pipe(
                catchError(this.handleError)
            );
    }

    checkChangePasswordStatus(token: string): Observable<any> {
        return this.http.get(this._changePassUrl + token)
            .pipe(
                catchError(this.handleError)
            );
    }

    saveNewPassword(objBody: any, token: string) {
        let body = JSON.stringify(objBody);
        return this.http.patch(this._savePassUrl + token, body)
            .pipe(
                catchError(this.handleError)
            );
    }

    handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
          } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
              `Backend returned code ${error.status}, ` +
              `body was: ${error.error.message}`);
          }
          // return an ErrorObservable with a user-facing error message
          return new ErrorObservable(error.error.message ? error.error.message : 'Something bad happened; please try again later.');
    }
}