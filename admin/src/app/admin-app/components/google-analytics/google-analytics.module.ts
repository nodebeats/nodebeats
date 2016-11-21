import {NgModule}      from '@angular/core';
import {GoogleAnalyticsService} from "./google-analytics.service";
import {GoogleAnalyticsComponent} from"./google-analytics.component";
import {SharedModule} from '../../../shared/shared.module';

@NgModule({
    imports: [SharedModule],
    declarations: [GoogleAnalyticsComponent],
    providers: [GoogleAnalyticsService]
})

export class GoogleAnalyticsModuless {
}