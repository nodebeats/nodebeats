import {Component, Input, OnChanges} from '@angular/core';
@Component({
    selector: 'animate-counter',
    template: '<div class="animate-count huge">{{animateValue}}</div>'
})
export class AnimateCounterComponent implements OnChanges {
    @Input() valueToCount:number;
    @Input() duration:number = 2000;
    animateValue:number = 0;

    ngOnChanges() {
        if (this.valueToCount)
            this.animate();
    }

    animate() {
        let end = this.valueToCount;
        let range = end - 0;
        let current = 0;
        let stepTime = Math.abs(Math.floor(this.duration / range));
        let timer = setInterval(()=> {
            current += 1;
            this.animateValue = current;
            if (current == end) {
                clearInterval(timer);
            }
        }, stepTime);
    }

}