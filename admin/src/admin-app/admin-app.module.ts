import {ChangePasswordComponent} from './login-app/components/forgot-password/change-password.component';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AdminAppComponent}  from './admin-app.component';
import {SharedModule} from './shared/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {LoginAppComponent} from './login-app/login-app.component';
import {LoginComponent} from './login-app/components/login/login.component';

import {ForgotPasswordComponent} from "./login-app/components/forgot-password/forgot-password.component";
import {PageNotFoundComponent} from "./shared/components/page-not-found/page-not-found";
import {AdminAppRoutingModule} from "./admin-app.route";
import {loginAppRoutingModule} from "./login-app/login-app.route";
import {VerifyUserComponent} from './login-app/components/verifyUser.component';
import {DashboardComponent} from "./dashboard-app/components/dashboard/dashboard.component";

@NgModule({
  imports: [BrowserModule,
    BrowserAnimationsModule,
    SharedModule.forRoot(),
    loginAppRoutingModule,
    AdminAppRoutingModule,
  ],
  declarations: [AdminAppComponent,
    LoginAppComponent,
    LoginComponent,
    ForgotPasswordComponent,
    PageNotFoundComponent,
    VerifyUserComponent,
    ChangePasswordComponent
  ],
  bootstrap: [AdminAppComponent]
})

export class AdminAppModule {

}
