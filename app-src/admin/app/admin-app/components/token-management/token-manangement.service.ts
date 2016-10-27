import {TokenModel, TokenResponse} from './token-managment.model';
import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import{API_URL} from "../../../shared/configs/env.config";

@Injectable()
export class TokenManagementService {
    apiRoute:string = "authtoken";
    apiRouteDeleteAll:string = "errordeleteall";
    apiRouteSendEmail:string = "log/notify/error";

    constructor(private _http:Http) {
    }

    deleteLogById(objUpdate:TokenModel) {
        let body = JSON.stringify(objUpdate);
        return this._http.delete(API_URL + this.apiRoute + "/" + objUpdate._id)
            .map(res => res.json())
            .catch(this.handleError);

    }

    deleteAllLog() {

        let isdelete:boolean = true;
        let body = JSON.stringify({isdeleted: isdelete});
        return this._http.delete(API_URL + this.apiRoute)
            .map(res => res.json())
            .catch(this.handleError);

    }

    getApplicationLog():Observable <TokenModel[]> {

        return this._http.get(API_URL + this.apiRoute)
            .map(res =><TokenModel[]>res.json())
            .catch(this.handleError);
    }

    getApplicationById(id:string):Observable <TokenModel> {
        return this._http.get(API_URL + this.apiRoute + "/" + id)
            .map(res =><TokenModel>res.json())
            .catch(this.handleError);
    }


    handleError(error:Response) {
        console.log(error.json());
        return Observable.throw(error.json() || 'server error');
    }


}
