export class TokenModel {
    _id:string;
    authorizationToken:string;
    userAgent:string;
    browser:string;
    ipAddress:boolean;
    expiresOn:string;
    userId:string;
    addedOn:string;
}

export class TokenResponse {
    dataList:TokenModel[];
    totalItems:number;
    currentPage:number;
}