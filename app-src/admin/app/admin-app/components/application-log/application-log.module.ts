import {NgModule}      from '@angular/core';
import {ApplicationLogService} from "./application-log.service";
import{ApplicationLogComponent} from"./application-log-list.component";
import{SharedModule} from '../../../shared/shared.module';

@NgModule({
    imports: [SharedModule],
    declarations: [ApplicationLogComponent],
    providers: [ApplicationLogService]
})

export class ApplicationLogModule {
}