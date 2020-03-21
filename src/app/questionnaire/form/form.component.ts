import {Component, EventEmitter, Output} from '@angular/core';

export interface MoodQuestion {
    id: string
    question: string
    emoji: string
    value: number
}

@Component({
    selector: 'quest-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
})
export class QuestFormComponent {

    public questions = [{
        id: '72eciMp5RMiA2u5dfwgtAX',
        question: 'Wie gut geht es Dir?',
        emoji: '🙂',
        value: 0,
    }, {
        id: 'oDHa9ZEb5KNChgmJ65fBx2',
        question: 'Wie ängstlich fühlst Du Dich?',
        emoji: '😳',
        value: 0,
    }, {
        id: 'rdjhVEbqnope4vL8MfAJ9Y',
        question: 'Wie wütend bist Du?',
        emoji: '😡',
        value: 0,
    }, {
        id: 'kcz8NZb2chFP1RiZdURTw2',
        question: 'Wie einsam fühlst Du Dich?',
        emoji: '🚶‍',
        value: 0,
    }, {
        id: 'o4uyZ9so3oiuAzspbH3YPf',
        question: 'Wie gestresst fühlst Du Dich?',
        emoji: '🤯',
        value: 0,
    }, {
        id: 'ggonDssvB639H2Bzbd4ac2',
        question: 'Wie zufrieden bist Du?',
        emoji: '😊',
        value: 0,
    }]

    @Output()
    public readonly onChange = new EventEmitter<MoodQuestion[]>()

    onRangeChange(id: string, value: number) {
        this.onChange.emit(this.questions.map(q => {
            if (q.id === id) {
                q.value = value
            }

            return q
        }))
    }

}
