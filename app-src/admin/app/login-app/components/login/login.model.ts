import  {UserModel} from '../../../admin-app/components/user-management/user.model';
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
    isToken:boolean;
    twoFactorAuthEnabled:boolean;
    userId:string;
    userInfo:UserModel;

}