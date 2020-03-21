import {Component, Input, OnInit} from '@angular/core';
import {IQuestionnaire, QuestionnaireService} from '../services/questionnaire.service';
import {UserService} from '../services/user.service';
import {MoodQuestion, HealthQuestion} from '../services/question.service';

@Component({
    selector: 'app-questionnaire',
    templateUrl: './questionnaire.page.html',
    styleUrls: ['./questionnaire.page.scss'],
})
export class QuestionnairePage implements OnInit {

    private state: IQuestionnaire;

    @Input()
    public mode: 'mood' | 'health' = 'health';

    constructor(
        private readonly userService: UserService,
        private readonly questService: QuestionnaireService,
    ) {
    }

    ngOnInit() {
        this.state = {
            userId: this.userService.user.id,
            responseDate: new Date().toISOString().substring(0, 10),
            moodResponses: [],
            healthResponses: [],
        };
    }

    async onMoodResponse(event: MoodQuestion[]) {
        this.state.moodResponses = event.map(({id, value}) => ({
            questionId: id,
            response: value,
        }));

        await this.questService.save(this.state);
    }

    async onHealthResponse(event: HealthQuestion[]) {
        this.state.healthResponses = event.map(({id, value}) => ({
            questionId: id,
            response: value,
        }));

        await this.questService.save(this.state);
    }

}
