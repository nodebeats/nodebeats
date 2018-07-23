import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {API_URL} from "../../../shared/configs/env.config";
import {DashboardResponseModel} from "./dashboard.model";
import { ErrorObservable } from "rxjs/observable/ErrorObservable";
import { HttpErrorResponse, HttpClient } from "@angular/common/http";
import { catchError } from "rxjs/operators/catchError";
declare var gapi:any;

@Injectable()

export class DashboardService {
    accessTokenApiRoute:string = "google/accesstoken";
    realTimeApiRoute:string = "https://content.googleapis.com/analytics/v3/data/realtime?";

    constructor(private _http:HttpClient) {

    }

    getAccessToken():Observable<DashboardResponseModel> {
        return this._http.get<DashboardResponseModel>(API_URL + this.accessTokenApiRoute)
        .pipe(
            catchError(this.handleError)
        );
    }

    queryGoogleApi(params:any) {
        return new Promise((resolve, reject) => {
            var data = new gapi.analytics.report.Data({query: params});
            data.once('success', function (response: any) {
                resolve(response);
            })
                .once('error', function (response: any) {
                    reject(response);
                })
                .execute();
        });
    }

    queryGoogleRealtimeApi(params:any):Observable<any> {
        return this._http.get(this.realTimeApiRoute + params)
            .pipe(
                catchError(this.handleError)
            );
    }

    handleError(error: HttpErrorResponse) {
        console.log("Http Error Response", error)
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
          } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
              `Backend returned code ${error.status}, ` +
              `body was: ${error.error.message}`);
          }
          // return an ErrorObservable with a user-facing error message
          return new ErrorObservable(error.error.message? error.error.message : 'Something bad happened; please try again later.');
    }

}