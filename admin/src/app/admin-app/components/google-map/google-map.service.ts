import {GoogleMapModel} from './google-map.model';
import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import{API_URL} from "../../../shared/configs/env.config";

@Injectable()
export class GoogleMapService {
    apiRoute:string = "maps";

    constructor(private _http:Http) {

    }

    saveMap(objSave:GoogleMapModel) {
        let body = JSON.stringify(objSave);
        return this._http.post(API_URL + this.apiRoute, body)
            .map(res => res.json())
            .catch(this.handleError);
    }

    updateMap(objUpdate:GoogleMapModel) {
        let body = JSON.stringify(objUpdate);
        return this._http.put(API_URL + this.apiRoute + "/" + objUpdate._id, body)
            .map(res => res.json())
            .catch(this.handleError);        
    }

    getMapDetail():Observable < GoogleMapModel> {
        return this._http.get(API_URL + this.apiRoute)
            .map(res =><GoogleMapModel>res.json())
            .catch(this.handleError);
    }

    handleError(error) {
        console.log(error.json());
        return Observable.throw(error.json() || 'server error');
    }

}