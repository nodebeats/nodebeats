import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {API_URL} from "../configs/env.config";
import { catchError } from 'rxjs/operators/catchError';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

@Injectable()

export class FileOperrationService {
    private apiRoute:string = "deletefile";

    constructor(private _http:HttpClient) {
    }


    deleteFile(fileName:string, orgExt:string, path:string, fileType:string):Observable < any > {
        // let body = JSON.stringify({});
        let query = new HttpParams();
        query = query.append('filename', fileName);
        query = query.append('type', fileType);
        query = query.append('orgext', orgExt);
        query = query.append('path', path);
        return this._http.delete(API_URL + this.apiRoute, {params: query})
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