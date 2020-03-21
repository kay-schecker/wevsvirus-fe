import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserSignUpPagePage } from './user-sign-up-page.page';

const routes: Routes = [
  {
    path: '',
    component: UserSignUpPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserSignUpPagePageRoutingModule {}
