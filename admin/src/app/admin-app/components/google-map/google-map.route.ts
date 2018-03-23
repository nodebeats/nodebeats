import { NgModule } from '@angular/core';
import { GoogleMapComponent } from './google-map.component';
import { Routes,RouterModule } from '@angular/router';

export const GoogleMapRoute: Routes = [
      {path: '', component: GoogleMapComponent},
       ];

@NgModule({
imports: [RouterModule.forChild(GoogleMapRoute)],
exports: [RouterModule],
})

export class GoogleMapRouting {}