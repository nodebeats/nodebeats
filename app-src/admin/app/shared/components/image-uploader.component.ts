import {
    Component,
    AfterViewInit,
    Input,
    Output,
    EventEmitter,
    OnChanges,
    ViewChild

} from "@angular/core";
import {ValidationService} from "../services/validation.service";
import {ImageCanvasSizeEnum} from "../configs/enum.config";
import {Config} from "../configs/general.config";
import {FormControl} from "@angular/forms";
import {FormControlMessages} from "./control-valdation-message.component";
@Component({
    selector: 'image-uploader',
    template: `<canvas #previewCanvas></canvas>
                    <a *ngIf="imageName && isValidImage" href="javascript:void(0)" (click)="onDeleteFile()"><i
                            class="fa fa-trash"
                            aria-hidden="true"></i></a>
                    <div class="clearfix"></div>
                    <input type="file" class="inputfile" id="file" #inputFile (change)="onFileSelect($event)">
                    <label for="file"><i class="fa fa-upload" aria-hidden="true"> {{imageName?imageName:"Choose an Image..."}}</i></label>
                    <div class="error-msg" *ngIf="!isValidImage">*Supported Extensions : {{allowedExtMessage}} and max size : {{allowedSize}} MB</div>               
                  <control-messages [isSubmitted]="isSubmitted"
                         [control]="imageFormControl"></control-messages>`

})
export class ImageUploader implements AfterViewInit,OnChanges {
    @Input() imageFormControl:FormControl;
    @Input() imageName:string;
    @Input() drawImagePath:string;
    @Input() isSubmitted:boolean;
    @Input() canvasSize:number;
    @Output() fileSelectedEvent:EventEmitter<any> = new EventEmitter();
    @Output() deleteImageEvent:EventEmitter<any> = new EventEmitter();
    @ViewChild('previewCanvas') previewCanvas;
    @ViewChild('inputFile') inputFile;
    context:CanvasRenderingContext2D;
    file:File;
    isValidImage:boolean = true;
    private canvasWidth:number;
    private canvasHeight:number;
    private isFresh:boolean = false;
    private allowedExt:string[] = ['jpeg', 'jpg', 'png', 'webp'];
    private allowedSize:number = 1; // In MB
    allowedExtMessage:string;

    constructor() {
    }

    ngAfterViewInit() {
        this.allowedExtMessage = this.allowedExt.join(',');
        if (this.drawImagePath)
            switch (this.canvasSize) {
                case ImageCanvasSizeEnum.small:
                    this.canvasHeight = 170;
                    this.canvasWidth = 150;
                    break;
                case ImageCanvasSizeEnum.wide:
                    this.canvasHeight = 170;
                    this.canvasWidth = 300;
                    break;
                default:
                    this.canvasHeight = 170;
                    this.canvasWidth = 150;
                    break;
            }
        this.drawImageToCanvas(this.drawImagePath);
    }

    /*Image handler */
    drawImageToCanvas(path:string) {
        let canvas = this.previewCanvas.nativeElement;
        this.context = canvas.getContext("2d");
        canvas.width = this.canvasWidth;
        canvas.height = this.canvasHeight;
        var ctx = this.context;
        var img = new Image();
        img.onload = function () {
            var hRatio = canvas.width / img.width;
            var vRatio = canvas.height / img.height;
            var ratio = Math.min(hRatio, vRatio);
            var centerShift_x = ( canvas.width - img.width * ratio ) / 2;
            var centerShift_y = ( canvas.height - img.height * ratio ) / 2;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, img.width, img.height,
                centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
        };
        img.src = path;//http://res.cloudinary.com/bitsbeat-it-solution/image/upload/c_fill,h_150,w_300/imageName-1465885928713.webp";
    }


    onFileSelect(e) {
        this.file = e.target.files[0];
        this.isValidImage = ValidationService.imageValidation(this.file, this.allowedExt, this.allowedSize);
        let canvas = this.previewCanvas.nativeElement;
        this.context = canvas.getContext("2d");
        canvas.width = this.canvasWidth;
        canvas.height = this.canvasHeight;
        var ctx = this.context;
        var reader = new FileReader();
        if (this.isValidImage) {
            this.imageFormControl.patchValue(this.file.name);
            if (!this.imageName)
                this.isFresh = true;
            this.imageName = this.file.name;
            reader.onload = (event:FileReaderEvent) => {
                var img = new Image();
                img.onload = function () {
                    var hRatio = canvas.width / img.width;
                    var vRatio = canvas.height / img.height;
                    var ratio = Math.min(hRatio, vRatio);
                    var centerShift_x = ( canvas.width - img.width * ratio ) / 2;
                    var centerShift_y = ( canvas.height - img.height * ratio ) / 2;
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.drawImage(img, 0, 0, img.width, img.height,
                        centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(e.target.files[0]);
            this.fileSelectedEvent.emit(this.file);
        }
        else {
            this.imageFormControl.patchValue("");
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            this.drawImageToCanvas(Config.InvalidImage);
        }
    }

    onDeleteFile(imageId:string) {
        this.file = null;
        this.imageName = "";
        this.imageFormControl.patchValue("");
        this.inputFile.nativeElement.value = "";
        this.drawImageToCanvas(this.drawImagePath);
        if (!this.isFresh)
            this.deleteImageEvent.emit(imageId);

    }

    ngOnChanges() {
        if (this.imageName)
            this.imageFormControl.patchValue(this.imageName);
        if (this.previewCanvas && !this.isSubmitted)
            this.drawImageToCanvas(this.drawImagePath);
    }

    /* End ImageHandler */
}
