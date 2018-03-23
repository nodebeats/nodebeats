import {EmailServiceModel} from './email-service.model';
import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import{API_URL} from "../../../shared/configs/env.config";

@Injectable()
export class EmailServiceService {
    apiRoute:string = "emailservice";

    constructor(private _http:Http) {

    }

    saveEmailService(objEmailService:EmailServiceModel) {
        let body = JSON.stringify(objEmailService);
        return this._http.post(API_URL + this.apiRoute, body)
            .map(res => res.json())
            .catch(this.handleError);

    }

    updateEmailService(objEmailService:EmailServiceModel,id:string) {
        let body = JSON.stringify(objEmailService);
        return this._http.put(API_URL + this.apiRoute + "/" + id, body)
            .map(res => res.json())
            .catch(this.handleError);

    }

    getEmailServiceDetail():Observable < EmailServiceModel> {
        return this._http.get(API_URL + this.apiRoute)
            .map(res =><EmailServiceModel>res.json())
            .catch(this.handleError);
    }

    handleError(error) {
        console.log(error.json());
        return Observable.throw(error.json() || 'server error');
    }

}