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
var event_service_1 = require("./event.service");
var event_editor_component_1 = require("./event-editor.component");
var event_list_component_1 = require("./event-list.component");
var shared_module_1 = require('../../../shared/shared.module');
var EventManagementModule = (function () {
    function EventManagementModule() {
    }
    EventManagementModule = __decorate([
        core_1.NgModule({
            imports: [shared_module_1.SharedModule],
            declarations: [event_editor_component_1.EventEditorComponent, event_list_component_1.EventComponent],
            providers: [event_service_1.EventService]
        }), 
        __metadata('design:paramtypes', [])
    ], EventManagementModule);
    return EventManagementModule;
}());
exports.EventManagementModule = EventManagementModule;
//# sourceMappingURL=event-managment.module.js.map