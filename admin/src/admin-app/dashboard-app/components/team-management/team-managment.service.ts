import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import {TeamManagementModel, TeamManagementResponse} from './team-managment.model';
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Config} from "../../../shared/configs/general.config";
import {API_URL} from "../../../shared/configs/env.config";
import {FileOperrationService} from '../../../shared/services/fileOperation.service';
import { XhrService } from '../../../shared/services/xhr.service';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError } from 'rxjs/operators/catchError';

@Injectable()
export class TeamManagementService {
    apiRoute:string = "team";
    progressObserver:any;
    progress:any;

    constructor(private xhrService:XhrService,private _http:HttpClient, private fileService:FileOperrationService) {
        // this.progress = Observable.create(observer => {
        //     this.progressObserver = observer
        // }).share();
    }

    deleteImage(fileName:string, orgExt:string, path:string):Observable < any > {
        return this.fileService.deleteFile(fileName, orgExt, path, "image");
    }

    saveTeamMember(objSave:TeamManagementModel, file:File):Observable<any> {
        return this.xhrService.xhrRequest<TeamManagementModel, any>('POST', this.apiRoute, "imageName", objSave, file);
    }

    updateTeamMember(objUpdate:TeamManagementModel,id:string, file:File, imageDeleted:boolean):Observable<any> {
        return this.xhrService.xhrRequest<TeamManagementModel, any>('PUT', this.apiRoute, "imageName", objUpdate, file, id, imageDeleted);
    }

    getTeamMemberList(perPage:number, currentPage:number):Observable < TeamManagementResponse> {
        let queryString = new HttpParams();
        queryString = queryString.append('perpage', perPage.toString());
        queryString = queryString.append('page', currentPage.toString());        
        return this._http.get<TeamManagementResponse>(API_URL + this.apiRoute, {params: queryString})
            .pipe(
                catchError(this.handleError)
            );
    }

    getTeamMemberDetail(testimonialId:string):Observable < TeamManagementModel> {
        return this._http.get<TeamManagementModel>(API_URL + this.apiRoute + "/" + testimonialId)
            .pipe(
                catchError(this.handleError)
            );
    }

    sortTeamOrder(memberId:String, order:number, sort:string) {
        let body = JSON.stringify({sort: sort});
        return this._http.patch(API_URL + "member/hierarchy/" + memberId + "/" + order, body)
            .pipe(
                catchError(this.handleError)
            );
    }

    deleteTeamMember(objSlider:TeamManagementModel):Observable < any> {
        let body = JSON.stringify(objSlider);
        return this._http.patch(API_URL + this.apiRoute + "/" + objSlider._id, body)
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