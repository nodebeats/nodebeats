/**
 * Created by sanedev on 6/19/16.
 */
import {Directive, Input, OnInit, ElementRef, OnChanges} from '@angular/core';
import {HOST_URL} from "../configs/env.config";

@Directive({
    selector: '[processing]',
    host: {
        '[class.processing]': 'isProccessing'
    }

})
export class ProcessingDirective implements OnChanges {
    @Input() isSubmitted:boolean = false;
    isProccessing:boolean = false;

    constructor(public element:ElementRef) {

    }

    ngOnInit():void {
        this.detectAjax();
    }

    ngOnChanges() {
        if (this.isSubmitted)
            this.detectAjax();
    }

    detectAjax() {
        let origOpen = XMLHttpRequest.prototype.open;
        let that = this;
        let cacheButtonContent:string = this.element.nativeElement.textContent;
        let checkMethod:string[] = ["POST", "PUT", "DELETE"];
        XMLHttpRequest.prototype.open = function (method, url, async) {
            if (url.indexOf(HOST_URL + '/api') != -1 && checkMethod.indexOf(method) != -1) {
                that.element.nativeElement.textContent = "Processing...";
                that.element.nativeElement.disabled = true;
                that.isProccessing = true;

                this.addEventListener('load', function () {
                    setTimeout(()=> {
                        that.element.nativeElement.textContent = cacheButtonContent;
                        that.element.nativeElement.disabled = false;
                        that.isProccessing = false;
                    }, 1000);
                });
            }
            origOpen.apply(this, arguments);
        };

    }
}