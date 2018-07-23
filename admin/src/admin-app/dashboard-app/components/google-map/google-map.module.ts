import {NgModule}      from '@angular/core';
import {GoogleMapService} from "./google-map.service";
import {GoogleMapComponent} from"./google-map.component";
import {SharedModule} from '../../../shared/shared.module';
import {GoogleMapRouting} from './google-map.route';

@NgModule({
    imports: [SharedModule.forRoot(),GoogleMapRouting],
    declarations: [GoogleMapComponent],
    providers: [GoogleMapService]
})

export class GoogleMapModule {
}