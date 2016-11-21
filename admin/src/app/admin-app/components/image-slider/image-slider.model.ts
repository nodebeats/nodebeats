import {ImageProperties}from "../../../shared/models/image.model";
export class ImageSliderModel {
    constructor() {
        this.active = false;
    }
    _id:string;
    imageName:string;
    imageTitle:string;
    imageAltText:string;
    imagePrimaryContent:string;
    imageSecondaryContent:string;
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

