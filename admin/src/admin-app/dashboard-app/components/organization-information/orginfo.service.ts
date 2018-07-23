import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {OrganizationModel} from './orginfo.model';
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {API_URL} from "../../../shared/configs/env.config";
import {Config} from "../../../shared/configs/general.config";
import {FileOperrationService} from '../../../shared/services/fileOperation.service';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError } from 'rxjs/operators/catchError';

@Injectable()
export class OrganizationInfoService {
    apiRoute:string = "organization/info";
    /* image Upload */
    progressObserver:any;
    progress:any;
    /* End Image Upload */
    constructor(private _http:HttpClient, private fileService:FileOperrationService) {

    }

    saveOrgInfo(objSave:OrganizationModel, file:File) {
        let body = JSON.stringify(objSave);
        return Observable.create((observer: any) => {
            let formData:FormData = new FormData(),
                xhr:XMLHttpRequest = new XMLHttpRequest();

            if (file) {
                formData.append('imageName', file);
            }
            formData.append('data', JSON.stringify(objSave));
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        observer.next(JSON.parse(xhr.response));
                        observer.complete();
                    } else {
                        observer.error(xhr.response);
                    }
                }
            };
            xhr.upload.onprogress = (event) => {
                this.progress = Math.round(event.loaded / event.total * 100);
                //this.progressObserver.next(this.progress);
            };
            xhr.open('POST', API_URL + this.apiRoute, true);
            xhr.setRequestHeader("Authorization", Config.AuthToken);
            xhr.send(formData);
        });
    }

    getCountryList() {
        return this._http.get('assets/country.json')//, options)
        .pipe(
            catchError(this.handleError)
        );
    }

    updateOrgInfo(objUpdate:OrganizationModel, file:File, id:string, imageDeleted:boolean) {
        let body = JSON.stringify(objUpdate);
        return Observable.create((observer: any) => {
            let formData:FormData = new FormData(),
                xhr:XMLHttpRequest = new XMLHttpRequest();

            if (file) {
                formData.append('imageName', file);
            }
            formData.append('data', JSON.stringify(objUpdate));
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        observer.next(JSON.parse(xhr.response));
                        observer.complete();
                    } else {
                        observer.error(xhr.response);
                    }
                }
            };
            xhr.upload.onprogress = (event) => {
                this.progress = Math.round(event.loaded / event.total * 100);
                //this.progressObserver.next(this.progress);
            };
            xhr.open('PUT', API_URL + this.apiRoute + "/" + id + "?imagedeleted=" + imageDeleted, true);
            xhr.setRequestHeader("Authorization", Config.AuthToken);
            xhr.send(formData);
        });

    }

    getOrgInfoDetail():Observable < OrganizationModel > {
        return this._http.get<OrganizationModel>(API_URL + this.apiRoute)
            .pipe(
                catchError(this.handleError)
            );
    }

    deleteImage(fileName:string, orgExt:string, path:string):Observable < any > {
        return this.fileService.deleteFile(fileName, orgExt, path, "image");
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