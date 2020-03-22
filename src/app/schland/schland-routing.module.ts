import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SchlandPage } from './schland.page';

const routes: Routes = [
  {
    path: '',
    component: SchlandPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SchlandPageRoutingModule {}
