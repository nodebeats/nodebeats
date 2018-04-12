/**
 * Created by sanedev on 4/8/16.
 */
import {Injectable} from '@angular/core';
import {LoginModel, LoginResponse} from './login.model';
import{Http, Response} from '@angular/http';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/do';
import {API_URL} from '../../../shared/configs/env.config';
import{Config}from '../../../shared/configs/general.config';

@Injectable()

export class LoginService {
  private _loginUrl: string = API_URL + 'login';  // URL to web api
  private _checkLoginUrl: string = API_URL + "authenticate"; // URL to web api
  private _tfaVerificationApi: string = API_URL + "two-factor-auth-validate";
  private _verifyApi: string = API_URL + 'confirm/user';
  loggedIn: boolean = false;
  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor(private http: Http) {
    this.loggedIn = false;
  }


  isValidLogin = (): Observable<boolean>=> {
    return this.http.get(this._checkLoginUrl)
      .map(res=>res.json())
      .map((res) => {
        if (res.success)
          this.loggedIn = true;
        else
          Config.clearToken();
        return res;
      });
    // .catch(this.handleError);
  };

  login = (objLogin: LoginModel): Observable<LoginResponse>=> {
    let body = JSON.stringify(objLogin);
    return this.http.post(this._loginUrl, body)
      .map(res => res.json())
      .map((res) => {
        if (res.success && !res.twoFactorAuthEnabled) {
          this.loggedIn = true;
        }
        return res;
      });
    //    .catch(this.handleError);
  };

  tfaVerification = (userId: string, token: number): Observable<LoginResponse>=> {
    let body = JSON.stringify({totpToken: token});
    return this.http.post(this._tfaVerificationApi + "/" + userId, body)
      .map(res => res.json())
      .map((res) => {
        if (res.success) {
          this.loggedIn = true;
        }
        return res;
      });
    // .catch(this.handleError);
  };

  verifyUser(token: string): Observable<any> {
    return this.http.get(this._verifyApi + '/' + token)
      .map(res => res.json())
      .catch(this.handleError);
  }

  logout() {
    Config.clearToken();
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
  private
  handleError(error) {
    // in a real world app, we may send the error to some remote logging infrastructure
    // instead of just logging it to the console
    Config.clearToken();
    console.error(error);
    return Observable.throw(error.json() || 'Server error');
  }
}
