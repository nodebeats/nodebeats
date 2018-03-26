import {
  NgModule,
  ModuleWithProviders
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import { ImageUploader } from "./components/image-uploader.component";
import { DocumentUploader } from "./components/doc-uploader.component";
import { FormControlMessages } from "./components/control-valdation-message.component";
import { Alert } from "./components/alert/alert";
import { TinyEditor } from "./components/tinymce.component";
import { ACCORDION_PROVIDERS } from './components/accordion/accordionItem';
// import { DropdownModule } from './components/ng2-bootstrap/ng2-bootstrap'; //provider
import { FadeInDirective } from './directives/fadeInDirective';
import { ProcessingDirective } from './directives/processing.directive';
import { HttpInterceptor } from './services/interceptHttp.service';
import { FileOperrationService } from './services/fileOperation.service';
import { Router, RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
/*material module*/
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
/*Prime Module*/
// import { PasswordModule } from 'primeng/primeng';



@NgModule({
  imports: [CommonModule,
    RouterModule, 
    HttpModule, 
    FormsModule, 
    ReactiveFormsModule, 
    // DropdownModule 
   ],
    declarations: [FadeInDirective, 
      ProcessingDirective,
    ImageUploader, 
    DocumentUploader, 
    FormControlMessages,
    Alert, 
    TinyEditor, 
    ACCORDION_PROVIDERS
  ],
  exports: [
    FadeInDirective, 
    ProcessingDirective,
    ImageUploader, 
    DocumentUploader,
    FormControlMessages,
    Alert, 
    TinyEditor, 
    ACCORDION_PROVIDERS,
    CommonModule, 
    FormsModule, 
    HttpModule, 
    ReactiveFormsModule, 
    // DropdownModule,
    // PasswordModule, 
    RouterModule, 
    MatCheckboxModule, 
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule,
    MatSelectModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatProgressSpinnerModule
  ]
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
