import {Component, HostBinding, Input, forwardRef, Provider} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {isBlank} from '@angular/common/src/facade/lang';
import {TagInputItemComponent} from './tag-input-item.component';
import {TYPEAHEAD_DIRECTIVES} from"ng2-bootstrap/ng2-bootstrap";
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgModel} from '@angular/common';
const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR:Provider = new Provider(
    NG_VALUE_ACCESSOR, {
        useExisting: forwardRef(() => TagInputComponent),
        multi: true
    });

@Component({
    selector: 'tag-input',
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR, NgModel],
    template: `<tag-input-item
    [text]="tag"
    [index]="index"
    [selected]="selectedTag === index"
    (tagRemoved)="_removeTag($event)"
    *ngFor="let tag of tagsList; let index = index">
  </tag-input-item>
  <input
    class="ng2-tag-input-field"
    type="text"
    [placeholder]="placeholder"
    [(ngModel)]="inputValue"
    (paste)="inputPaste($event)"
    (keydown)="inputChanged($event)"
    (blur)="inputBlurred($event)"
    (focus)="inputFocused()"  
     [typeahead]="autoCompleteData"
       (typeaheadOnSelect)="typeaheadOnSelect($event)"
       #tagInputRef>`,

    styles: [`
    :host {
      display: block;
      box-shadow: 0 1px #ccc;
      padding: 5px 0;
    }

    :host.ng2-tag-input-focus {
      box-shadow: 0 2px #0d8bff;
    }

    .ng2-tag-input-field {
      display: inline-block;
      width: auto;
      box-shadow: none;
      border: 0;
    }
  `],
    directives: [TagInputItemComponent, CORE_DIRECTIVES, FORM_DIRECTIVES, TYPEAHEAD_DIRECTIVES]
})
export class TagInputComponent implements ControlValueAccessor {
    @Input() placeholder:string = 'Add a tag';
    @Input() ngModel:string[];
    @Input() delimiterCode:string = '188';
    @Input() addOnBlur:boolean = true;
    @Input() addOnEnter:boolean = true;
    @Input() addOnPaste:boolean = true;
    @Input() autoCompleteData:string[];
    @Input() allowedTagsPattern:RegExp = /.+/;
    @HostBinding('class.ng2-tag-input-focus') isFocussed;

    public tagsList:string[] = [];
    public inputValue:string = '';
    public delimiter:number;
    public selectedTag:number;

    constructor() {
    }

    ngOnInit() {
        if (this.ngModel) this.tagsList = this.ngModel;
        this.onChange(this.tagsList);
        this.delimiter = parseInt(this.delimiterCode);
    }

    ngOnChanges() {
        if (this.ngModel)
            this.tagsList = this.ngModel;
    }

    public typeaheadOnSelect(e:any):void {
        console.log(`Selected value: ${e.item}`);
    }

    inputChanged(event) {
        let key = event.keyCode;
        switch (key) {
            case 8: // Backspace
                this._handleBackspace();
                break;
            case 13: //Enter
                this.addOnEnter && this._addTags([this.inputValue.toLowerCase()]);
                event.preventDefault();
                break;

            case this.delimiter:
                this._addTags([this.inputValue.toLowerCase()]);
                event.preventDefault();
                break;

            default:
                this._resetSelected();
                break;
        }
    }

    inputBlurred(event) {
        this.addOnBlur && this._addTags([this.inputValue.toLowerCase()]);
        this.isFocussed = false;
    }

    inputFocused(event) {
        this.isFocussed = true;
    }

    inputPaste(event) {
        let clipboardData = event.clipboardData || (event.originalEvent && event.originalEvent.clipboardData);
        let pastedString = clipboardData.getData('text/plain');
        let tags = this._splitString(pastedString);
        let tagsToAdd = tags.filter((tag) => this._isTagValid(tag));
        this._addTags(tagsToAdd);
        setTimeout(() => this.inputValue = '', 3000);
    }

    private _splitString(tagString:string) {
        tagString = tagString.trim();
        let tags = tagString.split(String.fromCharCode(this.delimiter));
        return tags.filter((tag) => !!tag);
    }

    private _isTagValid(tagString:string) {
        if (this.tagsList.indexOf(tagString.toLowerCase()) == -1)
            return this.allowedTagsPattern.test(tagString.toLowerCase());
        else
            return false;
    }

    private _addTags(tags:string[]) {
        let validTags = tags.filter((tag) => this._isTagValid(tag));
        this.tagsList = this.tagsList.concat(validTags);
        this._resetSelected();
        this._resetInput();
        this.onChange(this.tagsList);
    }

    private _removeTag(tagIndexToRemove) {
        this.tagsList.splice(tagIndexToRemove, 1);
        this._resetSelected();
        this.onChange(this.tagsList);
    }

    private _handleBackspace() {
        if (!this.inputValue.length && this.tagsList.length) {
            if (!isBlank(this.selectedTag)) {
                this._removeTag(this.selectedTag);
            }
            else {
                this.selectedTag = this.tagsList.length - 1;
            }
        }
    }

    private _resetSelected() {
        this.selectedTag = null;
    }

    private _resetInput() {
        this.inputValue = '';
    }

    /** Implemented as part of ControlValueAccessor. */
    onChange:(value) => any = () => {
    };

    onTouched:() => any = () => {
    };

    writeValue(value:any) {
    }

    registerOnChange(fn:any) {
        this.onChange = fn;
    }

    registerOnTouched(fn:any) {
        this.onTouched = fn;
    }
}
