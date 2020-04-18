import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MoodPage} from './mood.page';
import {BaseModule} from '../../base/base.module';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        BaseModule,
        FormsModule,
        RouterModule.forChild([
            {path: '', component: MoodPage},
        ]),
    ],
    declarations: [MoodPage],
})
export class MoodPageModule {
}
