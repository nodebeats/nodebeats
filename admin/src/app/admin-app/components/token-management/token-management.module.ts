import {NgModule}      from '@angular/core';
import {TokenManagementService} from "./token-manangement.service";
import{TokenManagementComponent} from"./token-management.component";
import{SharedModule} from '../../../shared/shared.module';

@NgModule({
    imports: [SharedModule],
    declarations: [TokenManagementComponent],
    providers: [TokenManagementService]
})

export class TokenModule {
}