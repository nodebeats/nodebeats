import {Component, EventEmitter, Output, Input, ViewChild, OnInit} from '@angular/core';
import {ContactModel} from "./contact.model";
import {ContactService} from "./contact.service";
import {FadeInDirective}from '../../../shared/directives/fadeInDirective';

@Component({
    selector: 'contact-view',
    templateUrl: 'admin-templates/contact/contact-view.html'
    //providers: [UserService],

})

export class ContactViewComponent implements OnInit {
    //  @Input showInfo:boolean;
    @Input() contactId:string;
    @Output() viewCancelEvent:EventEmitter<any> = new EventEmitter();
    objContact:ContactModel = new ContactModel();
    error:any;
    showDefaultImage:boolean = false;
    imageSrc:string;

    ngOnInit() {
        this.getUserDetail();
    }

    constructor(private _objService:ContactService) {

    }

    getUserDetail() {
        this._objService.getContactById(this.contactId)
            .subscribe(resUser => this.handleDetail(resUser),
                error => this.error = error);
    }

    handleDetail(objContact:ContactModel) {
        this.objContact = objContact;

    }

    triggerCancelView(event) {
        let showInfo = false;
        this.viewCancelEvent.emit(showInfo);
    }

   
}

