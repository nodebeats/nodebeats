import {
    Component,
    ElementRef,
    OnInit,
    Input,
    Output,
    EventEmitter,
    OnChanges,
    ViewChild

} from "@angular/core";
import {ValidationService} from "../services/validation.service";
import {FormControl, REACTIVE_FORM_DIRECTIVES} from "@angular/forms";
import {FormControlMessages} from "./control-valdation-message.component";

@Component({
    selector: 'doc-uploader',
    template: ` <label class="lbl-file-name" *ngIf="fileName">{{fileName}}</label>
                    <a *ngIf="fileName && isValidFile" href="javascript:void(0)" (click)="onDeleteFile()">
                    <i class="fa fa-trash" aria-hidden="true"></i></a>
                    <div class="clearfix"></div>
                    <input type="file" class="inputfile" id="file" #inputFile (change)="onFileSelect($event)">
                    <label for="file"><i class="fa fa-upload" aria-hidden="true"> {{fileName?fileName:"Choose a File..."}}</i></label>
                     <div class="error-msg" *ngIf="!isValidFile ">*Supported Extension : {{allowedExtMessage}} and max size : {{allowedSize}} MB</div>
                    <control-messages [isSubmitted]="isSubmitted"
                     [control]="docFormControl"></control-messages>`,
    directives: [REACTIVE_FORM_DIRECTIVES, FormControlMessages]

})
export class DocumentUploader implements OnInit,OnChanges {
    @Input() docFormControl:FormControl;
    @Input() fileName:string;
    @Input() allowedExt:string[];
    @Input() allowedSize:number;
    @Input() isSubmitted:boolean;
    @Output() fileSelectedEvent:EventEmitter<any> = new EventEmitter();
    @Output() deleteFileEvent:EventEmitter<any> = new EventEmitter();
    @ViewChild('inputFile') inputFile;
    private file:File;
    isValidFile:boolean = true;
    private isFresh:boolean = false;
    allowedExtMessage:string;

    constructor() {
    }

    ngOnInit() {
        this.allowedExtMessage = this.allowedExt.join(',');
    }

    onFileSelect(e) {
        this.file = e.target.files[0];
        let allowedExt:string[] = this.allowedExt;
        let allowedSize:number = this.allowedSize;
        this.isValidFile = ValidationService.documentValidation(this.file, allowedExt, allowedSize);
        if (this.isValidFile) {
            this.docFormControl.updateValue(this.file.name);
            if (!this.fileName)
                this.isFresh = true;
            this.fileName = this.file.name;
            this.fileSelectedEvent.emit(this.file);
        }
        else {
            this.docFormControl.updateValue("");
            this.inputFile.nativeElement.value = "";
        }
    }

    onDeleteFile(docId:string) {
        if (!this.isFresh) {
            this.deleteFileEvent.emit(docId);
        }
        this.clearValue();

    }

    clearValue() {
        this.file = null;
        this.fileName = "";
        this.docFormControl.updateValue("");
        this.inputFile.nativeElement.value = "";
    }

    ngOnChanges() {
        if (this.fileName) {
            this.docFormControl.updateValue(this.fileName);
        }
    }

    /* End Doc Handler */
}
