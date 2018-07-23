import {NgModule}      from '@angular/core';
import {OrganizationInfoComponent} from "./orginfo.component";
import {OrganizationInfoService} from"./orginfo.service";
import {SharedModule} from '../../../shared/shared.module';
import {OrganizationInfoRouting} from './orginfo.route';

@NgModule({
    imports: [SharedModule.forRoot(),OrganizationInfoRouting],
    declarations: [OrganizationInfoComponent],
    providers: [OrganizationInfoService]
})

export class OrganizationInformationModule {
}