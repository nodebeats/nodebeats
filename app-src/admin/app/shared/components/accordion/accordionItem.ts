import {
    Component, OnInit, OnDestroy, Input, Output, EventEmitter, transition, style, trigger,
    animate, state, ElementRef
} from '@angular/core';
import {NgClass} from '@angular/common';
// import {Collapse} from '../../directives/collapse/collapse';
import {Accordion} from './accordion';

@Component({
    selector: 'accordion-item, [accordion-item]',
    directives: [NgClass],

    template: `<div (click)="toggleOpen($event)">
                 <span *ngIf="heading" class="fuel-ui-clickable" [ngClass]="{'text-muted': disabled}">{{heading}}</span>
                      <ng-content select="accordion-heading"></ng-content>
                         <ng-content select="[accordion-heading]"></ng-content>
                </div>
                    <div class="fuel-ui-collapse"  [style.height]='divHeight'>
                        <ng-content></ng-content>
                    </div>`,
    styles: [`
    					.fuel-ui-collapse {
              	overflow-y: hidden;
              	transition: height 1s ease;
              }
    				`]
})
export class AccordionItem implements OnInit, OnDestroy {
    @Input() heading:string;
    @Input() disabled:boolean = false;

    @Input()
    public get open():boolean {
        return this._open;
    }

    public set open(value:boolean) {
        this._open = value;
        if (value) {
            this.accordion.closeOtherItems(this);
        }
    }

    stateExpression:string;
    divHeight:string = "0px";

    private _open:boolean = false;

    accordion:Accordion;

    @Output() openChange = new EventEmitter();

    public constructor(accordion:Accordion, private eleRef:ElementRef) {
        this.accordion = accordion;
    }

    public ngOnInit():any {
        this.accordion.addItem(this);

    }

    public ngOnDestroy():any {
        this.accordion.removeItem(this);
    }

    public toggleOpen(event:MouseEvent):any {
        event.preventDefault();
        if (!this.disabled) {
            this.open = !this.open;
            this.divHeight = this.open ? this.eleRef.nativeElement.querySelector('.fuel-ui-collapse').scrollHeight + 'px' : '0';
            this.openChange.emit(this.open);

        }
    }

    expand() {
        this.stateExpression = 'expanded';
    }

    collapse() {
        this.stateExpression = 'collapsed';
    }
}

export var ACCORDION_PROVIDERS = [
    Accordion,
    AccordionItem
];