import {ImageModel, ImageProperties} from '../../../shared/models/image.model';

export class UserModel {
    constructor() {
        this.userRole = "";
        this.active = false;
        this.securityQuestion = "";
    }

    _id:string;
    firstName:string;
    middleName:string;
    lastName:string;
    email:string;
    password:string;
    phoneNumber:string;
    mobileNumber:string;
    securityQuestion:string;
    securityAnswer:string;
    active:boolean;
    userRole:string;
    username:string;
    imageAltText:string;
    imageTitle:string;
    imageName:string;
    imageProperties:ImageProperties;
    addedBy:string;
    addedOn:string;
    blocked:boolean;
    twoFactorAuthEnabled:boolean = false;
}

export class UserResponse {
    dataList:UserModel[];
    currentPage:number = 1;
    totalItems:number = 0;
}

export class UserSecurityModel {
    constructor() {
        this.securityQuestion = "";
    }

    _id:string;
    securityQuestion:string;
    securityAnswer:string;
}

export class UserSettingModel {
    _id:string;
    twoFactorAuthEnabled:boolean = false;
}