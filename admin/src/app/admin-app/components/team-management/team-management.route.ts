import { NgModule } from '@angular/core';
import { TeamManagementComponent } from './team-management-list.component';
import {TeamManagementEditorComponent} from './team-management-editor.component';
import { Routes,RouterModule } from '@angular/router';


export const TeamManagementRoute: Routes = [
  {path:'', component: TeamManagementComponent},
  {path: 'editor', component: TeamManagementEditorComponent},
  {path: 'editor/:memberId', component: TeamManagementEditorComponent},
];

@NgModule({
  imports: [RouterModule.forChild(TeamManagementRoute)],
  exports: [RouterModule],
})

export class TeamManagementRouting { }