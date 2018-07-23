import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {JSON_URL} from"../configs/env.config";
import { catchError } from 'rxjs/operators/catchError';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

@Injectable()

export class CountryListService {
    jsonFile:string = "country.json";

    constructor(private _http:HttpClient) {
    }

    // getCountryList():Observable<CountryModel[]> {
    //     return this._http.get(JSON_URL + this.jsonFile)
    //         .map(res =><CountryModel[]>res.json())
    //         .catch(this.handleError);
    // }
    
    getCountryList(): Observable<any> {
        // get users from api
        return this._http.get('assets/country.json')//, options)
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
              `body was: ${error.error}`);
          }
          // return an ErrorObservable with a user-facing error message
          return new ErrorObservable(
            'Something bad happened; please try again later.');
      }

}
export class CountryModel {
    name:string;
    code:string;
}