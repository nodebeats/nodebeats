import {NgModule}      from '@angular/core';
import {UserProfileManagementComponent} from "./user-management.component";
import {UserProfileComponent} from"./user-profile.component";
import{UserManagementModule} from "../user-management/user-managment.module";
import {SharedModule} from '../../../shared/shared.module';

@NgModule({
    imports: [SharedModule, UserManagementModule],
    declarations: [UserProfileManagementComponent, UserProfileComponent]
})

export class UserProfileModule {
}