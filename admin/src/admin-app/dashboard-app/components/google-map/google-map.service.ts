import {GoogleMapModel} from './google-map.model';
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {API_URL} from "../../../shared/configs/env.config";
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators/catchError';

@Injectable()
export class GoogleMapService {
    apiRoute:string = "maps";

    constructor(private _http:HttpClient) {

    }

    saveMap(objSave:GoogleMapModel) {
        let body = JSON.stringify(objSave);
        return this._http.post(API_URL + this.apiRoute, body)
            .pipe(
                catchError(this.handleError)
            );
    }

    updateMap(objUpdate:GoogleMapModel) {
        let body = JSON.stringify(objUpdate);
        return this._http.put(API_URL + this.apiRoute + "/" + objUpdate._id, body)
            .pipe(
                catchError(this.handleError)
            );   
    }

    getMapDetail():Observable < GoogleMapModel> {
        return this._http.get<GoogleMapModel>(API_URL + this.apiRoute)
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