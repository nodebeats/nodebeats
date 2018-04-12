import { ChangePasswordComponent } from './components/forgot-password/change-password.component';
import { VerifyUserComponent } from './components/verifyUser.component';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {AuthGuardService} from './auth.guard.service';
import {LoginService} from './components/login/login.service';
import {LoginAppComponent} from './login-app.component';
import {ForgotPasswordComponent} from'./components/forgot-password/forgot-password.component';
import {NgModule} from "@angular/core";

const loginAppRoute: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'verify/:token', component: VerifyUserComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'change-password/:token', component: ChangePasswordComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(loginAppRoute)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AuthGuardService,
    LoginService
  ]
})
export class loginAppRoutingModule {
}
// export const loginAppRouting = RouterModule.forChild(loginAppRoute);
//export const authGuardProvider = [LoginService, AuthGuardService];

