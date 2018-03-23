import {NgModule}      from '@angular/core';
import {PartnerComponent} from "./partner-list.component";
import {PartnerService} from"./partner.service";
import {PartnerEditorComponent} from"./partner-editor.component";
import {PartnerRouting} from './partner.routing';

import {SharedModule} from '../../../shared/shared.module';

@NgModule({
    imports: [SharedModule.forRoot(),PartnerRouting],
    declarations: [PartnerComponent,PartnerEditorComponent],
    providers:[PartnerService]
})

export class PartnerModule {
}