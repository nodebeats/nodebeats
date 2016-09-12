export class ForgotPasswordModel {
    constructor() {
        this.securityQuestion = "";
    }

    email:string;
    securityQuestion:string;
    securityAnswer:string;

}