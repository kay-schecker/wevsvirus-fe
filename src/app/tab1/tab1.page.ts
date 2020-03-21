import {Component} from '@angular/core';
import {QuestionnaireService} from '../services/questionnaire.service';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {

    constructor(private questionaireService: QuestionnaireService) {
        console.log(111);
        this.questionaireService.send({uid: 1, answer1: 'ab'})
            .subscribe((resp) => {
                console.log('RESP ', resp);
            });
    }

}
