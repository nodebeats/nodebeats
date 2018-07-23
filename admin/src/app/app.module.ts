import { FileOperrationService } from '../admin-app/shared/services/fileOperation.service';
import { HttpClientModule } from '@angular/common/http';
import { BlogService } from '../admin-app/dashboard-app/components/blog/blog.service';
import { NgModule, Inject, PLATFORM_ID, APP_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { LandingComponent } from './components/landing/landing.component';
import { isPlatformBrowser } from '@angular/common';
import { httpInterceptorProviders } from '../admin-app/shared/services/interceptors/interceptor.index';
import { ClientSharedModule } from './shared/shared.module';
import { CloudinaryService } from '../admin-app/dashboard-app/components/cloudinary/cloudinary.service';

@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: 'nodebeats-v3' }),
    AppRoutingModule,
    HttpClientModule,
    BrowserTransferStateModule,
    ClientSharedModule
  ],
  declarations: [AppComponent, LandingComponent],
  providers: [BlogService, FileOperrationService, httpInterceptorProviders, CloudinaryService],
  bootstrap: [AppComponent]
})

export class AppModule { 
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(APP_ID) private appId: string) {
    const platform = isPlatformBrowser(platformId) ?
      'in the browser' : 'on the server';
    console.log(`Running ${platform} with appId=${appId}`);
  }
}
