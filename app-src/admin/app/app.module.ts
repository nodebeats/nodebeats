import {NgModule, ElementRef}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent}  from './app.component';
import{SharedModule} from './shared/shared.module';
import {routing} from './app.route';
//
// //Vendor js
import '../app-config/helperscript';
import '../app-config/rxjs-operator';
import {appRoutingProviders} from './app.route';
import {LoginComponent} from './login-app/components/login/login.component';
import{AdminAppModule}from'./admin-app/admin-app.module';
import {ForgotPasswordComponent} from "./login-app/components/forgot-password/forgot-password.component";
import {PageNotFoundComponent} from "./shared/components/page-not-found/page-not-found";
@NgModule({
    imports: [BrowserModule,
        SharedModule.forRoot(),
        AdminAppModule,
        routing
    ],
    declarations: [AppComponent,
        LoginComponent,
        ForgotPasswordComponent,
        PageNotFoundComponent],
    providers: [appRoutingProviders],
    bootstrap: [AppComponent]
})

export class AppModule {
}