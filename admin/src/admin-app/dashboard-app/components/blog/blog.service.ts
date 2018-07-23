import {
    BlogCategoryModel,
    BlogMetaTagModel,
    BlogModel,
    BlogDocumentModel,
    BlogTagModel,
    BlogResponse, BlogCategoryResponse
} from './blog.model';
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Config} from "../../../shared/configs/general.config";
import {API_URL} from "../../../shared/configs/env.config";
import {FileOperrationService} from '../../../shared/services/fileOperation.service';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError } from 'rxjs/operators/catchError';

@Injectable()
export class BlogService {
    blogCategoryApiRoute:string = "blogcategory";
    blogApiRoute:string = "blog";
    blogDocumentApiRoute:string = "blogdocument";
    blotTagApiRoute:string = "blogtag";
    blogMetaApiRoute:string = "blogseo";
    progressObserver:any;
    progress:any;

    constructor(private _http:HttpClient, private  fileService:FileOperrationService) {
        // this.progress = Observable.create(observer => {
        //     this.progressObserver = observer
        // }).share();
    }


    /* Blog Category */
    saveBlogCategory(objCategory:BlogCategoryModel) {
        let body = JSON.stringify(objCategory);
        return this._http.post(API_URL + this.blogCategoryApiRoute, body)
            .pipe(
                catchError(this.handleError)
            );
    }

    updateBlogCategory(objBlogCat:BlogCategoryModel) {
        let body = JSON.stringify(objBlogCat);
        return this._http.put(API_URL + this.blogCategoryApiRoute + "/" + objBlogCat._id, body)
            .pipe(
                catchError(this.handleError)
            );
    }

    getBlogCategoryList(perPage:number, currentPage:number, active?:boolean):Observable < BlogCategoryResponse> {
        // Initialize Params Object
        let query = new HttpParams();
        // Begin assigning parameters
        query = query.append('perpage', perPage.toString());
        query = query.append('page', currentPage.toString());
        if(active)
            query = query.append('active', active.toString());
        return this._http.get(API_URL + this.blogCategoryApiRoute, {params: query} )
            .pipe(
                catchError(this.handleError)
            );
    }

    getBlogCategoryDetail(objId:string):Observable < BlogCategoryModel> {
        return this._http.get<BlogCategoryModel>(API_URL + this.blogCategoryApiRoute + "/" + objId)
            .pipe(
                catchError(this.handleError)
            );
    }

    deleteBlogCategory(objDel:BlogCategoryModel):Observable<any> {
        let body = JSON.stringify({});
        return this._http.patch(API_URL + this.blogCategoryApiRoute + "/" + objDel._id, body)
            .pipe(
                catchError(this.handleError)
            );
    }

    /* End News Category */

    /* Blog */
    saveBlog(objBlog:BlogModel, file:File):Observable<any> {
        return Observable.create((observer: any) => {
            let formData:FormData = new FormData(),
                xhr:XMLHttpRequest = new XMLHttpRequest();

            if (file) {
                formData.append('imageName', file);
            }
            formData.append('data', JSON.stringify(objBlog));
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
            xhr.open('POST', API_URL + this.blogApiRoute, true);
            xhr.setRequestHeader("Authorization", Config.AuthToken);
            xhr.send(formData);
        });
    }

    updateBlog(objBlog:BlogModel, file:File, imageDeleted:boolean):Observable<any> {
        return Observable.create((observer: any) => {
            let formData:FormData = new FormData(),
                xhr:XMLHttpRequest = new XMLHttpRequest();

            if (file) {
                formData.append('imageName', file);
            }
            formData.append('data', JSON.stringify(objBlog));
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
            xhr.open('PUT', API_URL + this.blogApiRoute + "/" + objBlog._id + "?imagedeleted=" + imageDeleted, true);
            xhr.setRequestHeader("Authorization", Config.AuthToken);
            xhr.send(formData);
        });
    }

    getBlogList(perPage:number, currentPage:number, categoryId?:string):Observable < BlogResponse > {
        let query = new HttpParams();
        query = query.append('perpage', perPage.toString());
        query = query.append('page', currentPage.toString());
        if(categoryId)
            query = query.append('categoryid', categoryId.toString());
        return this._http.get<BlogResponse>(API_URL + this.blogApiRoute, {params: query})
            .pipe(
                catchError(this.handleError)
            );
    }

    getBlogDetail(id:string):Observable < BlogModel > {
        // console.log("BlogDetail", API_URL)
        return this._http.get<BlogModel>(API_URL + this.blogApiRoute + "/" + id)
            .pipe(
                catchError(this.handleError)
            );
    }

