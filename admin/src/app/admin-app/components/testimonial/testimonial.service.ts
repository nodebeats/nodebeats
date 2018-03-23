import {TestimonialModel, TestimonialResponse} from './testimonial.model';
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import{Config} from "../../../shared/configs/general.config";
import{API_URL} from "../../../shared/configs/env.config";
import {FileOperrationService} from '../../../shared/services/fileOperation.service';
import { XhrService } from '../../../shared/services/xhr.service';

@Injectable()
export class TestimonialService {
    apiRoute:string = "testimonial";
    progressObserver:any;
    progress:any;

    constructor(private xhrService: XhrService, private _http:Http, private fileService:FileOperrationService) {
        this.progress = Observable.create(observer => {
            this.progressObserver = observer
        }).share();
    }

    deleteImage(fileName:string, orgExt:string, path:string):Observable < any > {
        return this.fileService.deleteFile(fileName, orgExt, path,"image");
    }

    saveTestimonial(objSave:TestimonialModel, file:File):Observable<any> {
        return this.xhrService.xhrRequest<TestimonialModel, any>('POST', this.apiRoute, "imageName", objSave, file);
    }

    updateTestimonial(objUpdate:TestimonialModel, file:File, imageDeleted:boolean, testimonialId: string):Observable<any> {
        return this.xhrService.xhrRequest<TestimonialModel, any>('PUT', this.apiRoute, "imageName", objUpdate, file, testimonialId, imageDeleted);
    }

    getTestimonialList(perPage:number, currentPage:number):Observable < TestimonialResponse> {

        let queryString:string = "";
        queryString += perPage ? "?perpage=" + perPage : "";
        queryString += currentPage ? "&page=" + currentPage : "";
        return this._http.get(API_URL + this.apiRoute + queryString)
            .map(res =><TestimonialResponse>res.json())
            .catch(this.handleError);
    }


    getTestimonialDetail(testimonialId:string):Observable < TestimonialModel> {
        return this._http.get(API_URL + this.apiRoute + "/" + testimonialId)
            .map(res =><TestimonialModel>res.json())
            .catch(this.handleError);
    }

    deleteTestimonial(objSlider:TestimonialModel):Observable < any> {
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
