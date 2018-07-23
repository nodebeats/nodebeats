import {NgModule} from '@angular/core';
import {GoogleAnalyticsComponent} from './google-analytics.component';
import {Routes, RouterModule} from '@angular/router';

export const GoogleAnalyticsRoute: Routes = [
    {path:'', component:GoogleAnalyticsComponent, data: { breadcrumb: 'Google Analytics Setting'}}
]

@NgModule({
    imports:[RouterModule.forChild(GoogleAnalyticsRoute)],
    exports:[RouterModule]
})

export class GoogleAnalyticsRouting {}