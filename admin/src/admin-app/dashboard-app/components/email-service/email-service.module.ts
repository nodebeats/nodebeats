import {NgModule} from '@angular/core';
import {EmailServiceService} from "./email-service.service";
import{EmailServiceComponent} from"./email-service.component";
import{SharedModule} from '../../../shared/shared.module';
import{EmailServiceRouting} from './email-service.routing';

@NgModule({
  imports: [SharedModule.forRoot(),EmailServiceRouting],
  declarations: [EmailServiceComponent],
  providers: [EmailServiceService]
})

export class EmailServiceModule {
}
