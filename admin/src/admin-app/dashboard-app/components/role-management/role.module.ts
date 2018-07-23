import { RoleHomeComponent } from './role-home.component';
import {NgModule}      from '@angular/core';
import {RoleService} from"./role.service";
import {RoleEditorComponent} from"./role-editor.component";
import {RoleComponent} from './role-list.component'
import {SharedModule} from '../../../shared/shared.module';
import {RoleRouting} from './role.route';

@NgModule({
    imports: [SharedModule.forRoot(), RoleRouting],
    declarations: [RoleHomeComponent,RoleEditorComponent, RoleComponent],
    providers: [RoleService]
})

export class RoleModule {
    
}