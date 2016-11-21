import {NgModule}      from '@angular/core';
import {NewsCategoryEditorComponent} from "./news-category-editor.component";
import {NewsCategoryListComponent} from"./news-category-list.component";
import {NewsEditorComponent} from"./news-editor.component";
import {NewsListComponent} from"./news-list.component";
import {NewsImageEditorComponent} from"./news-image-editor.component";
import {NewsImageListComponent} from"./news-image-list.component";
import {NewsService} from './news.service'
import {SharedModule} from '../../../shared/shared.module';
import {NewsManagementComponent} from "./news-management.component";

@NgModule({
    imports: [SharedModule],
    declarations: [NewsImageListComponent,
        NewsImageEditorComponent,
        NewsManagementComponent,
        NewsListComponent,
        NewsEditorComponent,
        NewsCategoryListComponent,
        NewsCategoryEditorComponent
    ],
    providers: [NewsService]
})

export class NewsModule {
}