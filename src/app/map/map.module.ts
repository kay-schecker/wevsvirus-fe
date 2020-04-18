import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MapComponent} from './map.component';
import {HttpClientModule} from '@angular/common/http';
import {IonicModule} from '@ionic/angular';
import {MapModalComponent} from './modal/modal.component';


@NgModule({
    declarations: [
        MapComponent,
        MapModalComponent,
    ],
    imports: [
        CommonModule,
        IonicModule,
        HttpClientModule,
    ],
    exports: [
        MapComponent,
    ],
    entryComponents: [
        MapModalComponent,
    ],
})
export class MapModule {
}
