export class HtmlContentModel {
    constructor() {
        this.active = false;
    }
    _id:string;
    htmlContentTitle:string;
    htmlModuleContent:string;
    active:boolean;
    addedBy:string;
    addedOn:string;
    updatedBy:string;
    updatedOn:string;
    deleted:boolean;
    deletedBy:string;
    deletedOn:string;
}
export class HtmlContentResponse {
    dataList:HtmlContentModel[];
    totalItems:number;
    currentPage:number;
}