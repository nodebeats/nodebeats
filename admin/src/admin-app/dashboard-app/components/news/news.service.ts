import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import {NewsModel, NewsCategoryModel, NewsResponse, NewsImageModel, NewsImageResponse} from './news.model';
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Config} from "../../../shared/configs/general.config";
import {API_URL} from "../../../shared/configs/env.config";
import {FileOperrationService} from '../../../shared/services/fileOperation.service';
import { XhrService } from '../../../shared/services/xhr.service';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError } from 'rxjs/operators/catchError';

@Injectable()
export class NewsService {
    NewsCategoryApiRoute:string = "newscategory";
    newsApiRoute:string = "news";
    newsImageApi:string = "newsimage";
    progressObserver:any;
    progress:any;

    constructor(private xhrService: XhrService, private _http:HttpClient, private fileService:FileOperrationService) {
        // this.progress = Observable.create(observer => {
        //     this.progressObserver = observer
        // }).share();
    }

    /* News Category */
    saveNewsCategory(objNewsCat:NewsCategoryModel) {
        let body = JSON.stringify(objNewsCat);
        return this._http.post(API_URL + this.NewsCategoryApiRoute, body)
            .pipe(
                catchError(this.handleError)
            );
    }

    updateNewsCategory(objNewsCat:NewsCategoryModel, id:string) {
        let body = JSON.stringify(objNewsCat);
        return this._http.put(API_URL + this.NewsCategoryApiRoute + "/" + id, body)
            .pipe(
                catchError(this.handleError)
            );
    }

    getNewsCategoryList(active?:boolean):Observable < NewsCategoryModel[]> {
        let query = new HttpParams();
        if (active)
            query = query.append('active', active.toString());
        return this._http.get<NewsCategoryModel[]>(API_URL + this.NewsCategoryApiRoute, {params: query})
            .pipe(
                catchError(this.handleError)
            );
    }

    getNewsCategoryDetail(objId:string):Observable < NewsCategoryModel> {
        return this._http.get<NewsCategoryModel>(API_URL + this.NewsCategoryApiRoute + "/" + objId)
            .pipe(
                catchError(this.handleError)
            );
    }

    deleteNewsCategory(objDel:NewsCategoryModel):Observable<any> {
        let body = JSON.stringify({});
        return this._http.patch(API_URL + this.NewsCategoryApiRoute + "/" + objDel._id, body)
            .pipe(
                catchError(this.handleError)
            );
    }

    /* End News Category */

    /* News */
    saveNews(objNews:NewsModel, file:File):Observable<any> {
        return Observable.create((observer: any) => {
            let formData:FormData = new FormData(),
                xhr:XMLHttpRequest = new XMLHttpRequest();

            if (file) {
                formData.append('imageName', file);
            }
            formData.append('data', JSON.stringify(objNews));
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
            xhr.open('POST', API_URL + this.newsApiRoute, true);
            xhr.setRequestHeader("Authorization", Config.AuthToken);
            xhr.send(formData);
        });
    }

    updateNews(objNews:NewsModel, file:File, imageDeleted:boolean, _id: string):Observable<any> {
        return Observable.create((observer: any) => {
            let formData:FormData = new FormData(),
                xhr:XMLHttpRequest = new XMLHttpRequest();

            if (file) {
                formData.append('imageName', file);
            }
            formData.append('data', JSON.stringify(objNews));
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        observer.next(JSON.parse(xhr.response));
                        observer.complete();
                    } else {
                        observer.error(xhr.response);
                    }
                }
            };
            xhr.upload.onprogress = (event) => {
                this.progress = Math.round(event.loaded / event.total * 100);
                //this.progressObserver.next(this.progress);
            };
            xhr.open('PUT', API_URL + this.newsApiRoute + "/" + _id + "?imagedeleted=" + imageDeleted, true);
            xhr.setRequestHeader("Authorization", Config.AuthToken);
            xhr.send(formData);
        });
    }

    getNewsList(perPage:number, currentPage:number, categoryId?:string):Observable < NewsResponse > {
        let query = new HttpParams();
        query = query.append('perpage', perPage.toString());
        query = query.append('page', currentPage.toString());
        if(categoryId)
            query = query.append('categoryid', categoryId.toString()); 
        return this._http.get<NewsResponse>(API_URL + this.newsApiRoute, {params: query})
            .pipe(
                catchError(this.handleError)
            );
    }

    getNewsDetail(id:string):Observable < NewsModel > {
        return this._http.get<NewsModel>(API_URL + this.newsApiRoute + "/" + id)
            .pipe(
                catchError(this.handleError)
            );
    }

    deleteNews(objUpdate:NewsModel) {
        let body = JSON.stringify({});
        return this._http.patch(API_URL + this.newsApiRoute + "/" + objUpdate._id, body)
            .pipe(
                catchError(this.handleError)
            );
    }

    /* End News */

    deleteImage(fileName:string, orgExt:string, path:string):Observable < any > {
        return this.fileService.deleteFile(fileName, orgExt, path, "image");
    }

    /* News Image */
    saveNewsImage(newsId:string, objSave:NewsImageModel, file:File):Observable<any> {
        return this.xhrService.xhrRequest<NewsImageModel, any>('POST', this.newsImageApi + "/" + newsId, "imageName", objSave, file);
    }

    updateNewsImage(newsId:string, newsImageId: string, objUpdate:NewsImageModel, file:File, imageDeleted:boolean):Observable<any> {
        return this.xhrService.xhrRequest<NewsImageModel, any>('PUT', this.newsImageApi + "/" + newsId , "imageName", objUpdate, file, newsImageId, imageDeleted);
    }

    updateNewsCoverImage(newsId:string, prevCoverImageID:string, objNewsImage:NewsImageModel) {
        let body = JSON.stringify(objNewsImage);
        return this._http.patch(API_URL + this.newsImageApi + "/" + newsId + "/" + prevCoverImageID, body)
            .pipe(
                catchError(this.handleError)
            );
    }

    getNewsImageList(newsId:string):Observable < NewsImageResponse> {
        return this._http.get<NewsImageResponse>(API_URL + this.newsImageApi + "/" + newsId)
            .pipe(
                catchError(this.handleError)
            );
    }

    getNewsImageDetail(newsId:string, newsImageId:string):Observable < NewsImageModel> {
        return this._http.get<NewsImageModel>(API_URL + this.newsImageApi + "/" + newsId + "/" + newsImageId)
            .pipe(
                catchError(this.handleError)
            );
    }

    deleteNewsImage(newsId:string, newsImageId:string):Observable < any> {
        return this._http.delete(API_URL + this.newsImageApi + "/" + newsId + "/" + newsImageId)
            .pipe(
                catchError(this.handleError)
            );
    }
    /* End News Image */

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
