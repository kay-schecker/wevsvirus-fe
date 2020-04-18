import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MapPage} from './map.page';
import {MapModule} from '../../map/map.module';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        MapModule,
        RouterModule.forChild([{path: '', component: MapPage}]),
    ],
    declarations: [MapPage],
})
export class MapPageModule {
}
