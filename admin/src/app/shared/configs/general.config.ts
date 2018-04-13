//import 'cloudinary';
//declare var cloudinary:any;
import {HOST_URL} from './env.config';
import {UserModel} from "../../admin-app/components/user-management/user.model";

export const AUTH_TOKEN_KEY = "NodeBeatAuthToken";
export const ADMIN_ROUTE = "AdminRoute";
export const USERINFO = "UserInfo";
export const EXPIRES_ON = "DateTime";
export class Config {
    static AuthToken = window.localStorage.getItem(AUTH_TOKEN_KEY);
    static AdminRoute = window.localStorage.getItem(ADMIN_ROUTE);
    static UserInfo = window.localStorage.getItem(USERINFO);
    static EXPIRES_ON = window.localStorage.getItem(EXPIRES_ON);
    /*
     cloudinary is declared in manual typings and script in included in head tag
     */
    static Cloudinary = cloudinary.Cloudinary.new({cloud_name: "nodebeats-v3"});
    static DefaultAvatar = HOST_URL + "/assets/img/defaults/default_avatar.png";
    static DefaultImage = HOST_URL + "/assets/img/defaults/default_img.png";
    static DefaultWideImage = HOST_URL + "/assets/img/defaults/default_wide_img.png";
    static InvalidImage = HOST_URL + "/assets/img/defaults/invalid_image.png";
    static LoginImage = HOST_URL + '/assets/img/SB-admin.png';
    static GoogleAuthImage = HOST_URL + '/assets/img/google_auth_silver.png';

    static clearToken():void {
        window.localStorage.clear();
        this.AuthToken = null;
        this.AdminRoute = null;
        this.UserInfo = null;
    }
    
    static getAuthTokenValid():boolean {
        this.EXPIRES_ON = window.localStorage.getItem(EXPIRES_ON);

       var now:number        = new Date(new Date().getTime()).getTime(),
            expires_on: number = new Date(this.EXPIRES_ON).getTime(),
            diff:number       = expires_on - now ;

           diff = Math.floor(diff / 1e3);
        return  (diff/3600) > 1 ? true: false;
    }

    static setLoggedInToken(auth:string, userInfo:UserModel,expiryDate:string):void {
        window.localStorage.setItem(AUTH_TOKEN_KEY, auth);
        window.localStorage.setItem(USERINFO, JSON.stringify(userInfo));
        window.localStorage.setItem(EXPIRES_ON, expiryDate);
    }

    static getAuthToken():string {
        return this.AuthToken = window.localStorage.getItem(AUTH_TOKEN_KEY);
    }

    static getUserInfoToken():string {
        return this.UserInfo = window.localStorage.getItem(USERINFO);
    }

    static setAdminRouteToken(auth:string):void {
        window.localStorage.setItem(ADMIN_ROUTE, auth);
    }

    static removeAdminRouteToken():void {
        window.localStorage.removeItem(ADMIN_ROUTE);
    }

    static getAdminRoute():string {
        return this.AdminRoute = window.localStorage.getItem(ADMIN_ROUTE);
    }

    static setCloudinary(cloudName:string):void {
        this.Cloudinary = cloudinary.Cloudinary.new({cloud_name: cloudName});
    }
}
