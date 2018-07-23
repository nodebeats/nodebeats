import Swal from "sweetalert2";
import { Component, OnInit } from "@angular/core";
import { EventService } from "./event.service";
import { EventResponse, EventModel } from "./event.model";
import { Router } from "@angular/router";
import { MatTableDataSource } from "@angular/material";

@Component({
  selector: "event-list",
  templateUrl: "./event-list.html"
})

export class EventComponent implements OnInit {
  objListResponse: EventResponse;
  error: any;
  showForm: boolean = false;
  eventId: string;
  displayedColumns = [
    "SN",
    "Event Title",
    "Venue",
    "Start Date/Time",
    "Active",
    "Actions"
  ];
  dataSource: any;
  /* Pagination */
  pageSizeOptions = [5, 10, 25, 50, 100];
  perPage: number = 10;
  currentPage: number = 1;
  totalItems: number = 1;
  preIndex: number = 0;
  /* End Pagination */

  ngOnInit() {
    this.getEventList();
  }

  constructor(private _objService: EventService, private router: Router) {}

  getEventList() {
    this._objService
      .getEventList(this.perPage, this.currentPage)
      .subscribe(
        objRes => this.bindList(objRes),
        error => this.errorMessage(error)
      );
  }

  errorMessage(objResponse: any) {
    Swal("Alert !", objResponse, "info");
  }

  bindList(objRes: EventResponse) {
    this.objListResponse = objRes;
    this.dataSource = new MatTableDataSource(this.objListResponse.dataList);
    this.totalItems = objRes.totalItems;
    this.preIndex = (this.perPage * (this.currentPage - 1));
  }

  edit(id: string) {
    this.router.navigate(["/event/editor", id]);
  }

  changeDateFormat(data: string) {
    return new Date(data).toLocaleString("en-GB", {
      month: "numeric",
      year: "numeric",
      day: "numeric",
      hour12: false,
      hour: "numeric",
      minute: "numeric"
    });
  }

  addEvent() {
    this.router.navigate(["/event/editor"]);
  }

  delete(id: string) {
    Swal({
      title: "Are you sure?",
      text: "You will not be able to recover this Event !",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, delete it!"
    }).then(result => {
      if (result.value) {
        let objTemp: EventModel = new EventModel();
        objTemp._id = id;
        objTemp.deleted = true;
        this._objService.deleteEvent(objTemp).subscribe(
          res => {
            this.getEventList();
            Swal("Deleted!", res.message, "success");
          },
          error => {
            Swal("Alert!", error, "info");
          }
        );
      }
    });
  }

  pageChanged(event: any) {
    this.perPage = event.pageSize;
    this.currentPage = event.pageIndex + 1;
    this.getEventList();
  }
}
