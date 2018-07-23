import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import {TestimonialModel, TestimonialResponse} from './testimonial.model';
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Config} from "../../../shared/configs/general.config";
import {API_URL} from "../../../shared/configs/env.config";
import {FileOperrationService} from '../../../shared/services/fileOperation.service';
import { XhrService } from '../../../shared/services/xhr.service';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError } from 'rxjs/operators/catchError';

@Injectable()
export class TestimonialService {
    apiRoute:string = "testimonial";
    progressObserver:any;
    progress:any;

    constructor(private xhrService: XhrService, private _http:HttpClient, private fileService:FileOperrationService) {
        // this.progress = Observable.create(observer => {
        //     this.progressObserver = observer
        // }).share();
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
        let queryString = new HttpParams();
        queryString = queryString.append('perpage', perPage.toString());
        queryString = queryString.append('page', currentPage.toString());
        return this._http.get<TestimonialResponse>(API_URL + this.apiRoute, {params: queryString})
            .pipe(
                catchError(this.handleError)
            );
    }


    getTestimonialDetail(testimonialId:string):Observable < TestimonialModel> {
        return this._http.get<TestimonialModel>(API_URL + this.apiRoute + "/" + testimonialId)
            .pipe(
                catchError(this.handleError)
            );
    }

    deleteTestimonial(objSlider:TestimonialModel):Observable < any> {
        let body = JSON.stringify({});
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
