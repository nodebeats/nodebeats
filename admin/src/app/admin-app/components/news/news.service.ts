import {NewsModel, NewsCategoryModel, NewsResponse, NewsImageModel, NewsImageResponse} from './news.model';
import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import{Config} from "../../../shared/configs/general.config";
import{API_URL} from "../../../shared/configs/env.config";
import {FileOperrationService} from '../../../shared/services/fileOperation.service';
import { XhrService } from '../../../shared/services/xhr.service';

@Injectable()
export class NewsService {
    NewsCategoryApiRoute:string = "newscategory";
    newsApiRoute:string = "news";
    newsImageApi:string = "newsimage";
    progressObserver:any;
    progress:any;

    constructor(private xhrService: XhrService, private _http:Http, private fileService:FileOperrationService) {
        this.progress = Observable.create(observer => {
            this.progressObserver = observer
        }).share();
    }

    /* News Category */
    saveNewsCategory(objNewsCat:NewsCategoryModel) {
        let body = JSON.stringify(objNewsCat);
        return this._http.post(API_URL + this.NewsCategoryApiRoute, body)
            .map(res => res.json())
            .catch(this.handleError);
    }

    updateNewsCategory(objNewsCat:NewsCategoryModel, id:string) {
        let body = JSON.stringify(objNewsCat);
        return this._http.put(API_URL + this.NewsCategoryApiRoute + "/" + id, body)
            .map(res => res.json())
            .catch(this.handleError);
    }

    getNewsCategoryList(active?:boolean):Observable < NewsCategoryModel[]> {
        var queryString = "";
        if (active)
            queryString = "?active=true";
        return this._http.get(API_URL + this.NewsCategoryApiRoute + queryString)
            .map(res =><NewsCategoryModel[]>res.json())
            .catch(this.handleError);
    }

    getNewsCategoryDetail(objId:string):Observable < NewsCategoryModel> {
        return this._http.get(API_URL + this.NewsCategoryApiRoute + "/" + objId)
            .map(res =><NewsCategoryModel>res.json())
            .catch(this.handleError);
    }

    deleteNewsCategory(objDel:NewsCategoryModel):Observable<any> {
        let body = JSON.stringify({});
        return this._http.patch(API_URL + this.NewsCategoryApiRoute + "/" + objDel._id, body)
            .map(res => res.json())
            .catch(this.handleError);
    }

    /* End News Category */

    /* News */
    saveNews(objNews:NewsModel, file:File):Observable<any> {
        return Observable.create(observer => {
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
        return Observable.create(observer => {
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
        let queryString:string = "";
        queryString += perPage ? "?perpage=" + perPage : "";
        queryString += currentPage ? "&page=" + currentPage : "";
        queryString += categoryId ? "&categoryid=" + categoryId : "";
        return this._http.get(API_URL + this.newsApiRoute + queryString)
            .map(res =><NewsResponse>res.json())
            .catch(this.handleError);
    }

    getNewsDetail(id:string):Observable < NewsModel > {
        return this._http.get(API_URL + this.newsApiRoute + "/" + id)
            .map(res =><NewsModel>res.json())
            .catch(this.handleError);
    }

    deleteNews(objUpdate:NewsModel) {
        let body = JSON.stringify({});
        return this._http.patch(API_URL + this.newsApiRoute + "/" + objUpdate._id, body)
            .map(res => res.json())
            .catch(this.handleError);
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
            .map(res => res.json())
            .catch(this.handleError);
    }

    getNewsImageList(newsId:string):Observable < NewsImageResponse> {
        return this._http.get(API_URL + this.newsImageApi + "/" + newsId)
            .map(res =><NewsImageResponse>res.json())
            .catch(this.handleError);
    }

    getNewsImageDetail(newsId:string, newsImageId:string):Observable < NewsImageModel> {
        return this._http.get(API_URL + this.newsImageApi + "/" + newsId + "/" + newsImageId)
            .map(res =><NewsImageModel>res.json())
            .catch(this.handleError);
    }

    deleteNewsImage(newsId:string, newsImageId:string):Observable < any> {
        return this._http.delete(API_URL + this.newsImageApi + "/" + newsId + "/" + newsImageId)
            .map(res =><any>res.json())
            .catch(this.handleError);
    }
    /* End News Image */

    handleError(error) {
        console.log(error.json());
        return Observable.throw(error.json() || 'server error');
    }
}
