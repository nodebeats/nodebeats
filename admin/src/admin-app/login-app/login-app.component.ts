import {Component, ViewContainerRef} from '@angular/core';
@Component({
    selector: 'login-app',
     templateUrl: './login-index.html'
})

export class LoginAppComponent {
    public containerSlide:boolean = false;

    constructor() {

    }

    toggleContainer(args: any) {
        this.containerSlide = args;
    }
}
