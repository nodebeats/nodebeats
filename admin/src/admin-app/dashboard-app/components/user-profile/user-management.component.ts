/**
 * Created by sanedev on 6/27/16.
 */
import{Component, OnInit}from'@angular/core';

@Component({
    selector: 'user-management',
    templateUrl: './user-management.html'
})
export class UserProfileManagementComponent implements OnInit {
    navLinks: any[] = [{label:'Profile', path: '/profile'}, {label: 'Security', path: '/profile/security'}, {label: 'Password', path: '/profile/password'}, {label: 'Setting', path: '/profile/setting'}];

    constructor() {
        
    }

    ngOnInit() {
    }
}

