import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventEditorComponent} from './event-editor.component';
import { EventComponent } from './event-list.component';

export const EventRoutes: Routes = [
    {path: '', component: EventComponent},
    {path: 'editor', component: EventEditorComponent},
    {path: 'editor/:id', component: EventEditorComponent},
];

@NgModule({
  imports: [RouterModule.forChild(EventRoutes)],
  exports: [RouterModule]
})

export class EventManagementRouting { }