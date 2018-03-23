export class GoogleMapModel {
    constructor() {
        this.mapType = "ROADMAP";
        this.zoom = 15;
    }

    _id:string;
    placeName:string;
    longitude:string;
    latitude:string;
    scrollWheel:boolean = false;
    zoom:number;
    mapType:string;
    showMarker:boolean = true;
    markerTitle:string;
    googleMapsApiKey:string;
    embedGoogleMaps:boolean = false;
    googleMapsEmbedCode:string;
    addedBy:string;
    addedOn:string;
    updatedBy:string;
    updatedOn:string;
}