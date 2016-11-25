import {ImageProperties} from "../../../shared/models/image.model";
export class EventModel {
    constructor() {
        this.active = false;
    }
    _id:string;
    eventTitle:string;
    eventDescription:string;
    venue:string;
    venueAddress:string;
    startDate:any;
    endDate:any;
    imageName:string;
    imageTitle:string;
    imageAltText:string;
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

export class EventResponse {
    dataList:EventModel[];
    currentPage:number = 1;
    totalItems:number = 0;
}
