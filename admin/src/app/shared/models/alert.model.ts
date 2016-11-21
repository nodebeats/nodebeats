export class AlertModel {
    show:boolean = false;
    type:string = "success";
    title:string;
    message:string;
    closeButton:boolean = false;
    autoClose:boolean;
    duration:number = 5;


    showAlert(type:string, title:string, message:string, closeButton?:boolean, autoClose?:boolean, duration?:number) {
        this.show = true;
        this.type = type;
        this.title = title;
        this.message = message;
        this.closeButton = closeButton;
        this.autoClose = autoClose;
        this.duration = duration;
    }

    hideAlert() {
        this.show = false;
    }
}

