import {HtmlContentModel, HtmlContentResponse} from './html-content.model';
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import{Config} from "../../../shared/configs/general.config";
import{ API_URL} from "../../../shared/configs/env.config";

@Injectable()
export class HtmlContentService {
    apiRoute:string = "htmlcontent";


    constructor(private _http:Http) {

    }


    saveHtmlEditor(objSave:HtmlContentModel) {
        let body = JSON.stringify(objSave);
        return this._http.post(API_URL + this.apiRoute, body)
            .map(res => res.json())
            .catch(this.handleError);
    }

    updateHtmlEditor(objUpdate:HtmlContentModel) {
        let body = JSON.stringify(objUpdate);
        return this._http.put(API_URL + this.apiRoute + "/" + objUpdate._id, body)
            .map(res => res.json())
            .catch(this.handleError);

    }

    deleteHtmlEditor(objUpdate:HtmlContentModel) {
        objUpdate.deleted = true;
        let body = JSON.stringify(objUpdate);
        return this._http.patch(API_URL + this.apiRoute + "/" + objUpdate._id, body)
            .map(res => res.json())
            .catch(this.handleError);
    }

    getHtmlEditorList(perPage:number, currentPage:number):Observable < HtmlContentResponse> {
        return this._http.get(API_URL + this.apiRoute + "?perpage=" + perPage + "&page=" + currentPage)
            .map(res =><HtmlContentResponse>res.json())
            .catch(this.handleError);
    }

    getHtmlEditorById(id:string):Observable < HtmlContentModel> {
        return this._http.get(API_URL + this.apiRoute + "/" + id)
            .map(res =><HtmlContentModel>res.json())
            .catch(this.handleError);
    }

    handleError(error) {
        console.log(error.json());
        return Observable.throw(error.json() || 'server error');
    }

}