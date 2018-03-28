import {UserManagementRouting} from './user-management.route';
import {NgModule} from '@angular/core';
import {UserEditComponent} from "./user-edit.component";
import {UserListComponent} from"./user-list.component";
import {UserManagementComponent} from"./user-management.component";
import {UserRegistrationComponent} from"./user-registration.component";
import {UserSecurityUpdateComponent} from"./user-security-question.component";
import {UserSettingComponent} from"./user-setting.component";
import {UserPasswordUpdateComponent} from"./user-password-update.component";
import {UserService} from"./user.service";
import {SharedModule} from '../../../shared/shared.module';
import {UserViewComponent} from "./user-view.component";
import {RoleModule} from "../role-management/role.module";

@NgModule({
    imports: [SharedModule.forRoot(), UserManagementRouting, RoleModule],
    declarations: [UserEditComponent, UserListComponent,
        UserManagementComponent, UserRegistrationComponent, UserViewComponent,
        UserSecurityUpdateComponent, UserSettingComponent, UserPasswordUpdateComponent],
    exports: [UserSecurityUpdateComponent, UserEditComponent, UserSettingComponent, UserPasswordUpdateComponent],
    providers: [UserService]
})

export class UserManagementModule {
}