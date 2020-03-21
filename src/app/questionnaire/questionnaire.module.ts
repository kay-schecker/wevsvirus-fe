import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {QuestionnairePageRoutingModule} from './questionnaire-routing.module';

import {QuestionnairePage} from './questionnaire.page';
import {QuestFormComponent} from './form/form.component';
import {QuestHealthComponent} from './health/health.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuestionnairePageRoutingModule
  ],
  declarations: [QuestionnairePage, QuestFormComponent, QuestHealthComponent]
})
export class QuestionnairePageModule {}
