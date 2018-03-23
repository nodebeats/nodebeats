import {PartnerResponse,PartnerModel} from './partner.model';
import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import{Config} from "../../../shared/configs/general.config";
import{ API_URL} from "../../../shared/configs/env.config";
import {FileOperrationService} from '../../../shared/services/fileOperation.service';

@Injectable()
export class PartnerService {
    apiRoute:string = "partner";
    progressObserver:any;
    progress:any;

    constructor(private _http:Http, private fileService:FileOperrationService) {
        this.progress = Observable.create(observer => {
            this.progressObserver = observer
        }).share();
    }

    deleteImage(fileName:string, orgExt:string, path:string):Observable < any > {
        return this.fileService.deleteFile(fileName, orgExt, path, "image");
    }

    savePartner(objSave:PartnerModel, file:File):Observable<any> {
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
                        observer.error(JSON.parse(xhr.response));
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

    updatePartner(objUpdate:PartnerModel, file:File, imageDeleted:boolean, partnerId: string):Observable<any> {
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
                        observer.error(JSON.parse(xhr.response));
                    }
                }
            };
            xhr.upload.onprogress = (event) => {
                this.progress = Math.round(event.loaded / event.total * 100);
                //this.progressObserver.next(this.progress);
            };
            xhr.open('PUT', API_URL + this.apiRoute + "/" + partnerId + "?imagedeleted=" + imageDeleted, true);
            xhr.setRequestHeader("Authorization", Config.AuthToken);
            xhr.send(formData);
        });
    }

    getPartnerList():Observable < PartnerResponse> {

        return this._http.get(API_URL + this.apiRoute)
            .map(res =><PartnerResponse>res.json())
            .catch(this.handleError);
    }


    getPartnerDetail(sliderId:string):Observable < PartnerModel> {
        return this._http.get(API_URL + this.apiRoute + "/" + sliderId)
            .map(res =><PartnerModel>res.json())
            .catch(this.handleError);
    }

    deletePartner(objSlider:PartnerModel):Observable < any> {
        let body = JSON.stringify(objSlider);
        return this._http.patch(API_URL + this.apiRoute + "/" + objSlider._id, body)
            .map(res =><any>res.json())
            .catch(this.handleError);
    }


    handleError(error) {
        console.log(error.json());
        return Observable.throw(error.json() || 'server error');
    }

}