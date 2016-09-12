import {Component, ElementRef, Input, Output, EventEmitter, OnInit, OnChanges} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
    selector: 'ckeditor',
    template: `<textarea name="editor1" id="editor1" [formFormControl]="ckFormControl" #ckCont="ngForm" ></textarea>
    <div class="error-msg" *ngIf="ckCont.control.hasError('required')">Required Field</div>`
})

export class CKEditor implements OnInit,OnChanges {
    @Input() value:string;
    @Input() ckFormControl:FormControl;
    @Output() valueChange = new EventEmitter();
    isChanged:boolean = false;

    constructor(_elm:ElementRef) {
    }

    ngOnInit() {
        //  (<FormControl>this._formDir.form.find('ckFormControl')).updateValue(this.value);
        // this.areaValue = typeof this.value != "undefined" ? this.value : "";
        let that = this;
        CKEDITOR.replace("editor1");
        for (var i in CKEDITOR.instances) {
            CKEDITOR.instances[i].on('change', function (e) {
                that.valueChange.emit(e.editor.getData());
                this.isChanged = true;
            });
            CKEDITOR.instances[i].on('blur', function (e) {
                that.valueChange.emit(e.editor.getData());
                this.isChanged = true;
            });
        }

    }

    ngOnChanges() {
        if (CKEDITOR.instances && this.value != "" && this.value != "undefined")
            CKEDITOR.instances['editor1'].setData(this.value, function () {
                //  this.checkDirty();  // true
            });
    }


}

