import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {SchlandPageRoutingModule} from './schland-routing.module';

import {SchlandPage} from './schland.page';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import {LeafletLayersDemoComponent} from './layers/layers-demo.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SchlandPageRoutingModule,
        LeafletModule,
    ],
    declarations: [
        SchlandPage,
        LeafletLayersDemoComponent,
    ],
})
export class SchlandPageModule {
}
