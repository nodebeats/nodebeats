import {ImageSliderModel} from './image-slider.model';
import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import{Config} from "../../../shared/configs/general.config";
import{ API_URL} from "../../../shared/configs/env.config";
import {FileOperrationService} from '../../../shared/services/fileOperation.service';
import { XhrService } from '../../../shared/services/xhr.service';

@Injectable()
export class ImageSliderService {
    apiRoute:string = "imageslider";
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

    saveImageSlider(objSave:ImageSliderModel, file:File):Observable<any> {
        return this.xhrService.xhrRequest<ImageSliderModel, any>('POST', this.apiRoute, "imageName", objSave, file);

    }

    updateImageSlider(objUpdate:ImageSliderModel, file:File,id:string, imageDeleted:boolean):Observable<any> {
        return this.xhrService.xhrRequest<ImageSliderModel, any>('PUT', this.apiRoute, "imageName", objUpdate, file, id, imageDeleted);

    }

    getImageSliderList():Observable < ImageSliderModel[]> {

        return this._http.get(API_URL + this.apiRoute)
            .map(res =><ImageSliderModel[]>res.json())
            .catch(this.handleError);
    }


    getImageSliderDetail(sliderId:string):Observable < ImageSliderModel> {
        return this._http.get(API_URL + this.apiRoute + "/" + sliderId)
            .map(res =><ImageSliderModel>res.json())
            .catch(this.handleError);
    }

    deleteImageSlider(objSlider:ImageSliderModel):Observable < any> {
        let body = JSON.stringify({});
        return this._http.patch(API_URL + this.apiRoute + "/" + objSlider._id, body)
            .map(res =><any>res.json())
            .catch(this.handleError);
    }


    handleError(error) {
        console.log(error.json());
        return Observable.throw(error.json() || 'server error');
    }

}
