import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TokenModel, TokenResponse } from './token-managment.model';
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { API_URL } from "../../../shared/configs/env.config";
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError } from 'rxjs/operators/catchError';

@Injectable()
export class TokenManagementService {
    apiRoute:string = "authtoken";
    apiRouteDeleteAll:string = "errordeleteall";
    apiRouteSendEmail:string = "log/notify/error";

    constructor(private _http:HttpClient) {
    }

    deleteLogById(objUpdate:TokenModel) {
        let body = JSON.stringify(objUpdate);
        return this._http.delete(API_URL + this.apiRoute + "/" + objUpdate._id)
            .pipe(
                catchError(this.handleError)
            );
    }

    deleteAllLog() {
        let isdelete:boolean = true;
        let body = JSON.stringify({isdeleted: isdelete});
        return this._http.delete(API_URL + this.apiRoute)
            .pipe(
                catchError(this.handleError)
            );
    }

    getApplicationLog():Observable <TokenModel[]> {
        return this._http.get<TokenModel[]>(API_URL + this.apiRoute)
            .pipe(
                catchError(this.handleError)
            );
    }

    getApplicationById(id:string):Observable <TokenModel> {
        return this._http.get<TokenModel>(API_URL + this.apiRoute + "/" + id)
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
