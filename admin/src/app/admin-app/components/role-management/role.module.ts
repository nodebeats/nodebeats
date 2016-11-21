import {NgModule}      from '@angular/core';
import {RoleService} from"./role.service";
import {RoleEditorComponent} from"./role-editor.component";
import {RoleComponent} from './role-list.component'
import {SharedModule} from '../../../shared/shared.module';

@NgModule({
    imports: [SharedModule],
    declarations: [RoleEditorComponent, RoleComponent],
    providers: [RoleService]
})

export class RoleModule {
}