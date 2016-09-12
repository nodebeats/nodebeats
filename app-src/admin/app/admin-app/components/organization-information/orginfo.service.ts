import {OrganizationModel} from './orginfo.model';
import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import{API_URL} from "../../../shared/configs/env.config";
import{Config} from "../../../shared/configs/general.config";
import {FileOperrationService} from '../../../shared/services/fileOperation.service';

@Injectable()
export class OrganizationInfoService {
    apiRoute:string = "organization/info";
    /* image Upload */
    progressObserver:any;
    progress:any;
    /* End Image Upload */
    constructor(private _http:Http, private fileService:FileOperrationService) {

    }

    saveOrgInfo(objSave:OrganizationModel, file:File) {
        let body = JSON.stringify(objSave);
        return Observable.create(observer => {
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
                        console.log(xhr.response);
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
        return this._http.get(API_URL + this.apiRoute)
            .map(res =><OrganizationModel[]>res.json())
            .catch(this.handleError);
    }

    updateOrgInfo(objUpdate:OrganizationModel, file:File, imageDeleted:boolean) {
        let body = JSON.stringify(objUpdate);
        return Observable.create(observer => {
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
                        console.log(xhr.response);
                    }
                }
            };
            xhr.upload.onprogress = (event) => {
                this.progress = Math.round(event.loaded / event.total * 100);
                //this.progressObserver.next(this.progress);
            };
            xhr.open('PUT', API_URL + this.apiRoute + "/" + objUpdate._id + "?imagedeleted=" + imageDeleted, true);
            xhr.setRequestHeader("Authorization", Config.AuthToken);
            xhr.send(formData);
        });

    }

    getOrgInfoDetail():Observable < OrganizationModel > {
        return this._http.get(API_URL + this.apiRoute)
            .map(res =><OrganizationModel>res.json())
            .catch(this.handleError);
    }

    deleteImage(fileName:string, orgExt:string, path:string):Observable < any > {
        return this.fileService.deleteFile(fileName, orgExt, path, "image");

    }

    handleError(error) {
        console.log(error.json());
        return Observable.throw(error.json() || 'server error');
    }

}