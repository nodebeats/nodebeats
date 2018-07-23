import {ImageSliderModel} from './image-slider.model';
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Config} from "../../../shared/configs/general.config";
import { API_URL} from "../../../shared/configs/env.config";
import {FileOperrationService} from '../../../shared/services/fileOperation.service';
import { XhrService } from '../../../shared/services/xhr.service';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError } from 'rxjs/operators/catchError';

@Injectable()
export class ImageSliderService {
    apiRoute:string = "imageslider";
    progressObserver:any;
    progress:any;

    constructor(private xhrService:XhrService,private _http:HttpClient, private fileService:FileOperrationService) {
        // this.progress = Observable.create((observer: any) => {
        //     this.progressObserver = observer
        // }).share();
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
        return this._http.get<ImageSliderModel[]>(API_URL + this.apiRoute)
            .pipe(
                catchError(this.handleError)
            );
    }

    getImageSliderDetail(sliderId:string):Observable < ImageSliderModel> {
        return this._http.get<ImageSliderModel>(API_URL + this.apiRoute + "/" + sliderId)
            .pipe(
                catchError(this.handleError)
            );
    }

    deleteImageSlider(objSlider:ImageSliderModel):Observable < any> {
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
