export class ImageModel {
    _id:string;
    imageName:string;
    imageTitle:string;
    imageAltText:string;
    coverImage:boolean;
    imageProperties:ImageProperties;
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
export class ImageProperties {
    imageExtension:string;
    imageMimeType:string;
    imageSize:string;
    imageOriginalName:string;
    imagePath:string;
}