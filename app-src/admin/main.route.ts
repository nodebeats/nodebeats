import {RouterConfig, provideRouter} from '@angular/router';
import {AdminAppRoute}from './app/admin-app/admin-app.route';
import {PageNotFoundComponent} from './app/shared/components/page-not-found/page-not-found';
import {LoginAppRoute, AuthGuardProvider} from './app/login-app/login-app.route';
import{LoginAppComponent} from './app/login-app/login-app.component';
import {AdminAppComponent} from './app/admin-app/admin-app.component';
import {AuthGuardService} from './app/login-app/auth.guard.service';
import {ForgotPasswordComponent} from './app/login-app/components/forgot-password/forgot-password.component';
export const MainRoute:RouterConfig = [
    {
        path: 'login', component: LoginAppComponent, children: [
        ...LoginAppRoute
    ]
    },
    {
        path: 'admin', component: AdminAppComponent, canActivate: [AuthGuardService], children: [
        ...AdminAppRoute
    ]
    },
    {path: 'forgot-password', component: ForgotPasswordComponent},
    {path: '**', component: PageNotFoundComponent}
];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(MainRoute),
    AuthGuardProvider
];