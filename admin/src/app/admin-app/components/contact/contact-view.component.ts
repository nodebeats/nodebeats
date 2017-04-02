import {Component, EventEmitter, Output, Input, ViewChild, OnInit} from '@angular/core';
import {ContactModel} from "./contact.model";
import {ContactService} from "./contact.service";
import * as moment from 'moment';
@Component({
  selector: 'contact-view',
  templateUrl: './contact-view.html'
  //providers: [UserService],

})

export class ContactViewComponent implements OnInit {
  //  @Input showInfo:boolean;
  @Input() contactId: string;
  @Output() viewCancelEvent: EventEmitter<any> = new EventEmitter();
  objContact: ContactModel = new ContactModel();
  error: any;
  showDefaultImage: boolean = false;
  imageSrc: string;

  ngOnInit() {
    this.getUserDetail();
  }

  constructor(private _objService: ContactService) {

  }

  getUserDetail() {
    this._objService.getContactById(this.contactId)
      .subscribe(resUser => this.handleDetail(resUser),
        error => this.error = error);
  }

  handleDetail(objContact: ContactModel) {
    objContact.addedOn = moment(objContact.addedOn).format('LLLL');
    this.objContact = objContact;

  }

  triggerCancelView(event?: Event) {
    let showInfo = false;
    this.viewCancelEvent.emit(showInfo);
  }


}

