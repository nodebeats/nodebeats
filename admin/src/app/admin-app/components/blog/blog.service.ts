import {
    BlogCategoryModel,
    BlogMetaTagModel,
    BlogModel,
    BlogDocumentModel,
    BlogTagModel,
    BlogResponse, BlogCategoryResponse
} from './blog.model';
import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import{Config} from "../../../shared/configs/general.config";
import{API_URL} from "../../../shared/configs/env.config";
import {FileOperrationService} from '../../../shared/services/fileOperation.service';

@Injectable()
export class BlogService {
    blogCategoryApiRoute:string = "blogcategory";
    blogApiRoute:string = "blog";
    blogDocumentApiRoute:string = "blogdocument";
    blotTagApiRoute:string = "blogtag";
    blogMetaApiRoute:string = "blogseo";
    progressObserver:any;
    progress:any;

    constructor(private _http:Http, private  fileService:FileOperrationService) {
        this.progress = Observable.create(observer => {
            this.progressObserver = observer
        }).share();
    }


    /* Blog Category */
    saveBlogCategory(objCategory:BlogCategoryModel) {
        let body = JSON.stringify(objCategory);
        return this._http.post(API_URL + this.blogCategoryApiRoute, body)
            .map(res => res.json())
            .catch(this.handleError);
    }

    updateBlogCategory(objBlogCat:BlogCategoryModel) {
        let body = JSON.stringify(objBlogCat);
        return this._http.put(API_URL + this.blogCategoryApiRoute + "/" + objBlogCat._id, body)
            .map(res => res.json())
            .catch(this.handleError);
    }

    getBlogCategoryList(perPage:number, currentPage:number, active?:boolean):Observable < BlogCategoryResponse> {
        let queryString:string = "";
        queryString += perPage ? "?perpage=" + perPage : "";
        queryString += currentPage ? "&page=" + currentPage : "";
        if (perPage)
            queryString += active ? "&active=true" : "";
        else
            queryString += active ? "?active=true" : "";
        return this._http.get(API_URL + this.blogCategoryApiRoute + queryString)
            .map(res =><BlogCategoryResponse>res.json())
            .catch(this.handleError);
    }

    getBlogCategoryDetail(objId:string):Observable < BlogCategoryModel> {
        return this._http.get(API_URL + this.blogCategoryApiRoute + "/" + objId)
            .map(res =><BlogCategoryModel>res.json())
            .catch(this.handleError);
    }

    deleteBlogCategory(objDel:BlogCategoryModel):Observable<any> {
        let body = JSON.stringify({});
        return this._http.patch(API_URL + this.blogCategoryApiRoute + "/" + objDel._id, body)
            .map(res => res.json())
            .catch(this.handleError);
    }

    /* End News Category */

    /* Blog */
    saveBlog(objBlog:BlogModel, file:File):Observable<any> {
        return Observable.create(observer => {
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
        return Observable.create(observer => {
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
        let queryString:string = "";
        queryString += perPage ? "?perpage=" + perPage : "";
        queryString += currentPage ? "&page=" + currentPage : "";
        queryString += categoryId ? "&categoryid=" + categoryId : "";
        return this._http.get(API_URL + this.blogApiRoute + queryString)
            .map(res =><BlogResponse>res.json())
            .catch(this.handleError);
    }

    getBlogDetail(id:string):Observable < BlogModel > {
        return this._http.get(API_URL + this.blogApiRoute + "/" + id)
            .map(res =><BlogModel>res.json())
            .catch(this.handleError);
    }

    deleteBlog(objUpdate:BlogModel) {
        let body = JSON.stringify({});
        return this._http.patch(API_URL + this.blogApiRoute + "/" + objUpdate._id, body)
            .map(res => res.json())
            .catch(this.handleError);
    }

    /* End Blog */
    /*
     Blog Tag
     */

    getBlogTagList():Observable < BlogTagModel[] > {
        return this._http.get(API_URL + this.blotTagApiRoute)
            .map(res =><BlogTagModel[]>res.json())
            .catch(this.handleError);
    }

    /*
     END Blog Tag
     */
    deleteImage(fileName:string, orgExt:string, path:string):Observable < any > {
        return this.fileService.deleteFile(fileName, orgExt, path, "image");
    }

    /* Blog File */
    saveDocument(blogId:string, objSave:BlogDocumentModel, file:File):Observable<any> {
        return Observable.create(observer => {
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
        return Observable.create(observer => {
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
    //         .catch(this.handleError);
    //
    // }
    //

    // Use MIME type instead of Org Ext for document
    deleteDoc(fileName:string, mimeType:string, path:string):Observable < any > {
        return this.fileService.deleteFile(fileName, mimeType, path, "document");
    }

    getBlogDocList(blogId:string):Observable < BlogDocumentModel[]> {
        return this._http.get(API_URL + this.blogDocumentApiRoute + "/" + blogId)
            .map(res =><BlogDocumentModel[]>res.json())
            .catch(this.handleError);
    }


    getBlogDocDetail(blogId:string, docId:string):Observable < BlogDocumentModel> {
        return this._http.get(API_URL + this.blogDocumentApiRoute + "/" + blogId + "/" + docId)
            .map(res =><BlogDocumentModel>res.json())
            .catch(this.handleError);
    }


    deleteBlogDoc(blogId:string, docId:string):Observable < any> {
        var body = JSON.stringify({});
        return this._http.patch(API_URL + this.blogDocumentApiRoute + "/" + blogId + "/" + docId, body)
            .map(res =><any>res.json())
            .catch(this.handleError);
    }

    //
    // /* End Blog Image */

    /* Blog Meta Tag*/

    updateBlogMetaTag(objMeta:BlogMetaTagModel) {
        let body = JSON.stringify(objMeta);
        return this._http.put(API_URL + this.blogMetaApiRoute + "/" + objMeta._id, body)
            .map(res => res.json())
            .catch(this.handleError);
    }


    getBlogMetaTagDetail(blogId:string):Observable < BlogMetaTagModel> {
        return this._http.get(API_URL + this.blogMetaApiRoute + "/" + blogId)
            .map(res =><BlogMetaTagModel>res.json())
            .catch(this.handleError);
    }

    /*
     End Blog Meta
     */
    handleError(error) {
        return Observable.throw(error.json() || 'server error');
    }

}
