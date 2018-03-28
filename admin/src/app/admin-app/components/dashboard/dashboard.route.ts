import { DashboardComponent } from './dashboard.component';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

export const DashboardRoute: Routes = [
    {path:'', component: DashboardComponent}
]

@NgModule({
    imports: [RouterModule.forChild(DashboardRoute)],
    exports: [RouterModule],
  })


export class DashboardRouting{    }