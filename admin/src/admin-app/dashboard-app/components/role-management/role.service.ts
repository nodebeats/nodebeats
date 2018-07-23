import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import {RoleModel} from './role.model';
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {API_URL} from "../../../shared/configs/env.config";
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError } from 'rxjs/operators/catchError';

@Injectable()
export class RoleService {
    apiRoute:string = "roles";
    progressObserver:any;
    progress:any;

    constructor(private _http:HttpClient) {
        // this.progress = Observable.create(observer => {
        //     this.progressObserver = observer
        // }).share();
    }

    /* News Category */
    saveRole(objSave:RoleModel) {
        let body = JSON.stringify(objSave);
        return this._http.post(API_URL + this.apiRoute, body)
            .pipe(
                catchError(this.handleError)
            );
    }

    updateRole(objUpdate:RoleModel,roleId:string) {
        let body = JSON.stringify(objUpdate);
        return this._http.put(API_URL + this.apiRoute + "/" + roleId, body)
            .pipe(
                catchError(this.handleError)
            );
    }

    getRoleList(active?:boolean):Observable < RoleModel[]> {
        let queryString = new HttpParams();
        if (active)
            queryString = queryString.append('active', active.toString());
        return this._http.get<RoleModel[]>(API_URL + this.apiRoute, {params: queryString})
            .pipe(
                catchError(this.handleError)
            );
    }

    getRoleDetail(objId:string):Observable < RoleModel> {
        return this._http.get<RoleModel>(API_URL + this.apiRoute + "/" + objId)
            .pipe(
                catchError(this.handleError)
            );
    }

    deleteRole(objDel:RoleModel):Observable<any> {
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
