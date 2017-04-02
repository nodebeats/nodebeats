import { NgModule } from '@angular/core';

import { DropdownMenuDirective } from './dropdown-menu.directive';
import { DropdownToggleDirective } from './dropdown-toggle.directive';
import { DropdownDirective } from './dropdown.directive';
import {KeyboardNavDirective} from "./dropdown-keyboard-nav.directive";

@NgModule({
  declarations: [DropdownDirective, DropdownMenuDirective, DropdownToggleDirective,KeyboardNavDirective],
  exports: [DropdownDirective, DropdownMenuDirective, DropdownToggleDirective]
})
export class DropdownModule {
}
