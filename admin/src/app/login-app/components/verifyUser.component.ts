import { LoginService } from './login/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'verify-user',
    template: ''
})

export class VerifyUserComponent implements OnInit{
    verifyToken: string;

    constructor(private activatedRoute: ActivatedRoute, private loginService: LoginService, private router: Router) {
        activatedRoute.params.subscribe(params => this.verifyToken = params['token']);
    }

    ngOnInit() {
        this.getVerificationStatus();
    }

    getVerificationStatus() {
        this.loginService.verifyUser(this.verifyToken)
            .subscribe(res => this.bindStatus(res));
    }

    bindStatus(res: any) {
        localStorage.setItem("verificationResponse", JSON.stringify(res));
        this.router.navigate(['/login']);
    }
}