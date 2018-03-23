/**
 * Created by sanedev on 5/17/16.
 */
import {CommentSettingModel} from './comment.model';
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import{API_URL} from "../../../shared/configs/env.config";

@Injectable()
export class CommentSettingService {
    apiRoute:string = "commentsetting";

    constructor(private _http:Http) {

    }

    saveCommentSettings(objSave:CommentSettingModel):Observable<any> {
        let body = JSON.stringify(objSave);
        return this._http.post(API_URL + this.apiRoute, body)
            .map(res => res.json())
            .catch(this.handleError);
    }

    updateCommentSettings(objUpdate:CommentSettingModel, commentId: string) {
        let body = JSON.stringify(objUpdate);
        return this._http.put(API_URL + this.apiRoute + "/" + commentId, body)
            .map(res => res.json())
            .catch(this.handleError);

    }

    getCommentSettings():Observable < CommentSettingModel > {
        return this._http.get(API_URL + this.apiRoute)
            .map(res =><CommentSettingModel>res.json())
            .catch(this.handleError);
    }

    handleError(error) {
        return Observable.throw(error.json() || 'server error');
    }

}
