import {NgModule}      from '@angular/core';
import {CommentSettingService} from "./comment.service";
import{CommentSettingComponent} from"./comment-setting.component";
import{SharedModule} from '../../../shared/shared.module';

@NgModule({
    imports: [SharedModule],
    declarations: [CommentSettingComponent],
    providers: [CommentSettingService]
})

export class CommentSettingModule {
}