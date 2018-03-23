import {NgModule} from '@angular/core';
import {EventComponent} from './event-list.component';
import { Routes,RouterModule } from '@angular/router';
import {EventEditorComponent} from './event-editor.component';

export const EventManagementRoutes: Routes = [
    
      {path: '', component: EventComponent},
      {path: 'editor', component: EventEditorComponent},
      {path: 'editor/:id', component: EventEditorComponent},
    
  ];

  @NgModule({
    imports: [RouterModule.forChild(EventManagementRoutes)],
    exports: [RouterModule],
  })


export class EventManagementRouting {}