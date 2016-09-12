import {RouterConfig, provideRouter} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {AuthGuardService} from './auth.guard.service';
import {LoginService} from './components/login/login.service';
export const LoginAppRoute:RouterConfig = [
    {path: '', component: LoginComponent}
];

export const AuthGuardProvider = [AuthGuardService, LoginService];
