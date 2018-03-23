/**
 * Created by sanedev on 6/19/16.
 */
import {Directive, Input, OnInit, ElementRef} from '@angular/core';

@Directive({

    selector: '[fadeInDirective]',
    host: {
        '[class.animated]': 'true',
        '[class.fadeIn]': 'true'
    }
    // animations: [trigger(
    //     'openClose',
    //     [
    //         state('collapsed, void', style({height: '0px', color: 'maroon', borderColor: 'maroon'})),
    //         state('expanded', style({height: '*', borderColor: 'green', color: 'green'})),
    //         transition(
    //             'collapsed <=> expanded', [animate(500, style({height: '250px'})), animate(500)])
    //     ])]
})
export class FadeInDirective implements OnInit {
    @Input() duration:number = 500;
    @Input() collapse:boolean = true;

    constructor(public element:ElementRef) {

    }

    ngOnInit():void {

    }


}
