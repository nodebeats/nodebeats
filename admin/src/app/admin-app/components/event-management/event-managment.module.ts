import {NgModule}      from '@angular/core';
import {EventService} from "./event.service";
import {EventEditorComponent} from"./event-editor.component";
import {EventComponent} from"./event-list.component";
import {SharedModule} from '../../../shared/shared.module';

@NgModule({
    imports: [SharedModule],
    declarations: [EventEditorComponent, EventComponent],
    providers:[EventService]
})

export class EventManagementModule {
}