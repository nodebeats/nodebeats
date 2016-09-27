"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var google_map_service_1 = require("./google-map.service");
var google_map_model_1 = require("./google-map.model");
var alert_model_1 = require("../../../shared/models/alert.model");
var forms_1 = require("@angular/forms");
var validation_service_1 = require("../../../shared/services/validation.service");
var GoogleMapComponent = (function () {
    function GoogleMapComponent(_objService, _formBuilder) {
        this._objService = _objService;
        this._formBuilder = _formBuilder;
        this.objMap = new google_map_model_1.GoogleMapModel();
        this.mapTypes = ['ROADMAP', 'SATELLITE', 'HYBRID', 'TERRAIN'];
        this.objAlert = new alert_model_1.AlertModel();
        this.isSubmitted = false;
        this.googleMapForm = this._formBuilder.group({
            "placeName": ['', forms_1.Validators.required],
            "latitude": ['', forms_1.Validators.compose([forms_1.Validators.required, validation_service_1.ValidationService.numberWithDecimalValidator])],
            "longitude": ['', forms_1.Validators.compose([forms_1.Validators.required, validation_service_1.ValidationService.numberWithDecimalValidator])],
            googleMapsApiKey: ['', forms_1.Validators.required],
            host: [''],
            zoom: ['5', forms_1.Validators.compose([validation_service_1.ValidationService.numberValidator, validation_service_1.ValidationService.minValueValidator(1), validation_service_1.ValidationService.maxValueValidator(20)])],
            mapType: [''],
            markerTitle: [''],
            secure: [''],
            showMarker: ['']
        });
    }
    GoogleMapComponent.prototype.ngOnInit = function () {
        this.getGoogleMap();
    };
    GoogleMapComponent.prototype.getGoogleMap = function () {
        var _this = this;
        this._objService.getMapDetail()
            .subscribe(function (res) { return _this.bindDetail(res); }, function (error) { return _this.errorMessage(error); });
    };
    GoogleMapComponent.prototype.bindDetail = function (objMapRes) {
        this.objMap = objMapRes;
    };
    GoogleMapComponent.prototype.saveMapSettings = function () {
        var _this = this;
        this.isSubmitted = true;
        if (this.googleMapForm.valid) {
            if (this.validateForm()) {
                if (this.objMap._id == "" || this.objMap._id == null) {
                    this.isPost = true;
                    this._objService.saveMap(this.objMap)
                        .subscribe(function (res) { return _this.resStatusMessage(res); }, function (error) { return _this.errorMessage(error); });
                }
                else {
                    this.isPost = false;
                    this._objService.updateMap(this.objMap)
                        .subscribe(function (res) { return _this.resStatusMessage(res); }, function (error) { return _this.errorMessage(error); });
                }
            }
        }
    };
    GoogleMapComponent.prototype.validateForm = function () {
        if (this.objMap.embedGoogleMaps)
            if (this.objMap.googleMapsEmbedCode)
                return true;
            else
                this.objAlert.showAlert("danger", "Alert !!", "Please Enter the Google Map Embeded Code");
        else if (this.objMap.placeName == "" || this.objMap.latitude == "" || this.objMap.longitude == "")
            this.objAlert.showAlert("danger", "Alert !!", "Please Enter Place name, longitude and latitude");
        else
            return true;
    };
    GoogleMapComponent.prototype.switchEmbed = function () {
        var mapEmbedScript = "";
        var keysection = this.objMap.googleMapsApiKey ? "key=" + this.objMap.googleMapsApiKey : "";
        mapEmbedScript += "<script src=\"https://maps.googleapis.com/maps/api/js?" + keysection + "&callback=initMap\"\n                async defer></script>";
        mapEmbedScript += "<div id=\"map\"></div>";
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
                + 'title:' + this.objMap.markerTitle + ',});';
        }
        mapEmbedScript += '</script>';
        this.objMap.googleMapsEmbedCode = mapEmbedScript;
    };
    GoogleMapComponent.prototype.resStatusMessage = function (res) {
        this.objAlert.hideAlert();
        if (this.isPost)
            this.getGoogleMap();
        jQuery.jAlert({
            'title': 'Success',
            'content': res.message,
            'theme': 'green'
        });
    };
    GoogleMapComponent.prototype.errorMessage = function (res) {
        this.objAlert.showAlert("danger", "Alert !!", res.message, true);
    };
    GoogleMapComponent = __decorate([
        core_1.Component({
            selector: 'google-map',
            templateUrl: 'admin-templates/google-map/google-map.html'
        }), 
        __metadata('design:paramtypes', [google_map_service_1.GoogleMapService, forms_1.FormBuilder])
    ], GoogleMapComponent);
    return GoogleMapComponent;
}());
exports.GoogleMapComponent = GoogleMapComponent;
//# sourceMappingURL=google-map.component.js.map