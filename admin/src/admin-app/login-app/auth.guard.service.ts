import { Injectable, OnInit } from "@angular/core";
import {
  CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot, CanActivateChild,
  Route, CanLoad
} from "@angular/router";
import { LoginService } from "./components/login/login.service";
import { Config } from "../shared/configs/general.config";
@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild, CanLoad {
  constructor(private _loginService: LoginService, private router: Router) {
    //this._loginService.isValidLogin();
  }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let url: string = state.url;
    // const requiresLogin = route.data.requiresLogin || false;
    // if (requiresLogin)
    return this.checkLogin(url);
  }

  canLoad(route: Route): boolean {
    let url = `/${route.path}`;

    return this.checkLogin(url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  checkLogin(url: string): boolean {
    if (Config.getAuthToken() && Config.getAuthTokenValid()) {
      Config.removeAdminRouteToken();
      return true;
    }
   /* To navigate to the current route when authenticate logged In / Valid Login */
    /*
     Store the attempted URL for redirecting
     */
    this._loginService.logout();
    this._loginService.redirectUrl = url;
    // Config.setAdminRouteToken(state.url);
    this.router.navigate(['/login']);
    return false;
  }

}
