import {Routes, RouterModule} from '@angular/router';
import {PageNotFoundComponent} from './shared/components/page-not-found/page-not-found';
import {authGuardProvider, loginAppRoute} from './login-app/login-app.route';


export const MainRoute:Routes = [
    ...loginAppRoute,
    {path: '**', component: PageNotFoundComponent}
];
export const appRoutingProviders:any[] = [
    authGuardProvider
];

export const routing = RouterModule.forRoot(MainRoute);
