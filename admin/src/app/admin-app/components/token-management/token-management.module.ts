import { NgModule } from '@angular/core';
import {TokenManagementService} from "./token-manangement.service";
import {TokenManagementComponent} from"./token-management.component";
import {SharedModule} from '../../../shared/shared.module';
import {TokenManagementRouting} from './token-management.route';

@NgModule({
    imports: [SharedModule.forRoot(),TokenManagementRouting],
    declarations: [TokenManagementComponent],
    providers: [TokenManagementService]
})

export class TokenModule {
}