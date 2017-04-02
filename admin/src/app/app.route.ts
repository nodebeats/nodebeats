import {Routes, RouterModule} from '@angular/router';
import {PageNotFoundComponent} from './shared/components/page-not-found/page-not-found';
// import { loginAppRoute} from './login-app/login-app.route';
import {NgModule} from "@angular/core";
import {AuthGuardService} from "./login-app/auth.guard.service";


const mainRoute: Routes = [
  {
    path: '',
    canActivate: [AuthGuardService],
    loadChildren: 'app/admin-app/admin-app.module#AdminAppModule',
    canLoad: [AuthGuardService]
  },
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(mainRoute)
  ],
  exports: [
    RouterModule
  ]
})
// export const appRoutingProviders:any[] = [
//     authGuardProvider
// ];

export class AppRoutingModule {
}

// export const routing = RouterModule.forRoot(MainRoute);
