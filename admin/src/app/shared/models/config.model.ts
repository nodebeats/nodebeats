//import 'cloudinary';
//declare var cloudinary:any;
let URL:string;
switch ("development") {
    case "production":
        URL = window.location.protocol + "//" + window.location.host;
        break;
    case "test":
        URL = "localhost://3000";
        break;
    case "development":
    case "default":
        URL = window.location.protocol + "//" + window.location.host;
        break;
}
export const HOST_URL:string = URL;
export const API_URL:string = HOST_URL + "/api/";
export const JSON_URL:string = HOST_URL + '/data/';

export class Config {
    static AuthToken = window.localStorage.getItem("NodeBeatAuthToken");
    static Cloudinary = cloudinary.Cloudinary.new({cloud_name: "bitsbeat-it-solution"});
    static DefaultAvatar = HOST_URL + "/img/defaults/default_avatar.png";
    static DefaultImage = HOST_URL + "/img/defaults/default_img.png";
    static DefaultWideImage = HOST_URL + "/img/defaults/default_wide_img.png";
    static InvalidImage = HOST_URL + "/img/defaults/invalid_image.png";
    static LoginImage = HOST_URL + '/img/SB-admin.png';
    static GoogleAuthImage = HOST_URL + '/img/google_auth_silver.png';
}
export enum ImageCanvasSizeEnum{
    small = 0,
    medium = 1,
    wide = 2
}


