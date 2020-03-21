import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PersonalReportPageRoutingModule } from './personal-report-routing.module';

import { PersonalReportPage } from './personal-report.page';
import {HighchartsChartModule} from 'highcharts-angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PersonalReportPageRoutingModule,
    HighchartsChartModule,
  ],
  declarations: [PersonalReportPage]
})
export class PersonalReportPageModule {}
