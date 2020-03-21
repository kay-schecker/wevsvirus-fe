import {Component, EventEmitter, Output, OnInit} from '@angular/core';
import {MoodQuestion, QuestionService} from '../../services/question.service';



@Component({
    selector: 'quest-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
})
export class QuestFormComponent implements OnInit {

    public questions: MoodQuestion[] = [];

    constructor(private readonly questionService: QuestionService) {
    }

    ngOnInit() {
        this.questions = this.questionService.getAllMoodQuestions();
    }

    @Output()
    public readonly onChange = new EventEmitter<MoodQuestion[]>();

    onRangeChange(id: string, value: number) {
        this.onChange.emit(this.questions.map(q => {
            if (q.id === id) {
                q.value = value;
            }

            return q;
        }));
    }

}
