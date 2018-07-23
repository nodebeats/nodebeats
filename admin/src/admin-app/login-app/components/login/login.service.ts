import { HttpClient, HttpErrorResponse } from '@angular/common/http';
/**
 * Created by sanedev on 4/8/16.
 */
import {Injectable} from '@angular/core';
import {LoginModel, LoginResponse} from './login.model';
import {Observable} from "rxjs/Observable";
import {API_URL} from '../../../shared/configs/env.config';
import {Config}from '../../../shared/configs/general.config';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError } from 'rxjs/operators/catchError';

@Injectable()

export class LoginService {
  private _loginUrl: string = API_URL + 'login';  // URL to web api
  private _checkLoginUrl: string = API_URL + "authenticate"; // URL to web api
  private _tfaVerificationApi: string = API_URL + "two-factor-auth-validate";
  private _verifyApi: string = API_URL + 'confirm/user';
  loggedIn: boolean = false;
  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor(private http: HttpClient) {
    this.loggedIn = false;
  }

  // isValidLogin = (): Observable<boolean>=> {
  //   return this.http.get(this._checkLoginUrl)
  //     .map(res=>res.json())
  //     .map((res) => {
  //       if (res.success)
  //         this.loggedIn = true;
  //       else
  //         Config.clearToken();
  //       return res;
  //     });
  //   // .catch(this.handleError);
  // };

  login = (objLogin: LoginModel): Observable<LoginResponse>=> {
    let body = JSON.stringify(objLogin);
    return this.http.post(this._loginUrl, body)
      .pipe(
          catchError(this.handleError)
      );
    //    .catch(this.handleError);
  };

  tfaVerification = (userId: string, token: number): Observable<LoginResponse>=> {
    let body = JSON.stringify({totpToken: token});
    return this.http.post(this._tfaVerificationApi + "/" + userId, body)
      .pipe(
        catchError(this.handleError)
      );
  };

  verifyUser(token: string): Observable<any> {
    return this.http.get(this._verifyApi + '/' + token)
      .pipe(
        catchError(this.handleError)
      );
  }

  logout() {
    Config.clearToken();
    if(typeof window !="undefined")
      window.history.pushState(null, null, 'login');
    this.loggedIn = false;
  }

// private extractData(res: Response) {
//     // if (res.status < 200 || res.status >= 300) {
//     //     throw new Error('Bad response status: ' + res.status);
//     // }
//     if(res.status == 200 || res.status == 401)
//     { let body = res.json();}
//     return body.data || { };
// }
  handleError(error: HttpErrorResponse) {
    Config.clearToken();
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
      return new ErrorObservable(error.error.message ? error.error.message :
        'Something bad happened; please try again later.');
  }

}
