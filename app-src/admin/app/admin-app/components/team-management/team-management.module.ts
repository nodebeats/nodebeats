import {NgModule}      from '@angular/core';
import {TeamManagementService} from "./team-managment.service";
import {TeamManagementEditorComponent} from"./team-management-editor.component";
import {TeamManagementComponent} from"./team-managment-list.component";

import {SharedModule} from '../../../shared/shared.module';

@NgModule({
    imports: [SharedModule],
    declarations: [TeamManagementEditorComponent, TeamManagementComponent],
    providers: [TeamManagementService]
})

export class TeamManagementModule {
}