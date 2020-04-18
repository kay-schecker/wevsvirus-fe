import {Component} from '@angular/core';
import {QuestionService} from '../../services/question.service';

@Component({
    templateUrl: 'mood.page.html',
    styleUrls: ['mood.page.scss'],
})
export class MoodPage {

    constructor(
        private readonly questionService: QuestionService,
    ) {
    }

}
