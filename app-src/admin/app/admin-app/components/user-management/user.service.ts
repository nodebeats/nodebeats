import {UserModel, UserResponse, UserSettingModel, UserSecurityModel} from './user.model';
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import{Config} from "../../../shared/configs/general.config";
import{API_URL} from "../../../shared/configs/env.config";
import {FileOperrationService} from '../../../shared/services/fileOperation.service';

@Injectable()
export class UserService {
    apiRoute:string = "user";
    totpSetupApiRoute:string = "totp-setup";
    totpVerifyApiRoute:string = "totp-verify";
    totpDisableApiRoute:string = "totp-disable";
    progressObserver:any;
    progress:any;

    constructor(private _http:Http, private  fileService:FileOperrationService) {
        this.progress = Observable.create(observer => {
            this.progressObserver = observer
        }).share();
    }


    registerUser(objUser:UserModel, file:File):Observable<any> {
        return Observable.create(observer => {
            let formData:FormData = new FormData(),
                xhr:XMLHttpRequest = new XMLHttpRequest();

            formData.append('avatar', file);
            formData.append('data', JSON.stringify(objUser));
            console.log(formData)
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

    updateUser(objUser:UserModel, file:File, imageDeleted:boolean):Observable<any> {
        return Observable.create(observer => {
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
            xhr.open('PUT', API_URL + this.apiRoute + "/" + objUser._id + "?imagedeleted=" + imageDeleted, true);
            xhr.setRequestHeader("Authorization", Config.AuthToken);
            xhr.send(formData);
        });
    }

    getUserList(perPage:number, currentPage:number):Observable < UserResponse > {
        return this._http.get(API_URL + this.apiRoute + "?perpage=" + perPage + "&page=" + currentPage)
            .map(res =><UserResponse>res.json())
            .catch(this.handleError);
    }

    updatePassword(objUser:UserModel):Observable<any> {
        let body = JSON.stringify(objUser);
        return this._http.patch(API_URL + this.apiRoute + "/" + objUser._id, body)
            .map(res => res.json())
            .catch(this.handleError);

    }

    updateSecurityQuestion(objUserSecurity:UserSecurityModel):Observable<any> {
        let body = JSON.stringify(objUserSecurity);
        return this._http.patch(API_URL + this.apiRoute + "/" + objUserSecurity._id, body)
            .map(res => res.json())
            .catch(this.handleError);

    }


    //  For Two Factor authentication setup
    getTotpSecret():Observable<any> {
        return this._http.get(API_URL + this.totpSetupApiRoute)
            .map(res =>res.json())
            .catch(this.handleError);

    }

    verifyTotpToken(totpToken:number, userId:string):Observable<any> {
        let body = JSON.stringify({totpToken: totpToken});
        return this._http.post(API_URL + this.totpVerifyApiRoute + "/" + userId, body)
            .map(res =>res.json())
            .catch(this.handleError);

    }

    updateSetting(objUserSetting:UserSettingModel):Observable<any> {
        let body = JSON.stringify(objUserSetting);
        return this._http.put(API_URL + this.totpDisableApiRoute + "/" + objUserSetting._id, body)
            .map(res => res.json())
            .catch(this.handleError);

    }

    // End Two Factor authentication

    getUserDetail(userId:string):Observable < UserModel > {
        return this._http.get(API_URL + this.apiRoute + "/" + userId)
            .map(res =><UserModel>res.json())
            .catch(this.handleError);
    }

    deleteImage(fileName:string, orgExt:string, path:string):Observable < any > {
        return this.fileService.deleteFile(fileName, orgExt, path, "image");

    }

    userBlock(userId:string) {


    }

    handleError(error) {
        console.log(error.json());
        return Observable.throw(error.json() || 'server error');
    }

}