import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import{API_URL} from "../../../shared/configs/env.config";
import {DashboardResponseModel} from "./dashboard.model";
declare var gapi:any;
@Injectable()
export class DashboardService {
    accessTokenApiRoute:string = "google/accesstoken";
    realTimeApiRoute:string = "https://content.googleapis.com/analytics/v3/data/realtime?";

    constructor(private _http:Http) {

    }

    getAccessToken():Observable<DashboardResponseModel> {
        return this._http.get(API_URL + this.accessTokenApiRoute)
            .map(res=><DashboardResponseModel>res.json())
            .catch(err=>this.handleError(err));
    }

    queryGoogleApi(params:any) {
        return new Promise((resolve, reject) => {
            var data = new gapi.analytics.report.Data({query: params});
            data.once('success', function (response) {
                resolve(response);
            })
                .once('error', function (response) {
                    reject(response);
                })
                .execute();
        });
    }

    queryGoogleRealtimeApi(params:any):Observable<any> {
        debugger;
        return this._http.get(this.realTimeApiRoute + params)
            .map(res=>res.json())
            .catch(err=>this.handleError(err));
    }

    handleError(error) {
        console.log(error.json());
        return Observable.throw(error.json() || 'server error');
    }

}