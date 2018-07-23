/**
 * Created by sanedev on 5/17/16.
 */
import { HttpClient } from '@angular/common/http';
import { CommentSettingModel } from './comment.model';
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { API_URL } from "../../../shared/configs/env.config";
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError } from 'rxjs/operators/catchError';

@Injectable()
export class CommentSettingService {
    apiRoute:string = "commentsetting";

    constructor(private _http:HttpClient) {

    }

    saveCommentSettings(objSave:CommentSettingModel):Observable<any> {
        let body = JSON.stringify(objSave);
        return this._http.post(API_URL + this.apiRoute, body)
            .pipe(
                catchError(this.handleError)
            );
    }

    updateCommentSettings(objUpdate:CommentSettingModel, commentId: string) {
        let body = JSON.stringify(objUpdate);
        return this._http.put(API_URL + this.apiRoute + "/" + commentId, body)
            .pipe(
                catchError(this.handleError)
            );

    }

    getCommentSettings():Observable < CommentSettingModel > {
        return this._http.get<CommentSettingModel>(API_URL + this.apiRoute)
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
