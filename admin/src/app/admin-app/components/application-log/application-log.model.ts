export class ApplicationLogModel {
    _id:string;
    errorMessage:string;
    errorStack:string;
    errorType:string;
    errorNotified:boolean;
    errorNotifiedDate:string;
    addedBy:string;
    addedOn:string;
    deleted:boolean;
    deletedBy:string;
    deletedOn:string;
}

export class ApplicationLogResponse {
    dataList:ApplicationLogModel[];
    totalItems:number;
    currentPage:number;
}