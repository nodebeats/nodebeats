import {RoleModel} from './role.model';
import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import{API_URL} from "../../../shared/configs/env.config";

@Injectable()
export class RoleService {
    apiRoute:string = "roles";
    progressObserver:any;
    progress:any;

    constructor(private _http:Http) {
        this.progress = Observable.create(observer => {
            this.progressObserver = observer
        }).share();
    }

    /* News Category */
    saveRole(objSave:RoleModel) {
        let body = JSON.stringify(objSave);
        return this._http.post(API_URL + this.apiRoute, body)
            .map(res => res.json())
            .catch(this.handleError);
    }

    updateRole(objUpdate:RoleModel) {
        let body = JSON.stringify(objUpdate);
        return this._http.put(API_URL + this.apiRoute + "/" + objUpdate._id, body)
            .map(res => res.json())
            .catch(this.handleError);
    }

    getRoleList(active?:boolean):Observable < RoleModel[]> {
        var queryString = "";
        if (active)
            queryString = "?active=true";
        return this._http.get(API_URL + this.apiRoute + queryString)
            .map(res =><RoleModel[]>res.json())
            .catch(this.handleError);
    }

    getRoleDetail(objId:string):Observable < RoleModel> {
        return this._http.get(API_URL + this.apiRoute + "/" + objId)
            .map(res =><RoleModel>res.json())
            .catch(this.handleError);
    }

    deleteRole(objDel:RoleModel):Observable<any> {
        let body = JSON.stringify(objDel);
        return this._http.patch(API_URL + this.apiRoute + "/" + objDel._id, body)
            .map(res => res.json())
            .catch(this.handleError);
    }

    handleError(error) {
        console.log(error.json());
        return Observable.throw(error.json() || 'server error');
    }

}