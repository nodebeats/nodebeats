import {NgModule}      from '@angular/core';
import {GoogleAnalyticsService} from "./google-analytics.service";
import {GoogleAnalyticsComponent} from"./google-analytics.component";
import {SharedModule} from '../../../shared/shared.module';
import {GoogleAnalyticsRouting} from './google-analytics.route';

@NgModule({
    imports: [SharedModule.forRoot(), GoogleAnalyticsRouting],
    declarations: [GoogleAnalyticsComponent],
    providers: [GoogleAnalyticsService]
})

export class GoogleAnalyticsModule {
}