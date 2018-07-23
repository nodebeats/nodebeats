import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import {ImageAlbumModel, ImageAlbumResponse, ImageGalleryModel, ImageGalleryResponse} from './image-gallery.model';
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Config} from "../../../shared/configs/general.config";
import {API_URL} from "../../../shared/configs/env.config";
import {FileOperrationService} from '../../../shared/services/fileOperation.service';
import { XhrService } from '../../../shared/services/xhr.service';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError } from 'rxjs/operators/catchError';

@Injectable()
export class ImageGalleryService {
    imageAlbumApiRoute:string = "gallery/album";
    imageGalleryApiRoute:string = "gallery/albumimage";
    progressObserver:any;
    progress:any;
    

    constructor(private xhrService: XhrService, private _http:HttpClient, private fileService:FileOperrationService) {
        // this.progress = Observable.create(observer => {
        //     this.progressObserver = observer
        // }).share();
    }

    /*  Image Album */

    saveImageAlbum(objSave:ImageAlbumModel) {
        let body = JSON.stringify(objSave);
        return this._http.post(API_URL + this.imageAlbumApiRoute, body)
            .pipe(
                catchError(this.handleError)
            );
    }

    updateImageAlbum(objUpdate:ImageAlbumModel,id:String) {
        let body = JSON.stringify(objUpdate);
        return this._http.put(API_URL + this.imageAlbumApiRoute + "/" + id, body)
            .pipe(
                catchError(this.handleError)
            );
    }

    getImageAlbumList(perPage:number, currentPage:number):Observable < ImageAlbumResponse> {
        let query = new HttpParams();
        query = query.append('perpage', perPage.toString());
        query = query.append('page', currentPage.toString());
        return this._http.get<ImageAlbumResponse>(API_URL + this.imageAlbumApiRoute, {params: query})
            .pipe(
                catchError(this.handleError)
            );
    }

    getImageAlbumDetail(objId:string):Observable < ImageAlbumModel> {
        return this._http.get<ImageAlbumModel>(API_URL + this.imageAlbumApiRoute + "/" + objId)
            .pipe(
                catchError(this.handleError)
            );
    }

    deleteImageAlbum(objDel:ImageAlbumModel):Observable<any> {
        let body = JSON.stringify({});
        return this._http.patch(API_URL + this.imageAlbumApiRoute + "/" + objDel._id, body)
            .pipe(
                catchError(this.handleError)
            );
    }


    /*  End Image Album */


    /*  Image Gallery */
    saveImage(albumId:string, objSave:any, file:File):Observable<any> {
        return this.xhrService.xhrRequest<any, any>('POST', this.imageGalleryApiRoute + "/" + albumId, "imageName", objSave, file)
    }

    updateImage(albumId:string, objUpdate:ImageGalleryModel, file:File,imageId:string, imageDeleted:boolean):Observable<any> {
        return this.xhrService.xhrRequest<ImageGalleryModel, any>('PUT', this.imageGalleryApiRoute + "/" + albumId , "imageName", objUpdate, file, imageId, imageDeleted);
    }

    updateCoverImage(albumId:string, objImage:ImageGalleryModel) {
        let body = JSON.stringify({});
        return this._http.patch(API_URL + this.imageGalleryApiRoute + "/" + albumId + "/" + objImage._id, body)
            .pipe(
                catchError(this.handleError)
            );
    }

    getAlbumImageList(albumId:string, perPage:number, currentPage:number):Observable < ImageGalleryResponse> {
        let query = new HttpParams();
        query = query.append('perpage', perPage.toString());
        query = query.append('page', currentPage.toString());
        return this._http.get<ImageGalleryResponse>(API_URL + this.imageGalleryApiRoute + "/" + albumId, {params: query})
            .pipe(
                catchError(this.handleError)
            );
    }


    getImageDetail(albumId:string, imageId:string):Observable < ImageGalleryModel> {
        return this._http.get<ImageGalleryModel>(API_URL + this.imageGalleryApiRoute + "/" + albumId + "/" + imageId)
            .pipe(
                catchError(this.handleError)
            );
    }

    deleteAlbumImage(albumId:string, imageId:string):Observable < any> {
        return this._http.delete(API_URL + this.imageGalleryApiRoute + "/" + albumId + "/" + imageId)
            .pipe(
                catchError(this.handleError)
            );
    }

    deleteImageFile(fileName:string, orgExt:string, path:string):Observable < any > {
        return this.fileService.deleteFile(fileName, orgExt, path, "image");
    }

    deleteImage(fileName:string, orgExt:string, path:string):Observable < any > {
        return this.fileService.deleteFile(fileName, orgExt, path, "image");

    }

    /* End  Image Gallery */

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
