import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {BaseModule} from '../base/base.module';
import {PrivacyModal} from './privacy/privacy.modal';

@NgModule({
    imports: [
        BaseModule,
        CommonModule,
        FormsModule,
        IonicModule,
    ],
    declarations: [
        PrivacyModal,
    ],
    entryComponents: [
        PrivacyModal,
    ],
})
export class ModalModule {
}
