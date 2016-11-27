import {ContactModel, ContactResponse} from './contact.model';
import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import{Config} from "../../../shared/configs/general.config";
import{ API_URL} from "../../../shared/configs/env.config";
@Injectable()
export class ContactService {
    apiRoute:string = "contact/info";


    constructor(private _http:Http) {

    }


    getContactList(perPage:number, currentPage:number):Observable < ContactResponse> {
        return this._http.get(API_URL + this.apiRoute + "?perpage=" + perPage + "&page=" + currentPage)
            .map(res =><ContactResponse>res.json())
            .catch(this.handleError);
    }

    getContactById(id:string):Observable < ContactModel> {
        return this._http.get(API_URL + this.apiRoute + "/" + id)
            .map(res =><ContactModel>res.json())
            .catch(this.handleError);
    }

    deleteContact(objUpdate:ContactModel) {
        objUpdate.deleted = true;
        let body = JSON.stringify({});
        return this._http.patch(API_URL + this.apiRoute + "/" + objUpdate._id, body)
            .map(res => res.json())
            .catch(this.handleError);

    }

    handleError(error) {
        console.log(error.json());
        return Observable.throw(error.json() || 'server error');
    }


}
