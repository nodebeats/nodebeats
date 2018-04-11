import {NgModule}      from '@angular/core';
import {ApiAccessService} from"./api-access.service";
import {ApiAccessEditorComponent} from"./api-access-editor.component";
import {ApiAccessComponent} from './api-access.component';
import {ApiAccessHomeComponent} from './api-access-home.component';
import {SharedModule} from '../../../shared/shared.module';
import {ApiAccessRouting} from './api-access.routing';

@NgModule({
    imports: [SharedModule.forRoot(), ApiAccessRouting],
    declarations: [ApiAccessHomeComponent, ApiAccessEditorComponent, ApiAccessComponent],
    providers: [ApiAccessService]
})

export class ApiAccessModule {
}