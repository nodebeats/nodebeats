import {NgModule}      from '@angular/core';
import{SharedModule} from '../../../shared/shared.module';
import {ChartModule} from 'primeng/primeng';
import {
    UserCount, PageViewComponent, BrowserAnalysisChart, CountryWiseChart,
    LastWeekVsThisWeekAnalysisChart
} from "./dashboard.component";
import {DashboardService} from "./dashboard.service";
import{DashboardComponent} from './dashboard.component';
import {AnimateCounterComponent} from "../../../shared/components/animate-counter.component";
@NgModule({
    imports: [SharedModule, ChartModule],
    declarations: [UserCount, PageViewComponent, DashboardComponent,
        CountryWiseChart, BrowserAnalysisChart,
        LastWeekVsThisWeekAnalysisChart, AnimateCounterComponent],
    providers: [DashboardService]
})

export class DashboardModule {
}