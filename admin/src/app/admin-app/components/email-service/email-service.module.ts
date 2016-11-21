import {NgModule} from '@angular/core';
import {EmailServiceService} from "./email-service.service";
import{EmailServiceComponent} from"./email-service.component";
import{SharedModule} from '../../../shared/shared.module';

@NgModule({
  imports: [SharedModule],
  declarations: [EmailServiceComponent],
  providers: [EmailServiceService]
})

export class EmailServiceModule {
}
