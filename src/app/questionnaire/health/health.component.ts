import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {HealthQuestion, QuestionService} from '../../services/question.service';

@Component({
    selector: 'quest-health',
    templateUrl: './health.component.html',
    styleUrls: ['./health.component.scss'],
})
export class QuestHealthComponent implements OnInit {

    public questions: HealthQuestion[] = [];

    constructor(private readonly questionService: QuestionService) {
    }

    @Output()
    public readonly onChange = new EventEmitter<HealthQuestion[]>();

    ngOnInit() {
        this.questions = this.questionService.getAllHealthQuestions();
    }

    onRangeChange(slider, id: string, value: HealthQuestion['value']) {

        const n = new Date(0, 0);
        n.setMinutes(slider.value as number);

        slider
            .el.shadowRoot
            .querySelector('.range-knob-handle .range-pin')
            .innerHTML = n.toTimeString().slice(0, 5);

        this.onChange.emit(this.questions.map(q => {
            if (q.id === id) {
                q.value = value;
            }

            return q;
        }));
    }

}
