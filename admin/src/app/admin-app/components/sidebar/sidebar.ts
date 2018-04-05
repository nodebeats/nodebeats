import {Component, Output, EventEmitter} from '@angular/core';
import {menuItem} from '../../../shared/configs/menu.config';
@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss']
})

export class SidebarCmp {
  isActive = false;
  duration: number = 250;
  firstOpen: boolean = true;
  firstDisabled: boolean = false;
  lastOpen: boolean = false;
  public containerSlide: boolean = false;
  @Output() toggleContainerEvent: EventEmitter<any> = new EventEmitter();
  public status: Object = {
    isFirstOpen: false,
    isFirstDisabled: false
  };
  sidebarRoute: any[] = [];

  constructor() {
     this.sidebarRoute = menuItem;
  }

  toggleContainer() {
    this.containerSlide = !this.containerSlide;
    this.toggleContainerEvent.emit(this.containerSlide);
  }

  eventCalled() {
    this.isActive = !this.isActive;
  }
}
