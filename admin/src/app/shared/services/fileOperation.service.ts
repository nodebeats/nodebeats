import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import{API_URL} from "../configs/env.config";
@Injectable()
export class FileOperrationService {
    private apiRoute:string = "deletefile";

    constructor(private _http:Http) {
    }


    deleteFile(fileName:string, orgExt:string, path:string, fileType:string):Observable < any > {
        let body = JSON.stringify({});
        return this._http.delete(API_URL + this.apiRoute + "?filename=" + fileName + "&type=" + fileType + "&orgext=" + orgExt + "&path=" + path)
            .map(res =><any>res.json())
            .catch(this.handleError);
    }

    handleError(error) {
        console.log(error.json());
        return Observable.throw(error.json() || 'server error');
    }


}