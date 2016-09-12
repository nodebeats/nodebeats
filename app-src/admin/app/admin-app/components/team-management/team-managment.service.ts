import {TeamManagementModel, TeamManagementResponse} from './team-managment.model';
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import{Config} from "../../../shared/configs/general.config";
import{ API_URL} from "../../../shared/configs/env.config";
import {FileOperrationService} from '../../../shared/services/fileOperation.service';

@Injectable()
export class TeamManagementService {
    apiRoute:string = "team";
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

    saveTeamMember(objSave:TeamManagementModel, file:File):Observable<any> {
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

    updateTeamMember(objUpdate:TeamManagementModel, file:File, imageDeleted:boolean):Observable<any> {
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
                        observer.error(JSON.parse(xhr.response))
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

    getTeamMemberList():Observable < TeamManagementResponse> {

        return this._http.get(API_URL + this.apiRoute)
            .map(res =><TeamManagementResponse>res.json())
            .catch(this.handleError);
    }


    getTeamMemberDetail(testimonialId:string):Observable < TeamManagementModel> {
        return this._http.get(API_URL + this.apiRoute + "/" + testimonialId)
            .map(res =><TeamManagementModel>res.json())
            .catch(this.handleError);
    }

    sortTeamOrder(memberId:String, order:number, sort:string) {
        let body = JSON.stringify({sort: sort});
        return this._http.patch(API_URL + "member/hierarchy/" + memberId + "/" + order, body)
            .map(res =><any>res.json())
            .catch(this.handleError);
    }

    deleteTeamMember(objSlider:TeamManagementModel):Observable < any> {
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