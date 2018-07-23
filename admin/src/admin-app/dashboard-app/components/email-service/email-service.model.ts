export class EmailServiceModel {
    constructor() {
        this.serviceProviderType = "mailgun";
        this.rateLimit = 0;
    }

    _id:string;
    serviceProviderType:string;
    host:string;
    port:string;
    secure:boolean;
    authUserName:string;
    authPassword:string;
    pool:boolean;
    api_Key:string;
    api_Secret:string;
    api_User:string;
    domain:string;
    rateLimit:number;
    addedBy:string;
    addedOn:string;
    updatedBy:string;
    updatedOn:string;
}
