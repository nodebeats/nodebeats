/**
 * Created by sanedev on 6/27/16.
 */
import{Component, OnInit}from'@angular/core';

@Component({
    selector: 'user-management',
    templateUrl: './user-management.html'
})
export class UserProfileManagementComponent implements OnInit {
    navLinks: any[] = [{label:'Profile', path: '/admin/profile'}, {label: 'Security', path: '/admin/profile/security'}, {label: 'Password', path: '/admin/profile/password'}, {label: 'Setting', path: '/admin/profile/setting'}];

    constructor() {
        
    }

    ngOnInit() {
    }
}

