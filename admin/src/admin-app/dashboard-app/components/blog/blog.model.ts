/**
 * Created by sanedev on 6/27/16.
 */
import {ImageProperties}from'../../../shared/models/image.model';
export class BlogCategoryModel {
    constructor() {
        this.active = false;
    }
    _id:string;
    categoryName:string;
    urlSlogCategory:string;
    categoryDescription:string;
    active:boolean;
    addedBy:string;
    addedOn:string;
    updatedBy:string;
    updatedOn:string;
    deleted:boolean;
    deletedBy:string;
    deletedOn:string;
}

export class BlogModel {
    constructor() {
        this.categoryId = "";
        this.blogDescription = "";
        this.status = "active";
        this.active = false;
    }
    _id:string;
    blogTitle:string;
    urlSlog:string;
    categoryId:string;
    blogSummary:string;
    blogDescription:string;
    tags:any;
    bannerImage:string;
    bannerImageTitle:string;
    bannerImageAltText:string;
    imageProperties:ImageProperties;
    author:string;
    seoEntry:BlogMetaTagModel;
    status:string;
    active:boolean;
    allowComment:boolean;
    view:number;
    relatedFiles:BlogDocumentModel[];
    addedBy:string;
    addedOn:string;
    updatedBy:string;
    updatedOn:string;
    deleted:boolean;
    deletedBy:string;
    deletedOn:string;
}

export class BlogMetaTagModel {
    _id:string;
    metaKeyword:any;
    titleTag:string;
    metaDescription:string;
    metaAuthor:string;
}

export class BlogTagModel {
    _id:string;
    tag:string;
    urlSlogTag:string;
}
export class BlogDocumentModel {
    constructor() {
        this.active = false;
    }
    _id:string;
    documentName:string;
    docProperties:DocumentProperties;
    documentTitle:string;
    active:boolean;
    addedBy:string;
    addedOn:string;
    updatedBy:string;
    updatedOn:string;
    deleted:boolean;
    deletedBy:string;
    deletedOn:string;
}

export class BlogResponse {
    dataList:BlogModel[];
    totalItems:number;
    currentPage:number;
}
export class BlogCategoryResponse {
    dataList:BlogCategoryModel[];
    totalItems:number;
    currentPage:number;
}

class DocumentProperties {
    documentMimeType:string;
    docPath:string;
}
export class BlogDocResponse {
    relatedFiles:BlogDocumentModel[];
}