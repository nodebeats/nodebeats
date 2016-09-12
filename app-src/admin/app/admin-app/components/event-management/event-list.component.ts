import {Component, OnInit} from '@angular/core';
import {EventService} from "./event.service";
import{EventResponse, EventModel} from "./event.model";
import {EventEditorComponent}from "./event-editor.component";
import {FadeInDirective}from '../../../shared/directives/fadeInDirective';

// import {Pagination} from 'fuel-ui/fuel-ui';
import {Paginator} from 'primeng/primeng';
@Component({
    selector: 'event-list',
    templateUrl: 'admin-templates/event-management/event-list.html',
    providers: [EventService],
    directives: [FadeInDirective, Paginator, EventEditorComponent]
})

export class EventComponent implements OnInit {

    objListResponse:EventResponse;
    error:any;
    showForm:boolean = false;
    eventId:string;
    /* Pagination */
    perPage:number = 10;
    currentPage:number = 1;
    totalPage:number = 1;
    nextPage:number = 1;
    preIndex:number = 1;
    /* End Pagination */

    ngOnInit() {
        this.getEventList();
    }

    constructor(private _objService:EventService) {
    }

    getEventList() {
        this._objService.getEventList(this.perPage, this.currentPage)
            .subscribe(objRes =>this.bindList(objRes),
                error => this.errorMessage(error));
    }

    errorMessage(objResponse:any) {
        jQuery.jAlert({
            'title': 'Alert',
            'content': objResponse.message,
            'theme': 'red'
        });
    }

    bindList(objRes:EventResponse) {
        this.objListResponse = objRes;
        this.preIndex = (this.perPage * (this.currentPage - 1));

        /* Pagination */
        if (objRes.dataList.length > 0) {
            let totalPage = objRes.totalItems / this.perPage;
            this.totalPage = totalPage > 1 ? Math.ceil(totalPage) : 1;

            /*End Pagination */
            setTimeout(()=> {
                jQuery('.tablesorter').tablesorter({
                    headers: {
                        4: {sorter: false},
                        5: {sorter: false}
                    }
                });
            }, 50);
        }
    }

    edit(id:string) {
        this.showForm = true;
        this.eventId = id;
    }

    changeDateFormat(data:string) {
        return new Date(data).toLocaleString('en-GB', {
            month: "numeric",
            year: "numeric",
            day: "numeric",
            hour12: false,
            hour: "numeric",
            minute: "numeric"
        });
    }

    addEvent() {
        this.showForm = true;
        this.eventId = null;
    }

    delete(id:string) {
        jQuery.jAlert({
            'type': 'confirm',
            'title': 'Alert',
            'confirmQuestion': 'Are you sure to delete the Event ?',
            'theme': 'red',
            'onConfirm': (e, btn)=> {
                e.preventDefault();
                let objTemp:EventModel = new EventModel();
                objTemp._id = id;
                objTemp.deleted = true;
                this._objService.deleteEvent(objTemp)
                    .subscribe(res=> {
                            this.getEventList();
                            jQuery.jAlert({
                                'title': 'Success',
                                'content': res.message,
                                'theme': 'green'
                            });
                        },
                        error=> {
                            jQuery.jAlert({
                                'title': 'Alert',
                                'content': error.message,
                                'theme': 'red'
                            });
                        });
            }
        });
    }

    showList(arg) {
        if (!arg) // is not Canceled
            this.getEventList();
        this.showForm = false;
    }

    vppChanged(event:Event) {
        this.perPage = Number((<HTMLSelectElement>event.srcElement).value);
        this.getEventList();
    }

    pageChanged(event) {
        this.perPage = event.rows;
        this.currentPage = (Math.floor(event.first / event.rows)) + 1;
        this.getEventList();
        jQuery(".tablesorter").trigger("update");
    }


}

