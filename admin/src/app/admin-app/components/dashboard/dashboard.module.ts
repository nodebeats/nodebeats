import { DashboardRouting } from './dashboard.route';
import {NgModule} from '@angular/core';
import {SharedModule} from '../../../shared/shared.module';
import {
    UserCount, PageViewComponent, BrowserAnalysisChart, CountryWiseChart,
    LastWeekVsThisWeekAnalysisChart
} from "./dashboard.component";
import {DashboardService} from "./dashboard.service";
import {DashboardComponent} from './dashboard.component';
import {AnimateCounterComponent} from "../../../shared/components/animate-counter.component";
import { ChartsModule } from 'ng2-charts';

@NgModule({
    imports: [SharedModule.forRoot(), DashboardRouting, ChartsModule],
    declarations: [UserCount, PageViewComponent, DashboardComponent,
        CountryWiseChart, BrowserAnalysisChart,
        LastWeekVsThisWeekAnalysisChart, AnimateCounterComponent],
    providers: [DashboardService]
})

export class DashboardModule {
}