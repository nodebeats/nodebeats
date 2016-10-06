import {NgModule}      from '@angular/core';
import {ApiAccessService} from"./api-access.service";
import {ApiAccessEditorComponent} from"./api-access-editor.component";
import {ApiAccessComponent} from './api-access.component'
import {SharedModule} from '../../../shared/shared.module';

@NgModule({
    imports: [SharedModule],
    declarations: [ApiAccessEditorComponent, ApiAccessComponent],
    providers: [ApiAccessService]
})

export class ApiAccessModule {
}