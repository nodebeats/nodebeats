import { NgModule } from '@angular/core';
import { TokenManagementComponent } from './token-management.component';
import { Routes,RouterModule } from '@angular/router';


export const TokenManagementRoute: Routes = [
  {path:'', component: TokenManagementComponent},
   ];

@NgModule({
  imports: [RouterModule.forChild(TokenManagementRoute)],
  exports: [RouterModule],
})

export class TokenManagementRouting { }