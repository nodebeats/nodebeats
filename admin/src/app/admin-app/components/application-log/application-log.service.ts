import {ApplicationLogModel, ApplicationLogResponse} from './application-log.model';
import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import{API_URL} from "../../../shared/configs/env.config";

@Injectable()
export class ApplicationLogService {
    apiRoute:string = "error";
    apiRouteDeleteAll:string = "errordeleteall";
    apiRouteSendEmail:string = "log/notify/error";

    constructor(private _http:Http) {
    }

    deleteLogById(objUpdate:ApplicationLogModel) {
        objUpdate.deleted = true;
        let body = JSON.stringify(objUpdate);
        return this._http.put(API_URL + this.apiRoute + "/" + objUpdate._id, body)
            .map(res => res.json())
            .catch(this.handleError);

    }

    deleteAllLog() {

        let isdelete:boolean = true;
        let body = JSON.stringify({isdeleted: isdelete});
        return this._http.put(API_URL + this.apiRouteDeleteAll , body)
            .map(res => res.json())
            .catch(this.handleError);

    }

    getApplicationLog(perPage:number, currentPage:number, startDate?:string, endDate?:string):Observable <ApplicationLogResponse> {
        let searchQueryString:string = "";
        searchQueryString += startDate ? "&startdate=" + startDate : "";
        searchQueryString += endDate ? "&enddate=" + endDate : "";
        return this._http.get(API_URL + this.apiRoute + "?perpage=" + perPage + "&page=" + currentPage + searchQueryString)
            .map(res =><ApplicationLogResponse>res.json())
            .catch(this.handleError);
    }

    getApplicationById(id:string):Observable <ApplicationLogModel> {
        return this._http.get(API_URL + this.apiRoute + "/" + id)
            .map(res =><ApplicationLogModel>res.json())
            .catch(this.handleError);
    }

    sendLogEmailToSupport() {
        let body = JSON.stringify({body: ""});
      return this._http.put(API_URL + this.apiRouteSendEmail, body)
            .map(res => res.json())
            .catch(this.handleError);
    }

    handleError(error:Response) {
        console.log(error.json());
        return Observable.throw(error.json() || 'server error');
    }


}
