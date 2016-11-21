// import {Directive, ElementRef} from "@angular/core";
// import {AnimationBuilder} from "@angular/animate";
// @Directive({
//     selector: '[animate-box]',
//     host: {
//         '[style.background-color]': "'red'"
//     },
//     exportAs: 'ab'
// })
// export class SlideToggle {
//     constructor(private _ab:AnimationBuilder, private _e:Elem) {
//     }
//
//     toggle(isVisible:boolean = false) {
//         let animation = this._ab.css();
//         animation
//             .setDuration(1000);
//
//         if (!isVisible) { // Goes up!
//             animation.setFromStyles({height: '0', width: '50%', overflow: 'hidden'})
//                 .setToStyles({height: '300px'})
//         } else { // Goes down!
//             animation.setFromStyles({height: '300px', width: '50%'})
//                 .setToStyles({height: '0'})
//         }
//         animation.start(this._e.nativeElement);
//     }
// }
   