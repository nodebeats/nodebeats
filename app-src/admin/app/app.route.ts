import {Routes, RouterModule} from '@angular/router';

import {PageNotFoundComponent} from './shared/components/page-not-found/page-not-found';
import{LoginAppComponent} from './login-app/login-app.component';
import {AdminAppComponent} from './admin-app/admin-app.component';
import {authGuardProvider, loginAppRoute} from './login-app/login-app.route';
import {AuthGuardService} from "./login-app/auth.guard.service";
import {adminAppRoute} from "./admin-app/admin-app.route";


export const MainRoute:Routes = [
    ...loginAppRoute,

    {path: '**', component: PageNotFoundComponent}
];
export const appRoutingProviders:any[] = [
    authGuardProvider
];

export const routing = RouterModule.forRoot(MainRoute);