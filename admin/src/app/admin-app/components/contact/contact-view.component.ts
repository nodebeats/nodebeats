import {Component, EventEmitter, Output, Input, ViewChild, OnInit} from '@angular/core';
import {ContactModel} from "./contact.model";
import {ContactService} from "./contact.service";
import * as moment from 'moment';
import {ActivatedRoute,Router} from "@angular/router";
import {Location} from '@angular/common';
@Component({
  selector: 'contact-view',
  templateUrl: './contact-view.html'
  //providers: [UserService],

})

export class ContactViewComponent implements OnInit {
  //  @Input showInfo:boolean;
  contactId: string;
  // @Output() viewCancelEvent: EventEmitter<any> = new EventEmitter();
  objContact: ContactModel = new ContactModel();
  error: any;
  showDefaultImage: boolean = false;
  imageSrc: string;

  ngOnInit() {
    this.getUserDetail();
  }

  constructor(private _objService: ContactService, private location: Location, private activatedRoute: ActivatedRoute) {
    activatedRoute.params.subscribe(param => this.contactId = param['id']);
  }

  getUserDetail() {
    this._objService.getContactById(this.contactId)
      .subscribe(resUser => this.handleDetail(resUser),
        error => this.error = error);
  }

  handleDetail(objContact: ContactModel) {
    objContact.addedOn = moment(<any>objContact.addedOn).format('YYYY');
    this.objContact = objContact;
  }

  triggerCancelView(event?: Event) {
    let showInfo = false;
    // this.viewCancelEvent.emit(showInfo);
    this.location.back();
  }


}

