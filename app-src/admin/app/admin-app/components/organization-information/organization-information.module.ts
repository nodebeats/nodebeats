import {NgModule}      from '@angular/core';
import {OrganizationInfoComponent} from "./orginfo.component";
import {OrganizationInfoService} from"./orginfo.service";
import {SharedModule} from '../../../shared/shared.module';

@NgModule({
    imports: [SharedModule],
    declarations: [OrganizationInfoComponent]
})

export class OrganizationInformationModule {
}