import {ImageProperties} from "../../../shared/models/image.model";
export class TestimonialModel {
    constructor(){
        this.active=false;
    }
    _id:string;
    personName:string;
    testimonialContent:string;
    organization:string;
    designation:string;
    email:string;
    facebookURL:string;
    twitterURL:string;
    gPlusURL:string;
    linkedInURL:string;
    testimonialDate:string;
    imageName:string;
    imageTitle:string;
    imageAltText:string;
    imageProperties:ImageProperties;
    active:boolean = false;
    addedBy:string;
    addedOn:string;
    updatedBy:string;
    updatedOn:string;
    deleted:boolean;
    deletedBy:string;
    deletedOn:string;
}

export class TestimonialResponse {
    dataList:TestimonialModel[];
    totalItems:number;
    currentPage:number;
}
