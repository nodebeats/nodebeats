import {Component, ViewContainerRef} from '@angular/core';
@Component({
    selector: 'login-app',
     templateUrl: 'login-app/login-index.html'
})

export class LoginAppComponent {
    public containerSlide:boolean = false;

    constructor() {

    }

    toggleContainer(args) {
        this.containerSlide = args;
    }
}