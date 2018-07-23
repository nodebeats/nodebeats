import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import {EmailTemplateModel, EmailTempalteResponse} from './email-template.model';
import {Injectable} from "@angular/core";
import { API_URL} from "../../../shared/configs/env.config";
import {Observable} from "rxjs/Observable";
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError } from 'rxjs/operators/catchError';

@Injectable()

export class EmailTemplateService {
    apiRoute:string = "emailtemplate";

    constructor(private _http:HttpClient) {

    }

    saveEmailTemplate(objSave:EmailTemplateModel) {
        let body = JSON.stringify(objSave);
        return this._http.post(API_URL + this.apiRoute, body)
            .pipe(
                catchError(this.handleError)
            );

    }

    updateEmailTemplate(objUpdate:EmailTemplateModel, id: string) {
        let body = JSON.stringify(objUpdate);
        return this._http.put(API_URL + this.apiRoute + "/" + id, body)
            .pipe(
                catchError(this.handleError)
            );
    }

    deleteTemplate(objUpdate:EmailTemplateModel) {
        objUpdate.deleted = true;
        let body = JSON.stringify({});
        return this._http.patch(API_URL + this.apiRoute + "/" + objUpdate._id, body)
            .pipe(
                catchError(this.handleError)
            );
    }

    getEmailTemplate(perPage:number, currentPage:number):Observable < EmailTempalteResponse> {
        let query = new HttpParams();
        query = query.append('perpage', perPage.toString());
        query = query.append('page', currentPage.toString());
        return this._http.get<EmailTempalteResponse>(API_URL + this.apiRoute, {params: query})
            .pipe(
                catchError(this.handleError)
            );
    }

    getEmailTemplateById(id:string):Observable < EmailTemplateModel> {
        return this._http.get<EmailTemplateModel>(API_URL + this.apiRoute + "/" + id)
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