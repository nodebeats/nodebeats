import {BaseRequestOptions} from '@angular/http';
import{Config} from"../configs/general.config";
export class HeaderIntercept extends BaseRequestOptions {
    constructor() {
        super();
        let token = Config.getAuthToken();
        if (token)
            this.headers.append('Authorization', token);
        this.headers.append('Content-Type', 'application/json');

    }

}
