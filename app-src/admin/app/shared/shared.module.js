"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var http_1 = require('@angular/http');
var image_uploader_component_1 = require("./components/image-uploader.component");
var doc_uploader_component_1 = require("./components/doc-uploader.component");
var control_valdation_message_component_1 = require("./components/control-valdation-message.component");
var alert_1 = require("./components/alert/alert");
var tinymce_component_1 = require("./components/tinymce.component");
var accordionItem_1 = require('./components/accordion/accordionItem');
var ng2_bootstrap_1 = require('ng2-bootstrap/ng2-bootstrap'); //provider
var fadeInDirective_1 = require('./directives/fadeInDirective');
var processing_directive_1 = require('./directives/processing.directive');
var interceptHttp_service_1 = require('./services/interceptHttp.service');
var fileOperation_service_1 = require('./services/fileOperation.service');
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
/*Material Design*/
var core_2 = require('@angular2-material/core');
var checkbox_1 = require('@angular2-material/checkbox');
var slide_toggle_1 = require('@angular2-material/slide-toggle');
var button_1 = require('@angular2-material/button');
/*Prime Module*/
var primeng_1 = require('primeng/primeng');
var primeng_2 = require('primeng/primeng');
var primeng_3 = require('primeng/primeng');
var primeng_4 = require('primeng/primeng');
var primeng_5 = require('primeng/primeng');
var primeng_6 = require('primeng/primeng');
var primeng_7 = require('primeng/primeng');
var primeng_8 = require('primeng/primeng');
var SharedModule = (function () {
    function SharedModule() {
    }
    SharedModule.forRoot = function () {
        return {
            ngModule: SharedModule,
            providers: [{
                    provide: http_1.Http,
                    useFactory: function (xhrBackend, requestOptions, router) { return new interceptHttp_service_1.HttpInterceptor(xhrBackend, requestOptions, router); },
                    deps: [http_1.XHRBackend, http_1.RequestOptions, router_1.Router]
                }, fileOperation_service_1.FileOperrationService]
        };
    };
    SharedModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, http_1.HttpModule, forms_1.FormsModule, forms_1.ReactiveFormsModule, ng2_bootstrap_1.DropdownModule],
            declarations: [fadeInDirective_1.FadeInDirective, processing_directive_1.ProcessingDirective,
                image_uploader_component_1.ImageUploader, doc_uploader_component_1.DocumentUploader, control_valdation_message_component_1.FormControlMessages,
                alert_1.Alert, tinymce_component_1.TinyEditor, accordionItem_1.ACCORDION_PROVIDERS,
            ],
            exports: [
                fadeInDirective_1.FadeInDirective, processing_directive_1.ProcessingDirective,
                image_uploader_component_1.ImageUploader, doc_uploader_component_1.DocumentUploader, control_valdation_message_component_1.FormControlMessages,
                alert_1.Alert, tinymce_component_1.TinyEditor, accordionItem_1.ACCORDION_PROVIDERS,
                common_1.CommonModule, forms_1.FormsModule, http_1.HttpModule, forms_1.ReactiveFormsModule, ng2_bootstrap_1.DropdownModule,
                primeng_1.PasswordModule, primeng_3.CalendarModule, primeng_2.PaginatorModule, primeng_4.DialogModule, primeng_5.ChartModule,
                primeng_6.MessagesModule, primeng_7.TabViewModule, core_2.MdCoreModule, slide_toggle_1.MdSlideToggleModule,
                button_1.MdButtonModule, checkbox_1.MdCheckboxModule, primeng_8.MultiSelectModule]
        }), 
        __metadata('design:paramtypes', [])
    ], SharedModule);
    return SharedModule;
}());
exports.SharedModule = SharedModule;
//# sourceMappingURL=shared.module.js.map