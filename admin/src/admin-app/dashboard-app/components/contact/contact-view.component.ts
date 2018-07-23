import {Component, OnInit} from '@angular/core';
import {ContactModel} from "./contact.model";
import {ContactService} from "./contact.service";
import * as moment from 'moment';
import {ActivatedRoute, Router} from "@angular/router";
@Component({
  selector: 'contact-view',
  templateUrl: './contact-view.html'
})

export class ContactViewComponent implements OnInit {
  contactId: string;
  objContact: ContactModel = new ContactModel();
  error: any;
  showDefaultImage: boolean = false;
  imageSrc: string;

  ngOnInit() {
    this.getUserDetail();
  }

  constructor(private _objService: ContactService, private router: Router, private activatedRoute: ActivatedRoute) {
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

  triggerCancelView() {
    this.router.navigate(['/contact']);
  }
}

