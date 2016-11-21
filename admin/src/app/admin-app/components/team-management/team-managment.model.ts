import {ImageProperties} from "../../../shared/models/image.model";
export class TeamManagementModel {
    constructor(){
        this.active = false;
    }
    _id:string;
    teamMemberName:string;
    email:string;
    phoneNumber:string;
    facebookURL:string;
    twitterURL:string;
    googlePlusURL:string;
    linkedInURL:string;
    address:string;
    designation:string;
    description:string;
    hierarchyOrder:number;
    imageName:string;
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

export class TeamManagementResponse {
    dataList:TeamManagementModel[];
    totalItems:number;
    currentPage:number;
}