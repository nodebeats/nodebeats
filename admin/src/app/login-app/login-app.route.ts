///<reference path="../../../../node_modules/@angular/router/src/router_module.d.ts"/>
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {AuthGuardService} from './auth.guard.service';
import {LoginService} from './components/login/login.service';
import {LoginAppComponent} from './login-app.component';
import {ForgotPasswordComponent} from'./components/forgot-password/forgot-password.component';
export const loginAppRoute:Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'forgot-password', component: ForgotPasswordComponent}

];
// export const loginAppRouting = RouterModule.forChild(loginAppRoute);
export const authGuardProvider = [LoginService, AuthGuardService];

