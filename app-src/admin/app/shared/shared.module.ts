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
import {DropdownModule} from 'ng2-bootstrap/ng2-bootstrap'; //provider
import {TypeaheadModule} from 'ng2-bootstrap/ng2-bootstrap';
import {FadeInDirective} from './directives/fadeInDirective';
import{ProcessingDirective} from './directives/processing.directive';
import{HttpInterceptor} from './services/interceptHttp.service';
import {FileOperrationService} from './services/fileOperation.service';
import {Router} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
/*Material Design*/
import {MdCoreModule} from '@angular2-material/core';
import {MdCheckboxModule} from '@angular2-material/checkbox';
import {MdSlideToggleModule} from '@angular2-material/slide-toggle';
import {MdButtonModule} from '@angular2-material/button';

/*Prime Module*/
import {PasswordModule} from 'primeng/primeng';
import {PaginatorModule} from 'primeng/primeng';
import {CalendarModule} from 'primeng/primeng';
import {DialogModule} from 'primeng/primeng';
import {ChartModule} from 'primeng/primeng';
import {MessagesModule} from 'primeng/primeng';
import {TabViewModule} from 'primeng/primeng';
import {MultiSelectModule} from 'primeng/primeng';
@NgModule({
    imports: [CommonModule, HttpModule, FormsModule, ReactiveFormsModule, DropdownModule],
    declarations: [FadeInDirective, ProcessingDirective,
        ImageUploader, DocumentUploader, FormControlMessages,
        Alert, TinyEditor, ACCORDION_PROVIDERS,
    ],
    exports: [
        FadeInDirective, ProcessingDirective,
        ImageUploader, DocumentUploader, FormControlMessages,
        Alert, TinyEditor, ACCORDION_PROVIDERS,
        CommonModule, FormsModule, HttpModule, ReactiveFormsModule, DropdownModule,
        PasswordModule, CalendarModule, PaginatorModule, DialogModule, ChartModule,
        MessagesModule, TabViewModule, MdCoreModule, MdSlideToggleModule,
        MdButtonModule, MdCheckboxModule, MultiSelectModule]
})
export class SharedModule {
    static forRoot():ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [{
                provide: Http,
                useFactory: (xhrBackend:XHRBackend, requestOptions:RequestOptions, router:Router) => new HttpInterceptor(xhrBackend, requestOptions, router),
                deps: [XHRBackend, RequestOptions, Router]
            }, FileOperrationService]
        };
    }
}