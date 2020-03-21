import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserSignUpPagePageRoutingModule } from './user-sign-up-page-routing.module';

import { UserSignUpPagePage } from './user-sign-up-page.page';
import {UserSignUpFormComponent} from './user-sign-up-form/user-sign-up-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserSignUpPagePageRoutingModule
  ],
  declarations: [UserSignUpPagePage, UserSignUpFormComponent],
  exports: [UserSignUpFormComponent]
})
export class UserSignUpPagePageModule {}
