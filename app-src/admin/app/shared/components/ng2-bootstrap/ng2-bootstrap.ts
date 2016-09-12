
import {TYPEAHEAD_DIRECTIVES} from './components/typeahead';
import {DROPDOWN_DIRECTIVES} from './components/dropdown';
import {ComponentsHelper} from './components/utils/components-helper.service'
export * from './components/typeahead';
export * from './components/dropdown';
export * from './components/position';
export * from './components/common';
export * from './components/ng2-bootstrap-config';

export const BS_VIEW_PROVIDERS: any[] = [{provide: ComponentsHelper, useClass:ComponentsHelper}];

export default {
  directives: [
    DROPDOWN_DIRECTIVES,
    TYPEAHEAD_DIRECTIVES
  ],
  providers: [
    ComponentsHelper
  ]
};
