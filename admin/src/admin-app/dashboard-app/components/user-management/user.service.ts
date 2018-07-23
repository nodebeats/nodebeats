import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import {UserModel, UserResponse, UserSettingModel, UserSecurityModel} from './user.model';
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Config} from "../../../shared/configs/general.config";
import {API_URL} from "../../../shared/configs/env.config";
import {FileOperrationService} from '../../../shared/services/fileOperation.service';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError } from 'rxjs/operators/catchError';

@Injectable()
export class UserService {
    apiRoute:string = "user";
    totpSetupApiRoute:string = "totp-setup";
    totpVerifyApiRoute:string = "totp-verify";
    totpDisableApiRoute:string = "totp-disable";
    progressObserver:any;
    progress:any;

    constructor(private _http:HttpClient, private  fileService:FileOperrationService) {
        // this.progress = Observable.create(observer => {
        //     this.progressObserver = observer
        // }).share();
    }

    registerUser(objUser:UserModel, file:File):Observable<any> {
        return Observable.create((observer: any) => {
            let formData:FormData = new FormData(),
                xhr:XMLHttpRequest = new XMLHttpRequest();

            formData.append('avatar', file);
            formData.append('data', JSON.stringify(objUser));
            // console.log(formData)
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        observer.next(JSON.parse(xhr.response));
                        observer.complete();
                    } else {
                        observer.error(JSON.parse(xhr.response));
                        console.log(xhr.response);
                    }
                }
            };
            xhr.upload.onprogress = (event) => {
                this.progress = Math.round(event.loaded / event.total * 100);
                //this.progressObserver.next(this.progress);
            };
            xhr.open('POST', API_URL + this.apiRoute, true);
            xhr.setRequestHeader("Authorization", Config.AuthToken);
            xhr.send(formData);
        });
    }

    updateUser(objUser:UserModel, file:File, imageDeleted:boolean, userId: string):Observable<any> {
        return Observable.create((observer: any) => {
            let formData:FormData = new FormData(),
                xhr:XMLHttpRequest = new XMLHttpRequest();

            if (file) {
                formData.append('avatar', file);

            }
            formData.append('data', JSON.stringify(objUser));
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        observer.next(JSON.parse(xhr.response));
                        observer.complete();
                    } else {
                        observer.error(JSON.parse(xhr.response));
                        console.log(xhr.response);
                    }
                }
            };
            xhr.upload.onprogress = (event) => {
                this.progress = Math.round(event.loaded / event.total * 100);
                //this.progressObserver.next(this.progress);
            };
            xhr.open('PUT', API_URL + this.apiRoute + "/" + userId + "?imagedeleted=" + imageDeleted, true);
            xhr.setRequestHeader("Authorization", Config.AuthToken);
            xhr.send(formData);
        });
    }

    getUserList(perPage:number, currentPage:number, roleName?:string):Observable < UserResponse > {
        let queryString = new HttpParams();
        queryString = queryString.append('perpage', perPage.toString());
        queryString = queryString.append('page', currentPage.toString());
        if(roleName)
            queryString = queryString.append('role', roleName);
        return this._http.get<UserResponse>(API_URL + this.apiRoute, {params: queryString})
            .pipe(
                catchError(this.handleError)
            );
    }

    updatePassword(objUser:UserModel):Observable<any> {
        let body = JSON.stringify(objUser);
        return this._http.patch(API_URL + this.apiRoute + "/" + objUser._id, body)
            .pipe(
                catchError(this.handleError)
            );
    }

    updateSecurityQuestion(objUserSecurity:UserSecurityModel):Observable<any> {
        let body = JSON.stringify(objUserSecurity);
        return this._http.patch(API_URL + this.apiRoute + "/" + objUserSecurity._id, body)
            .pipe(
                catchError(this.handleError)
            );
    }


    //  For Two Factor authentication setup
    getTotpSecret():Observable<any> {
        return this._http.get(API_URL + this.totpSetupApiRoute)
            .pipe(
                catchError(this.handleError)
            );
    }

    verifyTotpToken(totpToken:number, userId:string):Observable<any> {
        let body = JSON.stringify({totpToken: totpToken});
        return this._http.post(API_URL + this.totpVerifyApiRoute + "/" + userId, body)
            .pipe(
                catchError(this.handleError)
            );
    }

    updateSetting(objUserSetting:UserSettingModel):Observable<any> {
        let body = JSON.stringify(objUserSetting);
        return this._http.put(API_URL + this.totpDisableApiRoute + "/" + objUserSetting._id, body)
            .pipe(
                catchError(this.handleError)
            );
    }

    // End Two Factor authentication

    getUserDetail(userId:string):Observable < UserModel > {
        return this._http.get<UserModel>(API_URL + this.apiRoute + "/" + userId)
            .pipe(
                catchError(this.handleError)
            );
    }

    deleteImage(fileName:string, orgExt:string, path:string):Observable < any > {
        return this.fileService.deleteFile(fileName, orgExt, path, "image");

    }

    userBlock(userId:string) {


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
          return new ErrorObservable(error.error.message ? error.error.message :
            'Something bad happened; please try again later.');
    }

}
