import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventEditorComponent} from './event-editor.component';
import { EventComponent } from './event-list.component';

export const EventRoutes: Routes = [
    {path: '', component: EventComponent, data: {breadcrumb: 'Event List'}},
    {path: 'editor', component: EventEditorComponent, data: {breadcrumb: 'Event Editor'}},
    {path: 'editor/:id', component: EventEditorComponent, data: {breadcrumb: 'Event Editor'}},
];

@NgModule({
  imports: [RouterModule.forChild(EventRoutes)],
  exports: [RouterModule]
})

export class EventManagementRouting { }