import {ImageProperties}from "../../../shared/models/image.model";
export class PartnerModel {
    constructor() {
        this.active = false;
    }
    _id:string;
    partnerName:string;
    imageName:string;    
    imageAltText:string;
    linkURL:string;
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

export class PartnerResponse {
    dataList:PartnerModel[];
    totalItems:number;
    currentPage:number;
}