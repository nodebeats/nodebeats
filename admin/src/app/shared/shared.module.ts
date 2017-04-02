import {
  NgModule,
  ModuleWithProviders
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpModule, Http, XHRBackend, RequestOptions} from '@angular/http';
import {ImageUploader} from "./components/image-uploader.component";
import {DocumentUploader} from "./components/doc-uploader.component";
import {FormControlMessages} from "./components/control-valdation-message.component";
import {Alert} from "./components/alert/alert";
import {TinyEditor} from "./components/tinymce.component";
import {ACCORDION_PROVIDERS} from './components/accordion/accordionItem';
import {DropdownModule} from './components/ng2-bootstrap/ng2-bootstrap'; //provider
import {TypeaheadModule} from './components/ng2-bootstrap/ng2-bootstrap';
import {FadeInDirective} from './directives/fadeInDirective';
import{ProcessingDirective} from './directives/processing.directive';
import{HttpInterceptor} from './services/interceptHttp.service';
import {FileOperrationService} from './services/fileOperation.service';
import {Router, RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


/*Prime Module*/
import {PasswordModule} from 'primeng/primeng';
import {PaginatorModule} from 'primeng/primeng';
import {CalendarModule} from 'primeng/primeng';
import {DialogModule} from 'primeng/primeng';
import {ChartModule} from 'primeng/primeng';
import {MessagesModule} from 'primeng/primeng';
import {TabViewModule} from 'primeng/primeng';
import {MultiSelectModule} from 'primeng/primeng';
import {MaterialModule} from "@angular/material";
@NgModule({
  imports: [CommonModule, RouterModule, HttpModule, FormsModule, ReactiveFormsModule, DropdownModule, MaterialModule],
  declarations: [FadeInDirective, ProcessingDirective,
    ImageUploader, DocumentUploader, FormControlMessages,
    Alert, TinyEditor, ACCORDION_PROVIDERS,
  ],
  exports: [
    FadeInDirective, ProcessingDirective,
    ImageUploader, DocumentUploader, FormControlMessages,
    Alert, TinyEditor, ACCORDION_PROVIDERS,
    CommonModule, FormsModule, HttpModule, ReactiveFormsModule, DropdownModule,
    PasswordModule, RouterModule, CalendarModule, PaginatorModule, DialogModule, ChartModule,
    MessagesModule, TabViewModule, MultiSelectModule, MaterialModule]
})
export class SharedModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [{
        provide: Http,
        useFactory: httpFactory,
        deps: [XHRBackend, RequestOptions, Router]
      }, FileOperrationService]
    };
  }
}

export function httpFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions, router: Router) {
  return new HttpInterceptor(xhrBackend, requestOptions, router);
}
