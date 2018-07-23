import {NgModule}      from '@angular/core';
import {UserProfileManagementComponent} from "./user-management.component";
import {UserProfileComponent} from"./user-profile.component";
import {UserManagementModule} from "../user-management/user-managment.module";
import {SharedModule} from '../../../shared/shared.module';
import {UserProfileRouting} from './user-profile.route';

@NgModule({
    imports: [SharedModule.forRoot(), UserProfileRouting, UserManagementModule],
    declarations: [UserProfileManagementComponent, UserProfileComponent]
})

export class UserProfileModule {
}