    deleteBlog(objUpdate:BlogModel) {
        let body = JSON.stringify({});
        return this._http.patch(API_URL + this.blogApiRoute + "/" + objUpdate._id, body)
            .pipe(
                catchError(this.handleError)
            );
    }

    /* End Blog */
    /*
     Blog Tag
     */

    getBlogTagList():Observable < BlogTagModel[] > {
        // console.log("Blog Tag List", API_URL);
        return this._http.get<BlogTagModel[]>(API_URL + this.blotTagApiRoute)
            .pipe(
                catchError(this.handleError)
            );
    }

    /*
     END Blog Tag
     */
    deleteImage(fileName:string, orgExt:string, path:string):Observable < any > {
        return this.fileService.deleteFile(fileName, orgExt, path, "image");
    }

    /* Blog File */
    saveDocument(blogId:string, objSave:BlogDocumentModel, file:File):Observable<any> {
        return Observable.create((observer: any) => {
            let formData:FormData = new FormData(),
                xhr:XMLHttpRequest = new XMLHttpRequest();
            if (file) {
                formData.append('documentName', file);
            }
            formData.append('data', JSON.stringify(objSave));
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        observer.next(JSON.parse(xhr.response));
                        observer.complete();
                    } else {
                        observer.error(JSON.parse(xhr.response))
                    }
                }
            };
            xhr.upload.onprogress = (event) => {
                this.progress = Math.round(event.loaded / event.total * 100);
                //this.progressObserver.next(this.progress);
            };
            xhr.open('POST', API_URL + this.blogDocumentApiRoute + "/" + blogId, true);
            xhr.setRequestHeader("Authorization", Config.AuthToken);
            xhr.send(formData);
        });
    }

    updateDocumnet(blogId:string, objUpdate:BlogDocumentModel, file:File, fileDeleted:boolean):Observable<any> {
        return Observable.create((observer: any) => {
            let formData:FormData = new FormData(),
                xhr:XMLHttpRequest = new XMLHttpRequest();

            if (file) {
                formData.append('documentName', file);
            }
            formData.append('data', JSON.stringify(objUpdate));
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
            xhr.open('PUT', API_URL + this.blogDocumentApiRoute + "/" + blogId + "/" + objUpdate._id + "?filedeleted=" + fileDeleted, true);
            xhr.setRequestHeader("Authorization", Config.AuthToken);
            xhr.send(formData);
        });
    }

    //
    // updateNewsCoverImage(newsId:string, prevCoverImageID:string, objBlogImage:NewsImageModel) {
    //     let body = JSON.stringify(objBlogImage);
    //     return this._http.patch(API_URL + this.newsImageApi + "/" + newsId + "/" + prevCoverImageID, body)
    //         .map(res => res.json())
    //         .pipe(
                // catchError(this.handleError)
            // );
    //
    // }
    //

    // Use MIME type instead of Org Ext for document
    deleteDoc(fileName:string, mimeType:string, path:string):Observable < any > {
        return this.fileService.deleteFile(fileName, mimeType, path, "document");
    }

    getBlogDocList(blogId:string):Observable < BlogDocumentModel[]> {
        return this._http.get<BlogDocumentModel[]>(API_URL + this.blogDocumentApiRoute + "/" + blogId)
            .pipe(
                catchError(this.handleError)
            );
    }


    getBlogDocDetail(blogId:string, docId:string):Observable < BlogDocumentModel> {
        return this._http.get<BlogDocumentModel>(API_URL + this.blogDocumentApiRoute + "/" + blogId + "/" + docId)
            .pipe(
                catchError(this.handleError)
            );
    }


    deleteBlogDoc(blogId:string, docId:string):Observable < any> {
        var body = JSON.stringify({});
        return this._http.patch(API_URL + this.blogDocumentApiRoute + "/" + blogId + "/" + docId, body)
            .pipe(
                catchError(this.handleError)
            );
    }

    //
    // /* End Blog Image */

    /* Blog Meta Tag*/

    updateBlogMetaTag(objMeta:BlogMetaTagModel) {
        let body = JSON.stringify(objMeta);
        return this._http.put(API_URL + this.blogMetaApiRoute + "/" + objMeta._id, body)
            .pipe(
                catchError(this.handleError)
            );
    }


    getBlogMetaTagDetail(blogId:string):Observable < BlogMetaTagModel> {
        return this._http.get<BlogMetaTagModel>(API_URL + this.blogMetaApiRoute + "/" + blogId)
            .pipe(
                catchError(this.handleError)
            );
    }

    /*
     End Blog Meta
     */
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
          return new ErrorObservable(error.error.message ? error.error.message : 'Something bad happened; please try again later.');
    }

}
