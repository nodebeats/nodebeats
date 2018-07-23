import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';

@Component({
  selector: 'rl-tag-input-item',
  template:
  `{{text}}
  <span
  class="ng2-tag-input-remove"
  (click)="removeTag()">&times;</span>`,

  styles: [`
    :host {
      display: inline-block;
      background: #ccc;
      padding: 7px;
      border-radius: 90px;
      margin-right: 10px;
    }

    :host.ng2-tag-input-item-selected {
      color: white;
      background: #0d8bff;
    }

    .ng2-tag-input-remove {
      cursor: pointer;
      display: inline-block;
      padding: 0 3px;
    }
  `]
})
export class TagInputItemComponent {
  @Input() selected: boolean;
  @Input() text: string;
  @Input() index: number;
  @Output() tagRemoved: EventEmitter<number> = new EventEmitter<number>();
  @HostBinding('class.ng2-tag-input-item-selected') 'selected === true': any;

  constructor() { }

  removeTag(): void {
    this.tagRemoved.emit(this.index);
  }
}
