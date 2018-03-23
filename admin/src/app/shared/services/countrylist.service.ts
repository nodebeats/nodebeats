import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import{JSON_URL} from"../configs/env.config";
@Injectable()
export class CountryListService {
    jsonFile:string = "country.json";

    constructor(private _http:Http) {
    }

    getCountryList():Observable<CountryModel[]> {
        return this._http.get(JSON_URL + this.jsonFile)
            .map(res =><CountryModel[]>res.json())
            .catch(this.handleError);
    }

    handleError(error) {
        console.log(error.json());
        return Observable.throw(error.json() || 'server error');
    }

}
export class CountryModel {
    name:string;
    code:string;
}