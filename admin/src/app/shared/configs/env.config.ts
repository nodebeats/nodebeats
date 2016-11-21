

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
