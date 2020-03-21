import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonalReportPage } from './personal-report.page';

const routes: Routes = [
  {
    path: '',
    component: PersonalReportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonalReportPageRoutingModule {}
