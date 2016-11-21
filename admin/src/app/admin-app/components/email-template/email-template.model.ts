export class EmailTemplateModel {
    constructor() {
        this.active = false;
        this.templateBody = "";
    }

    _id:string;
    templateName:string;
    emailSubject:string;
    emailFrom:string;
    templateBody:string;
    attachmentAvailabilityStatus:boolean;
    active:boolean;
    addedBy:string;
    addedOn:string;
    updatedBy:string;
    updatedOn:string;
    deleted:boolean;
    deletedBy:string;
    deletedOn:string;
}

export class EmailTempalteResponse {
    dataList:EmailTemplateModel[];
    currentPage:number = 1;
    totalItems:number = 0;
}