/**
 * Created by sanedev on 5/17/16.
 */
import {CloudinaryModel, CloudinaryResponse} from './cloudinary.model';
import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import{API_URL} from "../../../shared/configs/env.config";

@Injectable()
export class CloudinaryService {
    apiRoute:string = "cloudinary";

    constructor(private _http:Http) {

    }

    saveCloudinarySettings(objSave:CloudinaryModel):Observable<any> {
        let body = JSON.stringify(objSave);
        return this._http.post(API_URL + this.apiRoute, body)
            .map(res =>  res.json())
            .catch(this.handleError);

    }

    updateCloudinarySettings(objUpdate:CloudinaryModel, id:string) {
        let body = JSON.stringify(objUpdate);
        return this._http.put(API_URL + this.apiRoute + "/" + id, body)
            .map(res => res.json())
            .catch(this.handleError);

    }

    getCloudinarySettings():Observable < CloudinaryModel > {
        return this._http.get(API_URL + this.apiRoute)
            .map(res =><CloudinaryModel>res.json())
            .catch(this.handleError);
    }

    handleError(error) {
        return Observable.throw(error.json() || 'server error');
    }

}
