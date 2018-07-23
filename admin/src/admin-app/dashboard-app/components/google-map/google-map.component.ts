import Swal from 'sweetalert2';
import {Component, EventEmitter, Output, Input, ViewChild, OnInit} from '@angular/core';
import {GoogleMapService} from "./google-map.service";
import {GoogleMapModel} from "./google-map.model";
import {AlertModel} from "../../../shared/models/alert.model";
import {FormGroup, Validators, FormBuilder} from "@angular/forms";
import {ValidationService} from "../../../shared/services/validation.service";

@Component({
  selector: 'google-map',
  templateUrl: './google-map.html'
})

export class GoogleMapComponent implements OnInit {
  objMap:GoogleMapModel = new GoogleMapModel();
  mapTypes:string[] = ['ROADMAP', 'SATELLITE', 'HYBRID', 'TERRAIN'];
  objAlert:AlertModel = new AlertModel();
  isPost:boolean;
  googleMapForm:FormGroup;
  isSubmitted:boolean = false;

  constructor(private _objService:GoogleMapService, private _formBuilder:FormBuilder) {
    this.googleMapForm = this._formBuilder.group({
      "placeName": ['', Validators.required],
      "latitude": ['', Validators.compose([Validators.required, ValidationService.numberWithDecimalValidator])],
      "longitude": ['', Validators.compose([Validators.required, ValidationService.numberWithDecimalValidator])],
      googleMapsApiKey: ['', Validators.required],
      host: [''],
      zoom: ['5', Validators.compose([ValidationService.numberValidator, ValidationService.minValueValidator(1), ValidationService.maxValueValidator(20)])],
      mapType: [''],
      markerTitle: [''],
      scrollWheel: [''],
      showMarker: ['']
    })
  }

  ngOnInit() {
    this.getGoogleMap();
  }

  getGoogleMap() {
    this._objService.getMapDetail()
      .subscribe(res =>this.bindDetail(res),
        error => this.errorMessage(error));
  }

  bindDetail(objMapRes:GoogleMapModel) {
    this.objMap = objMapRes;
  }


  saveMapSettings() {
    this.isSubmitted = true;
    if (this.googleMapForm.valid) {
      if (this.validateForm()) {
        if (this.objMap._id == "" || this.objMap._id == null) {
          this.isPost = true;
          this._objService.saveMap(this.objMap)
            .subscribe(res => this.resStatusMessage(res),
              error => this.errorMessage(error));
        }
        else {
          this.isPost = false;
          this._objService.updateMap(this.objMap)
            .subscribe(res => this.resStatusMessage(res),
              error => this.errorMessage(error));
        }
      }
    }
  }

  validateForm() {
    if (this.objMap.embedGoogleMaps)
      if (this.objMap.googleMapsEmbedCode)
        return true;
      else
        this.objAlert.showAlert("danger", "Alert !!", "Please Enter the Google Map Embeded Code");
    else if (this.objMap.placeName == "" || this.objMap.latitude == "" || this.objMap.longitude == "")
      this.objAlert.showAlert("danger", "Alert !!", "Please Enter Place name, longitude and latitude");
    else
      return true;
  }

  switchEmbed() {
    let mapEmbedScript:string = "";
    let keysection:string = this.objMap.googleMapsApiKey ? "key=" + this.objMap.googleMapsApiKey : "";
    mapEmbedScript += `<script src="https://maps.googleapis.com/maps/api/js?` + keysection + `&callback=initMap"
                async defer></script>`;
    mapEmbedScript += `<div id="map"></div>`;
    mapEmbedScript += '<script>var map;'
      + 'var mapLatlng = new google.maps.LatLng(' + this.objMap.latitude + ', ' + this.objMap.longitude + ');'
      + 'function initMap() {'
      + 'map = new google.maps.Map(document.getElementById("map"), {'
      + 'center: mapLatlng,'
      + 'zoom : ' + this.objMap.zoom + ','
      + ' scrollwheel: ' + this.objMap.scrollWheel + ','
      + ' MapTypeId : google.maps.MapTypeId.' + this.objMap.mapType + '});';
    if (this.objMap.showMarker) {
      mapEmbedScript += 'var marker = new google.maps.Marker({'
        + 'position:mapLatlng ,'
        + 'title:' + this.objMap.markerTitle + ',});'
    }
    mapEmbedScript += '</script>';
    this.objMap.googleMapsEmbedCode = mapEmbedScript;
  }


  resStatusMessage(res:any) {
    this.objAlert.hideAlert();
    if (this.isPost)
      this.getGoogleMap();
    Swal("Success !", res.message, "success");
  }

  errorMessage(res:any) {
    this.objAlert.showAlert("danger", "Alert !!", res, true);
  }
}

