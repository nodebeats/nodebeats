import {ContactModel, ContactResponse} from './contact.model';
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import { API_URL} from "../../../shared/configs/env.config";
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError } from 'rxjs/operators/catchError';

@Injectable()

export class ContactService {
    apiRoute:string = "contact/info";


    constructor(private _http:HttpClient) {

    }


    getContactList(perPage:number, currentPage:number):Observable < ContactResponse> {
        let query = new HttpParams();
        query = query.append('perpage', perPage.toString());
        query = query.append('page', currentPage.toString());
        return this._http.get<ContactResponse>(API_URL + this.apiRoute, {params: query})
            .pipe(
                catchError(this.handleError)
            );
    }

    getContactById(id:string):Observable < ContactModel> {
        return this._http.get<ContactModel>(API_URL + this.apiRoute + "/" + id)
            .pipe(
                catchError(this.handleError)
            );
    }

    deleteContact(objUpdate:ContactModel) {
        objUpdate.deleted = true;
        let body = JSON.stringify({});
        return this._http.patch(API_URL + this.apiRoute + "/" + objUpdate._id, body)
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
          return new ErrorObservable(error.error.message? error.error.message :
            'Something bad happened; please try again later.');
    }


}
