import {NgModule}      from '@angular/core';
import {EventService} from "./event.service";
import {EventEditorComponent} from"./event-editor.component";
import {EventComponent} from"./event-list.component";
import {SharedModule} from '../../../shared/shared.module';
import {EventManagementRouting} from './event-management.routing';

@NgModule({
    imports: [SharedModule.forRoot(), EventManagementRouting],
    declarations: [EventEditorComponent, EventComponent],
    providers:[EventService]
})

export class EventManagementModule {
}