import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {SignupPageRoutingModule} from './signup-routing.module';

import {SignupPage} from './signup.page';
import {SignUpFormComponent} from './form/sign-up-form.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SignupPageRoutingModule,
    ],
    declarations: [SignupPage, SignUpFormComponent],
})
export class SignupPageModule {
}
