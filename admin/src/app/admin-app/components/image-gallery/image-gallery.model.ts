import {ImageProperties} from "../../../shared/models/image.model";
export class ImageGalleryModel {
    constructor() {
        this.active = false;
    }
    _id:string;
    imageName:string;
    imageTitle:string;
    imageAltText:string;
    imageDescription:string;
    coverImage:boolean;
    imageProperties:ImageProperties;
    active:boolean;
    addedBy:string;
    addedOn:string;
    updatedBy:string;
    updatedOn:string;
    deleted:boolean;
    deletedBy:string;
    deletedOn:string;

}
export class ImageGalleryResponse {
    dataList:ImageGalleryModel[];
    totalItems:number;
    currentPage:number;
}
export class ImageAlbumModel {
    constructor() {
        this.active = false;
    }
    _id:string;
    albumName:string;
    albumDescription:string;
    active:boolean;
    createdOn:string;
    addedBy:string;
    addedOn:string;
    updatedBy:string;
    updatedOn:string;
    deleted:boolean;
    deletedBy:string;
    deletedOn:string;
}
export class ImageAlbumResponse {
    dataList:ImageAlbumModel[];
    totalItems:number;
    currentPage:number;
}