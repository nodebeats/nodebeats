import { HomeAppComponent } from './home-app.component';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { HomeAppRouting } from './home-app.route';

@NgModule({
    imports: [SharedModule.forRoot(), HomeAppRouting],
    declarations: [HomeAppComponent],
    providers: []
})

export class HomeAppModule {}