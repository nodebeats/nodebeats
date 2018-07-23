import {Routes, RouterModule} from '@angular/router';
import {PageNotFoundComponent} from './shared/components/page-not-found/page-not-found';
import {NgModule} from "@angular/core";
import {AuthGuardService} from "./login-app/auth.guard.service";
import { DashboardAppModule } from './dashboard-app/dashboard-app.module';
import {DashboardComponent} from "./dashboard-app/components/dashboard/dashboard.component";

const adminRoute: Routes = [
  {
    path: '',
    canActivate: [AuthGuardService],
    loadChildren: './dashboard-app/dashboard-app.module#DashboardAppModule',
    canLoad: [AuthGuardService]
  },
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(adminRoute)
  ],
  exports: [
    RouterModule
  ]
})

export class AdminAppRoutingModule {

}
