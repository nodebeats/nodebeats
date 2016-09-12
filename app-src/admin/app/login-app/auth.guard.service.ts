import {Injectable, OnInit} from "@angular/core";
import {CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot} from "@angular/router";
import {LoginService} from "./components/login/login.service";
import {Config} from "../shared/configs/general.config";
@Injectable()
export class AuthGuardService implements CanActivate,OnInit {
    constructor(private router:Router, private _loginService:LoginService) {

    }

    ngOnInit() {
        this._loginService.isValidLogin();
    }

    canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot) {

        if (this._loginService.loggedIn) {
            Config.removeAdminRouteToken();
            return true;
        }
        /* To navigate to the current route when authenticate logged In / Valid Login */
        Config.setAdminRouteToken(state.url);
        this.router.navigate(['/login']);
        return false;
    }

    //     this._loginService.isValidLoginPromise()
    //         .then((res)=>{
    //             if(res)
    //                 return true;
    //             else{
    //                 this.router.navigate(['/admin']);
    //                 return false;
    //             }
    //         })
    //         .catch(err=>{
    //             console.log(err);
    //             this.router.navigate(['/admin']);
    //             return false;
    //         });
    // }

}