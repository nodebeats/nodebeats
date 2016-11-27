import {EmailTemplateModel, EmailTempalteResponse} from './email-template.model';
import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import{Config} from "../../../shared/configs/general.config";
import{ API_URL} from "../../../shared/configs/env.config";
@Injectable()
export class EmailTemplateService {
    apiRoute:string = "emailtemplate";


    constructor(private _http:Http) {

    }

    saveEmailTemplate(objSave:EmailTemplateModel) {
        let body = JSON.stringify(objSave);
        return this._http.post(API_URL + this.apiRoute, body)
            .map(res => res.json())
            .catch(this.handleError);

    }

    updateEmailTemplate(objUpdate:EmailTemplateModel) {
        let body = JSON.stringify(objUpdate);
        return this._http.put(API_URL + this.apiRoute + "/" + objUpdate._id, body)
            .map(res => res.json())
            .catch(this.handleError);
    }

    deleteTemplate(objUpdate:EmailTemplateModel) {
        objUpdate.deleted = true;
        let body = JSON.stringify({});
        return this._http.patch(API_URL + this.apiRoute + "/" + objUpdate._id, body)
            .map(res => res.json());
    }

    getEmailTemplate(perPage:number, currentPage:number):Observable < EmailTempalteResponse> {
        return this._http.get(API_URL + this.apiRoute + "?perpage=" + perPage + "&page=" + currentPage)
            .map(res =><EmailTempalteResponse>res.json())
            .catch(this.handleError);
    }

    getEmailTemplateById(id:string):Observable < EmailTemplateModel> {
        return this._http.get(API_URL + this.apiRoute + "/" + id)
            .map(res =><EmailTemplateModel>res.json())
            .catch(this.handleError);
    }

    handleError(error) {
        console.log(error.json());
        return Observable.throw(error.json() || 'server error');
    }


}
