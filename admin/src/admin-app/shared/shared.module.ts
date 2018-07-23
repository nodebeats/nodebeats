import { httpInterceptorProviders } from './services/interceptors/interceptor.index';
import {
  NgModule,
  ModuleWithProviders
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageUploader } from "./components/image-uploader.component";
import { DocumentUploader } from "./components/doc-uploader.component";
import { FormControlMessages } from "./components/control-valdation-message.component";
import { Alert } from "./components/alert/alert";
import { TinyEditor } from "./components/tinymce.component";
import { FadeInDirective } from './directives/fadeInDirective';
import { ProcessingDirective } from './directives/processing.directive';
import { FileOperrationService } from './services/fileOperation.service';
import { Router, RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
/*material module*/
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { HttpClientModule } from '@angular/common/http';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
/*Prime Module*/
// import { PasswordModule } from 'primeng/primeng';

@NgModule({
  imports: [CommonModule,
    RouterModule, 
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [FadeInDirective, 
    ProcessingDirective,
    ImageUploader, 
    DocumentUploader, 
    FormControlMessages,
    Alert, 
    TinyEditor,
    BreadcrumbComponent
  ],
  exports: [
    BreadcrumbComponent,
    FadeInDirective, 
    ProcessingDirective,
    ImageUploader, 
    DocumentUploader,
    FormControlMessages,
    Alert, 
    TinyEditor, 
    CommonModule, 
    FormsModule, 
    HttpClientModule, 
    ReactiveFormsModule, 
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
    MatProgressSpinnerModule,
    MatSortModule
  ]
})
export class SharedModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [httpInterceptorProviders, FileOperrationService]
    };
  }
}