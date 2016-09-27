import {Injectable, OnInit} from "@angular/core";
import {CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot, CanActivateChild} from "@angular/router";
import {LoginService} from "./components/login/login.service";
import {Config} from "../shared/configs/general.config";
@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {
    constructor(private _loginService:LoginService, private router:Router) {
        this._loginService.isValidLogin();
    }


    canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot) {

        if (this._loginService.loggedIn) {
            Config.removeAdminRouteToken();
            return true;
        }

        /* To navigate to the current route when authenticate logged In / Valid Login */
        /*
         Store the attempted URL for redirecting
         */
        this._loginService.redirectUrl = state.url;
        // Config.setAdminRouteToken(state.url);
        this.router.navigate(['/login']);
        return false;
    }

    canActivateChild(route:ActivatedRouteSnapshot, state:RouterStateSnapshot):boolean {
        return this.canActivate(route, state);
    }


}