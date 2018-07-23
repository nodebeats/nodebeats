import {ApiAccessModel} from './api-access.model';
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {API_URL} from "../../../shared/configs/env.config";
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { catchError } from 'rxjs/operators/catchError';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

@Injectable()
export class ApiAccessService {
    apiRoute:string = "access";
    progressObserver:any;
    progress:any;

    constructor(private _http:HttpClient) {
        // this.progress = Observable.create(observer => {
        //     this.progressObserver = observer
        // }).share();
    }

    /* News Category */
    saveAccess(objSave:ApiAccessModel) {
        let body = JSON.stringify(objSave);
        return this._http.post(API_URL + this.apiRoute, body)
            .pipe(
                catchError(this.handleError)
            );
    }

    updateAccess(objUpdate:ApiAccessModel,id:string) {
        let body = JSON.stringify(objUpdate);
        return this._http.put(API_URL + this.apiRoute + "/" + id, body)
            .pipe(
                catchError(this.handleError)
            );
    }

    getAccessList(active?:boolean):Observable < ApiAccessModel[]> {
        var queryString = "";
        if (active)
            queryString = "?active=true";
        return this._http.get<ApiAccessModel[]>(API_URL + this.apiRoute + queryString)
            .pipe(
                catchError(this.handleError)
            );
    }

    getAccessDetail(objId:string):Observable < ApiAccessModel> {
        return this._http.get<ApiAccessModel>(API_URL + this.apiRoute + "/" + objId)
            .pipe(
                catchError(this.handleError)
            );
    }

    deleteAccess(objDel:ApiAccessModel):Observable<any> {
        let body = JSON.stringify({});
        return this._http.patch(API_URL + this.apiRoute + "/" + objDel._id, body)
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
