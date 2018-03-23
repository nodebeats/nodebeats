import {NgModule}      from '@angular/core';
import {CommentSettingService} from "./comment.service";
import {CommentSettingComponent} from"./comment-setting.component";
import {SharedModule} from '../../../shared/shared.module';
import {CommentSettingRouting} from './comment-setting.routing';

@NgModule({
    imports: [SharedModule.forRoot(),CommentSettingRouting],
    declarations: [CommentSettingComponent],
    providers: [CommentSettingService]
})

export class CommentSettingModule {
}