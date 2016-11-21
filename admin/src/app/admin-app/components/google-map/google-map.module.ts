import {NgModule}      from '@angular/core';
import {GoogleMapService} from "./google-map.service";
import {GoogleMapComponent} from"./google-map.component";
import {SharedModule} from '../../../shared/shared.module';

@NgModule({
    imports: [SharedModule],
    declarations: [GoogleMapComponent],
    providers: [GoogleMapService]
})

export class GoogleMapModule {
}