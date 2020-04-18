import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChartCardComponent} from './chart-card/chart-card.component';
import {IonicModule} from '@ionic/angular';
import {ChartsModule} from 'ng2-charts';
import {SliderComponent} from './slider/slider.component';
import {TimePipePipe} from './time-pipe.pipe';
import {PrivacyComponent} from './privacy/privacy.component';

@NgModule({
    declarations: [
        ChartCardComponent,
        SliderComponent,
        TimePipePipe,
        PrivacyComponent,
    ],
    exports: [
        ChartCardComponent,
        SliderComponent,
        TimePipePipe,
        PrivacyComponent,
    ],
    imports: [
        CommonModule,
        IonicModule,
        ChartsModule,
    ],
})
export class BaseModule {
}
