import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {EmailServiceModel} from './email-service.model';
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {API_URL} from "../../../shared/configs/env.config";
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError } from 'rxjs/operators/catchError';

@Injectable()
export class EmailServiceService {
    apiRoute:string = "emailservice";

    constructor(private _http:HttpClient) {

    }

    saveEmailService(objEmailService:EmailServiceModel) {
        let body = JSON.stringify(objEmailService);
        return this._http.post(API_URL + this.apiRoute, body)
            .pipe(
                catchError(this.handleError)
            );
    }

    updateEmailService(objEmailService:EmailServiceModel,id:string) {
        let body = JSON.stringify(objEmailService);
        return this._http.put(API_URL + this.apiRoute + "/" + id, body)
            .pipe(
                catchError(this.handleError)
            );
    }

    getEmailServiceDetail():Observable < EmailServiceModel> {
        return this._http.get<EmailServiceModel>(API_URL + this.apiRoute)
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