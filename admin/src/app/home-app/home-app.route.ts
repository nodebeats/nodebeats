import { HomeAppComponent } from './home-app.component';
import { Routes, RouterModule} from '@angular/router';
import { NgModule } from "@angular/core";

export const HomeAppRoute: Routes = [
  {
    path: '', component: HomeAppComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(HomeAppRoute)
  ],
  exports: [
    RouterModule
  ]
})
export class HomeAppRouting {
}
