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
var testing_1 = require('@angular/core/testing');
var dropdown_module_1 = require('./dropdown.module');
var defaultHtml = "\n  <div dropdown>\n    <button dropdownToggle>Dropdown</button>\n    <ul dropdownMenu>\n      <li><a href=\"#\">One</a></li>\n      <li><a href=\"#\">Two</a></li>\n    </ul>\n  </div>\n";
describe('Directive: Dropdown', function () {
    it('should be closed by default', function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [TestDropdownComponent],
            imports: [dropdown_module_1.DropdownModule]
        });
        testing_1.TestBed.overrideComponent(TestDropdownComponent, { set: { template: defaultHtml } });
        var fixture = testing_1.TestBed.createComponent(TestDropdownComponent);
        fixture.detectChanges();
        var element = fixture.nativeElement;
        expect(element.querySelector('.dropdown').classList).not.toContain('open');
    });
    it('should be opened if isOpen === true and toggle on isOpen changes', function () {
        var html = "\n      <div dropdown [(isOpen)]=\"isOpen\">\n        <button dropdownToggle>Dropdown</button>\n        <ul dropdownMenu>\n          <li><a href=\"#\">One</a></li>\n          <li><a href=\"#\">Two</a></li>\n        </ul>\n      </div>\n    ";
        testing_1.TestBed.configureTestingModule({
            declarations: [TestDropdownComponent],
            imports: [dropdown_module_1.DropdownModule]
        });
        testing_1.TestBed.overrideComponent(TestDropdownComponent, { set: { template: html } });
        var fixture = testing_1.TestBed.createComponent(TestDropdownComponent);
        fixture.detectChanges();
        var element = fixture.nativeElement;
        var context = fixture.componentInstance;
        context.isOpen = true;
        fixture.detectChanges();
        expect(element.querySelector('.dropdown').classList).toContain('open');
        context.isOpen = false;
        fixture.detectChanges();
        expect(element.querySelector('.dropdown').classList).not.toContain('open');
        context.isOpen = true;
        fixture.detectChanges();
        expect(element.querySelector('.dropdown').classList).toContain('open');
    });
    it('should toggle by click', function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [TestDropdownComponent],
            imports: [dropdown_module_1.DropdownModule]
        });
        testing_1.TestBed.overrideComponent(TestDropdownComponent, { set: { template: defaultHtml } });
        var fixture = testing_1.TestBed.createComponent(TestDropdownComponent);
        fixture.detectChanges();
        var element = fixture.nativeElement;
        expect(element.querySelector('.dropdown').classList).not.toContain('open');
        element.querySelector('button').click();
        fixture.detectChanges();
        expect(element.querySelector('.dropdown').classList).toContain('open');
        element.querySelector('button').click();
        fixture.detectChanges();
        expect(element.querySelector('.dropdown').classList).not.toContain('open');
    });
    it('should close by click on nonInput menu item', function () {
        var html = "\n      <div dropdown>\n        <button dropdownToggle>Dropdown</button>\n        <ul dropdownMenu>\n          <li><a href=\"#\">One</a></li>\n          <li><a href=\"#\">Two</a></li>\n        </ul>\n      </div>\n    ";
        testing_1.TestBed.configureTestingModule({
            declarations: [TestDropdownComponent],
            imports: [dropdown_module_1.DropdownModule]
        });
        testing_1.TestBed.overrideComponent(TestDropdownComponent, { set: { template: html } });
        var fixture = testing_1.TestBed.createComponent(TestDropdownComponent);
        fixture.detectChanges();
        var element = fixture.nativeElement;
        fixture.detectChanges();
        element.querySelector('button').click();
        fixture.detectChanges();
        expect(element.querySelector('.dropdown').classList).toContain('open');
        element.querySelector('li').click();
        fixture.detectChanges();
        expect(element.querySelector('.dropdown').classList).not.toContain('open');
    });
    it('should not close by click on input or textarea menu item', function () {
        var html = "\n      <div dropdown>\n        <button dropdownToggle>Dropdown</button>\n        <ul dropdownMenu>\n          <li><input type=\"text\"></li>\n          <li><textarea>dropdown</textarea></li>\n          <li><a href=\"#\">Two</a></li>\n        </ul>\n      </div>\n    ";
        testing_1.TestBed.configureTestingModule({
            declarations: [TestDropdownComponent],
            imports: [dropdown_module_1.DropdownModule]
        });
        testing_1.TestBed.overrideComponent(TestDropdownComponent, { set: { template: html } });
        var fixture = testing_1.TestBed.createComponent(TestDropdownComponent);
        fixture.detectChanges();
        var element = fixture.nativeElement;
        fixture.detectChanges();
        element.querySelector('button').click();
        fixture.detectChanges();
        expect(element.querySelector('.dropdown').classList).toContain('open');
        element.querySelector('input').click();
        fixture.detectChanges();
        expect(element.querySelector('.dropdown').classList).toContain('open');
        element.querySelector('textarea').click();
        fixture.detectChanges();
        expect(element.querySelector('.dropdown').classList).toContain('open');
    });
    it('should not close by click on menu item if autoClose === disabled', function () {
        var html = "\n      <div dropdown [autoClose]=\"autoClose\">\n        <button dropdownToggle>Dropdown</button>\n        <ul dropdownMenu>\n          <li><a href=\"#\">One</a></li>\n          <li><a href=\"#\">Two</a></li>\n        </ul>\n      </div>\n    ";
        testing_1.TestBed.configureTestingModule({
            declarations: [TestDropdownComponent],
            imports: [dropdown_module_1.DropdownModule]
        });
        testing_1.TestBed.overrideComponent(TestDropdownComponent, { set: { template: html } });
        var fixture = testing_1.TestBed.createComponent(TestDropdownComponent);
        fixture.detectChanges();
        var element = fixture.nativeElement;
        var context = fixture.componentInstance;
        context.autoClose = 'disabled';
        fixture.detectChanges();
        element.querySelector('button').click();
        fixture.detectChanges();
        expect(element.querySelector('.dropdown').classList).toContain('open');
        element.querySelector('li').click();
        fixture.detectChanges();
        expect(element.querySelector('.dropdown').classList).toContain('open');
    });
    xit('should close by click on input in menu if autoClose === always', function () {
        var html = "\n      <div dropdown [autoClose]=\"autoClose\">\n        <button dropdownToggle>Dropdown</button>\n        <ul dropdownMenu>\n          <li><input type=\"text\"></li>\n          <li><a href=\"#\">Two</a></li>\n        </ul>\n      </div>\n    ";
        testing_1.TestBed.configureTestingModule({
            declarations: [TestDropdownComponent],
            imports: [dropdown_module_1.DropdownModule]
        });
        testing_1.TestBed.overrideComponent(TestDropdownComponent, { set: { template: html } });
        var fixture = testing_1.TestBed.createComponent(TestDropdownComponent);
        fixture.detectChanges();
        var element = fixture.nativeElement;
        var context = fixture.componentInstance;
        context.autoClose = 'always';
        fixture.detectChanges();
        element.querySelector('button').click();
        fixture.detectChanges();
        expect(element.querySelector('.dropdown').classList).toContain('open');
        element.querySelector('input').click();
        fixture.detectChanges();
        expect(element.querySelector('.dropdown').classList).not.toContain('open');
    });
    xit('should close by click on any element outside the dropdown', function () {
        var html = "\n      <div dropdown>\n        <button dropdownToggle>Dropdown</button>\n        <ul dropdownMenu>\n          <li><a href=\"#\">One</a></li>\n          <li><a href=\"#\">Two</a></li>\n        </ul>\n      </div>\n      <span>outside</span>\n    ";
        testing_1.TestBed.configureTestingModule({
            declarations: [TestDropdownComponent],
            imports: [dropdown_module_1.DropdownModule]
        });
        testing_1.TestBed.overrideComponent(TestDropdownComponent, { set: { template: html } });
        var fixture = testing_1.TestBed.createComponent(TestDropdownComponent);
        fixture.detectChanges();
        var element = fixture.nativeElement;
        var context = fixture.componentInstance;
        context.autoClose = 'outsideClick';
        fixture.detectChanges();
        element.querySelector('button').click();
        fixture.detectChanges();
        expect(element.querySelector('.dropdown').classList).toContain('open');
        element.querySelector('li').click();
        fixture.detectChanges();
        expect(element.querySelector('.dropdown').classList).toContain('open');
        element.querySelector('span').click();
        fixture.detectChanges();
        expect(element.querySelector('.dropdown').classList).not.toContain('open');
    });
    xit('should enable navigation of dropdown list elements with the arrow keys if keyboardNav is true', function () {
        var html = "\n      <div dropdown [keyboardNav]=\"keyboardNav\">\n        <button dropdownToggle>Dropdown</button>\n        <ul dropdownMenu>\n          <li><a href=\"#\">One</a></li>\n          <li><a href=\"#\">Two</a></li>\n        </ul>\n      </div>\n    ";
        testing_1.TestBed.configureTestingModule({
            declarations: [TestDropdownComponent],
            imports: [dropdown_module_1.DropdownModule]
        });
        testing_1.TestBed.overrideComponent(TestDropdownComponent, { set: { template: html } });
        var fixture = testing_1.TestBed.createComponent(TestDropdownComponent);
        fixture.detectChanges();
        var element = fixture.nativeElement;
        var context = fixture.componentInstance;
        context.keyboardNav = true;
        fixture.detectChanges();
        element.querySelector('button').click();
        fixture.detectChanges();
        expect(element.querySelector('.dropdown').classList).toContain('open');
        // todo: emulate keypress, check if item has hover
    });
    describe('Directive: dropdownToggle', function () {
        it('should not open if toggle isDisabled', function () {
            var html = "\n      <div dropdown>\n        <button dropdownToggle [isDisabled]=\"isDisabled\">Dropdown</button>\n        <ul dropdownMenu>\n          <li><a href=\"#\">One</a></li>\n          <li><a href=\"#\">Two</a></li>\n        </ul>\n      </div>\n    ";
            testing_1.TestBed.configureTestingModule({
                declarations: [TestDropdownComponent],
                imports: [dropdown_module_1.DropdownModule]
            });
            testing_1.TestBed.overrideComponent(TestDropdownComponent, { set: { template: html } });
            var fixture = testing_1.TestBed.createComponent(TestDropdownComponent);
            fixture.detectChanges();
            var element = fixture.nativeElement;
            var context = fixture.componentInstance;
            context.isDisabled = true;
            fixture.detectChanges();
            expect(element.querySelector('.dropdown').classList).not.toContain('open');
            element.querySelector('button').click();
            fixture.detectChanges();
            expect(element.querySelector('.dropdown').classList).not.toContain('open');
            context.isDisabled = false;
            fixture.detectChanges();
            element.querySelector('button').click();
            fixture.detectChanges();
            expect(element.querySelector('.dropdown').classList).toContain('open');
        });
        it('should have dropdown-toggle class by default', function () {
            var html = "\n      <div dropdown>\n        <button dropdownToggle>Dropdown</button>\n        <ul dropdownMenu>\n          <li><a href=\"#\">One</a></li>\n          <li><a href=\"#\">Two</a></li>\n        </ul>\n      </div>\n    ";
            testing_1.TestBed.configureTestingModule({
                declarations: [TestDropdownComponent],
                imports: [dropdown_module_1.DropdownModule]
            });
            testing_1.TestBed.overrideComponent(TestDropdownComponent, { set: { template: html } });
            var fixture = testing_1.TestBed.createComponent(TestDropdownComponent);
            fixture.detectChanges();
            var element = fixture.nativeElement;
            expect(element.querySelector('button').classList).toContain('dropdown-toggle');
        });
        it('should not add dropdown-toggle class if addToggleClass is false', function () {
            var html = "\n      <div dropdown>\n        <button dropdownToggle [addToggleClass]=\"addToggleClass\">Dropdown</button>\n        <ul dropdownMenu>\n          <li><a href=\"#\">One</a></li>\n          <li><a href=\"#\">Two</a></li>\n        </ul>\n      </div>\n    ";
            testing_1.TestBed.configureTestingModule({
                declarations: [TestDropdownComponent],
                imports: [dropdown_module_1.DropdownModule]
            });
            testing_1.TestBed.overrideComponent(TestDropdownComponent, { set: { template: html } });
            var fixture = testing_1.TestBed.createComponent(TestDropdownComponent);
            fixture.detectChanges();
            var element = fixture.nativeElement;
            expect(element.querySelector('button').classList).not.toContain('dropdown-toggle');
        });
    });
});
var TestDropdownComponent = (function () {
    function TestDropdownComponent() {
        this.isOpen = false;
        this.isDisabled = false;
        this.addToggleClass = false;
        this.autoClose = 'nonInput';
        this.keyboardNav = false;
    }
    TestDropdownComponent = __decorate([
        core_1.Component({
            selector: 'dropdown-test',
            template: ''
        }), 
        __metadata('design:paramtypes', [])
    ], TestDropdownComponent);
    return TestDropdownComponent;
}());
//# sourceMappingURL=dropdown.directive.spec.js.map