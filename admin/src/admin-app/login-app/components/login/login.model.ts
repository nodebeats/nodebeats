import  {UserModel} from '../../../dashboard-app/components/user-management/user.model';
export class LoginModel {
    username:string;
    password:string;
    token:string; // Two Factor Token if Enabled
}

export class LoginResponse {
    success:boolean;
    message:string;
    token:string;
    status:string;
    tokenExpiryDate:string;
    isToken:boolean;
    twoFactorAuthEnabled:boolean;
    userId:string;
    userInfo:UserModel;

}