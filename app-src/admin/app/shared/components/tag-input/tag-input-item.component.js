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
var TagInputItemComponent = (function () {
    function TagInputItemComponent() {
        this.tagRemoved = new core_1.EventEmitter();
    }
    TagInputItemComponent.prototype.removeTag = function () {
        this.tagRemoved.emit(this.index);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], TagInputItemComponent.prototype, "selected", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], TagInputItemComponent.prototype, "text", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], TagInputItemComponent.prototype, "index", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], TagInputItemComponent.prototype, "tagRemoved", void 0);
    TagInputItemComponent = __decorate([
        core_1.Component({
            selector: 'tag-input-item',
            template: "{{text}}\n  <span\n  class=\"ng2-tag-input-remove\"\n  (click)=\"removeTag()\">&times;</span>",
            styles: ["\n    :host {\n      display: inline-block;\n      background: #ccc;\n      padding: 7px;\n      border-radius: 90px;\n      margin-right: 10px;\n    }\n\n    :host.ng2-tag-input-item-selected {\n      color: white;\n      background: #0d8bff;\n    }\n\n    .ng2-tag-input-remove {\n      cursor: pointer;\n      display: inline-block;\n      padding: 0 3px;\n    }\n  "],
            host: {
                '[class.ng2-tag-input-item-selected]': 'selected'
            }
        }), 
        __metadata('design:paramtypes', [])
    ], TagInputItemComponent);
    return TagInputItemComponent;
}());
exports.TagInputItemComponent = TagInputItemComponent;
//# sourceMappingURL=tag-input-item.component.js.map