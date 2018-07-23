import {ApplicationLogModel, ApplicationLogResponse} from './application-log.model';
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {API_URL} from "../../../shared/configs/env.config";
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError } from 'rxjs/operators/catchError';

@Injectable()
export class ApplicationLogService {
    apiRoute:string = "error";
    apiRouteDeleteAll:string = "errordeleteall";
    apiRouteSendEmail:string = "log/notify/error";

    constructor(private _http:HttpClient) {
    }

    deleteLogById(objUpdate:ApplicationLogModel) {
        objUpdate.deleted = true;
        let body = JSON.stringify(objUpdate);
        return this._http.put(API_URL + this.apiRoute + "/" + objUpdate._id, body)
            .pipe(
                catchError(this.handleError)
            );
    }

    deleteAllLog() {

        let isdelete:boolean = true;
        let body = JSON.stringify({isdeleted: isdelete});
        return this._http.put(API_URL + this.apiRouteDeleteAll , body)
            .pipe(
                catchError(this.handleError)
            );
    }

    getApplicationLog(perPage:number, currentPage:number, startDate?:string, endDate?:string):Observable <ApplicationLogResponse> {
        let searchQueryString = new HttpParams();
        searchQueryString = searchQueryString.append('perpage', perPage.toString());
        searchQueryString = searchQueryString.append('page', currentPage.toString());
        if(startDate)
            searchQueryString = searchQueryString.append('startdate', startDate.toString());
        if(endDate)
            searchQueryString = searchQueryString.append('enddate', endDate.toString());
        return this._http.get<ApplicationLogResponse>(API_URL + this.apiRoute, { params: searchQueryString})
            .pipe(
                catchError(this.handleError)
            );
    }

    getApplicationById(id:string):Observable <ApplicationLogModel> {
        return this._http.get<ApplicationLogModel>(API_URL + this.apiRoute + "/" + id)
            .pipe(
                catchError(this.handleError)
            );
    }

    sendLogEmailToSupport() {
        let body = JSON.stringify({body: ""});
      return this._http.put(API_URL + this.apiRouteSendEmail, body)
            .pipe(
                catchError(this.handleError)
            );
    }

    handleError(error: HttpErrorResponse) {
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
          return new ErrorObservable(error.error.message ? error.error.message : 
            'Something bad happened; please try again later.');
    }


}
