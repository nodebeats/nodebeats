import {TeamManagementModel, TeamManagementResponse} from './team-managment.model';
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import{Config} from "../../../shared/configs/general.config";
import{API_URL} from "../../../shared/configs/env.config";
import {FileOperrationService} from '../../../shared/services/fileOperation.service';
import { XhrService } from '../../../shared/services/xhr.service';

@Injectable()
export class TeamManagementService {
    apiRoute:string = "team";
    progressObserver:any;
    progress:any;

    constructor(private xhrService:XhrService,private _http:Http, private fileService:FileOperrationService) {
        this.progress = Observable.create(observer => {
            this.progressObserver = observer
        }).share();
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
        let queryString:string = "";
        queryString += perPage ? "?perpage=" + perPage : "";
        queryString += currentPage ? "&page=" + currentPage : "";
        return this._http.get(API_URL + this.apiRoute+queryString)
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