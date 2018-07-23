//import 'cloudinary';
//declare var cloudinary:any;
import {HOST_URL} from './env.config';
import {UserModel} from "../../dashboard-app/components/user-management/user.model";

export const AUTH_TOKEN_KEY = "NodeBeatAuthToken";
export const ADMIN_ROUTE = "AdminRoute";
export const USERINFO = "UserInfo";
export const EXPIRES_ON = "DateTime";

// let cloudinary = require('cloudinary');

export class Config {
    static AuthToken ="";
    static AdminRoute = "";
    static UserInfo = "";
    static EXPIRES_ON = "";
    // static AuthToken = window.localStorage.getItem(AUTH_TOKEN_KEY);
    // static AdminRoute = window.localStorage.getItem(ADMIN_ROUTE);
    // static UserInfo = window.localStorage.getItem(USERINFO);
    // static EXPIRES_ON = window.localStorage.getItem(EXPIRES_ON);
    /*
     cloudinary is declared in manual typings and script in included in head tag
     */
    // static Cloudinary: any = cloudinary; //change parameters for default cloudinary setting
    static Cloudinary = typeof window !="undefined"? cloudinary.Cloudinary.new({cloud_name: "nodebeat-v3-test"}) : '';
    static DefaultAvatar = HOST_URL + "/assets/admin/img/defaults/default_avatar.png";
    static DefaultImage = HOST_URL + "/assets/admin/img/defaults/default_img.png";
    static DefaultWideImage = HOST_URL + "/assets/admin/img/defaults/default_wide_img.png";
    static InvalidImage = HOST_URL + "/assets/admin/img/defaults/invalid_image.png";
    static LoginImage = HOST_URL + '/assets/admin/img/SB-admin.png';
    static GoogleAuthImage = HOST_URL + '/assets/admin/img/google_auth_silver.png';

    static clearToken():void {
        if(typeof window !="undefined")
            window.localStorage.clear();
        this.AuthToken = null;
        this.AdminRoute = null;
        this.UserInfo = null;
    }
    
    static getAuthTokenValid():boolean {
        if(typeof window !="undefined")
            this.EXPIRES_ON = window.localStorage.getItem(EXPIRES_ON);

       var now:number        = new Date(new Date().getTime()).getTime(),
            expires_on: number = new Date(this.EXPIRES_ON).getTime(),
            diff:number       = expires_on - now ;

           diff = Math.floor(diff / 1e3);
        return  (diff/3600) > 1 ? true: false;
    }

    static setLoggedInToken(auth:string, userInfo:UserModel,expiryDate:string):void {
        if(typeof window !="undefined") {
            window.localStorage.setItem(AUTH_TOKEN_KEY, auth);
            window.localStorage.setItem(USERINFO, JSON.stringify(userInfo));
            window.localStorage.setItem(EXPIRES_ON, expiryDate);
        }
    }

    static getAuthToken():string {
        if(typeof window !="undefined")
            return this.AuthToken = window.localStorage.getItem(AUTH_TOKEN_KEY);
    }

    static getUserInfoToken():string {
        if(typeof window !="undefined")
            return this.UserInfo = window.localStorage.getItem(USERINFO);
    }

    static setAdminRouteToken(auth:string):void {
        if(typeof window !="undefined")
            window.localStorage.setItem(ADMIN_ROUTE, auth);
    }

    static removeAdminRouteToken():void {
        if(typeof window !="undefined")
            window.localStorage.removeItem(ADMIN_ROUTE);
    }

    static getAdminRoute():string {
        if(typeof window !="undefined")
            return this.AdminRoute = window.localStorage.getItem(ADMIN_ROUTE);
    }

    static setCloudinary(cloudName:string, apiKey: string, apiSecret: string):void {
        // this.Cloudinary.config({
        //     cloud_name: cloudName, 
        //     api_key: apiKey, 
        //     api_secret: apiSecret 
        // });
        if(typeof window !="undefined")
        this.Cloudinary = cloudinary.Cloudinary.new({cloud_name: cloudName});
    }
}
