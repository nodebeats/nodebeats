import {ApiAccessModel} from './api-access.model';
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import{API_URL} from "../../../shared/configs/env.config";

@Injectable()
export class ApiAccessService {
    apiRoute:string = "access";
    progressObserver:any;
    progress:any;

    constructor(private _http:Http) {
        this.progress = Observable.create(observer => {
            this.progressObserver = observer
        }).share();
    }

    /* News Category */
    saveAccess(objSave:ApiAccessModel) {
        let body = JSON.stringify(objSave);
        return this._http.post(API_URL + this.apiRoute, body)
            .map(res => res.json())
            .catch(this.handleError);
    }

    updateAccess(objUpdate:ApiAccessModel) {
        let body = JSON.stringify(objUpdate);
        return this._http.put(API_URL + this.apiRoute + "/" + objUpdate._id, body)
            .map(res => res.json())
            .catch(this.handleError);
    }

    getAccessList(active?:boolean):Observable < ApiAccessModel[]> {
        var queryString = "";
        if (active)
            queryString = "?active=true";
        return this._http.get(API_URL + this.apiRoute + queryString)
            .map(res =><ApiAccessModel[]>res.json())
            .catch(this.handleError);
    }

    getAccessDetail(objId:string):Observable < ApiAccessModel> {
        return this._http.get(API_URL + this.apiRoute + "/" + objId)
            .map(res =><ApiAccessModel>res.json())
            .catch(this.handleError);
    }

    deleteAccess(objDel:ApiAccessModel):Observable<any> {
        let body = JSON.stringify({});
        return this._http.patch(API_URL + this.apiRoute + "/" + objDel._id, body)
            .map(res => res.json())
            .catch(this.handleError);
    }

    handleError(error) {
        console.log(error.json());
        return Observable.throw(error.json() || 'server error');
    }

}
