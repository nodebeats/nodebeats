export class GoogleAnalyticsModel {
    constructor() {
        this.pollingInterval = 5; //  in Minutes
    }

    _id:string;
    trackingId:string;
    serviceAccountKeyFileName:string;
    docProperties:DocProperties;
    analyticsViewID:string;
    pollingInterval:number;
    addedBy:string;
    addedOn:string;
    updatedBy:string;
    updatedOn:string;
}
export class DocProperties {
    docPath:string;
}