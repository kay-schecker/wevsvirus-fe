import {Component, EventEmitter, Output} from '@angular/core';
import {IonRange, IonSlides} from '@ionic/angular';

export interface HealthQuestion {
    id: string
    question: string
    emoji: string
    value: {
        hours: number
        minutes: number
    }
}

@Component({
    selector: 'quest-health',
    templateUrl: './health.component.html',
    styleUrls: ['./health.component.scss'],
})
export class QuestHealthComponent {

    public questions = [{
        id: 'bJyjEuGz6VF3kwVxz7RQ8c',
        question: 'Wie lange hast du geschlafen?',
        emoji: '🙂',
        value: {
            hours: 0,
            minutes: 0,
        },
    }, {
        id: 'rPjhtwjTyfAQ433jVDHSvU',
        question: 'Wie lange hast Du Dich heute über Corona informiert (Nachrichten, Social Media, TV..)',
        emoji: '😳',
        value: {
            hours: 0,
            minutes: 0,
        },
    }, {
        id: '84rfLqZxi9X9Y8y9hQrLKB',
        question: 'Wie lange hattest Du heute Kontakt zu Anderen (Telefon, Skype, persönlich)?',
        emoji: '😡',
        value: {
            hours: 0,
            minutes: 0,
        },
    }, {
        id: 'vSvCia11kNsj43DVqiMNF9',
        question: 'Wie lange warst Du heute an der frischen Luft?',
        emoji: '🚶‍',
        value: {
            hours: 0,
            minutes: 0,
        },
    }, {
        id: 'bJyjEuGz6VF3kwVxz7RQ8c',
        question: 'Wie lange hast Du heute Sport gemacht? \n',
        emoji: '🤯',
        value: {
            hours: 0,
            minutes: 0,
        },
    }];

    @Output()
    public readonly onChange = new EventEmitter<HealthQuestion[]>();

    onRangeChange(id: string, value: HealthQuestion['value']) {
        this.onChange.emit(this.questions.map(q => {
            if (q.id === id) {
                q.value = {
                    hours: value as any,
                    minutes: 0,
                };
            }

            return q;
        }));
    }

    format(range: IonRange): string {
        const decimalTimeString = String((range.value as number) / 60);
        const n = new Date(0, 0);
        n.setSeconds(+decimalTimeString * 60 * 60);
        n.setMinutes(+decimalTimeString * 60);
        return n.toTimeString().slice(0, 5);
    }
}
