import {Component, Input, OnChanges} from '@angular/core';

@Component({
  selector: 'animate-counter',
  template: '<div class="animate-count huge"  >{{animateValue}}</div>'
})
export class AnimateCounterComponent implements OnChanges {
  @Input() valueToCount: number;
  @Input() duration: number = 5000;
  animateValue: number = 0;

  ngOnChanges() {
    if (this.valueToCount)
      this.animate();
  }

  animate() {

    let end = this.valueToCount;
    let range = end - 0;
    let current = 0;
    let interval: number = 1;
    if (Math.floor(this.duration / range) <= 1) {
      interval = 10 + Math.ceil(range / this.duration);
    }
    let stepTime = Math.floor(this.duration /range) <= 1 ? 1 : this.duration / range;
    let timer = setInterval(()=> {
      current += interval;
      this.animateValue = current;
      if (current >= end) {
        this.animateValue = end;
        clearInterval(1);
      }
    }, stepTime);
  }

}
