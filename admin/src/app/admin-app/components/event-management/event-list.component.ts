import { Component, OnInit } from '@angular/core';
import { EventService } from "./event.service";
import { EventResponse, EventModel } from "./event.model";
import {Router} from '@angular/router';
import { MatTableDataSource } from '@angular/material';


@Component({
    selector: 'event-list',
    templateUrl: './event-list.html'
})

export class EventComponent implements OnInit {

    objListResponse: EventResponse;
    error: any;
    showForm: boolean = false;
    eventId: string;
    displayedColumns = ['SN','Event Title', 'Venue','Start Date/Time', 'Active', 'Actions'];
    dataSource:any;
    /* Pagination */
    pageSizeOptions = [5, 10, 25, 50, 100];
    perPage: number = 10;
    currentPage: number = 1;
    totalItems: number = 1;
    bindSort: boolean = false;
    preIndex: number = 1;
    /* End Pagination */

    ngOnInit() {
        this.getEventList();
    }

    constructor(private _objService: EventService,private router:Router) {
    }

    getEventList() {
        this._objService.getEventList(this.perPage, this.currentPage)
            .subscribe(objRes => this.bindList(objRes),
                error => this.errorMessage(error));
    }

    errorMessage(objResponse: any) {
        swal("Alert !", objResponse.message, "info");

    }

    bindList(objRes: EventResponse) {
        this.objListResponse = objRes;
    this.dataSource = new MatTableDataSource(this.objListResponse.dataList);            
        this.preIndex = (this.perPage * (this.currentPage - 1));
        this.totalItems = objRes.totalItems;
        /* Pagination */
        if (objRes.dataList.length > 0) {

            /*End Pagination */
            if (!this.bindSort) {
                this.bindSort = true;
                this.sortTable();
            }
            else
                jQuery("table").trigger("update", [true]);
        }
    }

    sortTable() {
        setTimeout(() => {
            jQuery('.tablesorter').tablesorter({
                headers: {
                    4: { sorter: false },
                    5: { sorter: false }
                }
            });
        }, 50);
    }

    edit(id: string) {
        // this.showForm = true;
        this.router.navigate(['/event/editor',id]);
        // this.eventId = id;
    }

    changeDateFormat(data: string) {
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
        this.router.navigate(['/event/editor']);
        // this.showForm = true;
        // this.eventId = null;
    }

    delete(id: string) {
        swal({
            title: "Are you sure?",
            text: "You will not be able to recover this Event !",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: false
        },
            () => {
                let objTemp: EventModel = new EventModel();
                objTemp._id = id;
                objTemp.deleted = true;
                this._objService.deleteEvent(objTemp)
                    .subscribe(res => {
                        this.getEventList();
                        swal("Deleted!", res.message, "success");
                    },
                        error => {
                            swal("Alert!", error.message, "info");

                        });
            });
    }

    showList(arg) {
        if (!arg) // is not Canceled
        {
            this.getEventList();

        }
        this.showForm = false;
        this.sortTable();
    }

    vppChanged(event: Event) {
        this.perPage = Number((<HTMLSelectElement>event.srcElement).value);
        this.getEventList();
    }

    pageChanged(event) {
        this.perPage = event.pageSize;
        this.currentPage = event.pageIndex + 1;
        this.getEventList();
    }

}

