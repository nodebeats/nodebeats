import {Component, ElementRef, Input, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'alert',
    template: `<div *ngIf="displayed" role="alert"  class="alert fuel-ui-alert-fade-in" [ngClass]="{'alert-success': type === 'success', 'alert-info': type === 'info', 'alert-warning': type === 'warning', 'alert-danger': type === 'danger' }" >
                <button *ngIf="closeButton" (click)="close()" type="button" class="close" aria-label="Close">
                   <span aria-hidden="true">&#215;</span>
                    <span class="sr-only">Close</span>
                 </button>
                  <ng-content></ng-content>
                </div>`
})
export class Alert {
    private _el:HTMLElement;
    @Input() displayed:boolean = false;
    @Input() closeButton:boolean = true;
    @Input() type:string = 'success';
    @Output() displayedChange = new EventEmitter<any>();

    constructor(el:ElementRef) {
        this._el = el.nativeElement;
    }

    getElement():HTMLElement {
        return this._el;
    }

    close():void {
        this.displayed = false;
        this.displayedChange.emit(null);
    }
}

export var ALERT_PROVIDERS = [
    Alert
];