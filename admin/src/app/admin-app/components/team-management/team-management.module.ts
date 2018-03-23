import {NgModule}      from '@angular/core';
import {TeamManagementService} from "./team-managment.service";
import {TeamManagementEditorComponent} from "./team-management-editor.component";
import {TeamManagementComponent} from "./team-management-list.component";
import {TeamManagementRouting} from './team-management.route';
import {SharedModule} from '../../../shared/shared.module';

@NgModule({
    imports: [SharedModule.forRoot(),TeamManagementRouting],
    declarations: [TeamManagementEditorComponent, TeamManagementComponent],
    providers: [TeamManagementService]
})

export class TeamManagementModule {
}