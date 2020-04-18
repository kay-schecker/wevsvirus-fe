import {Injectable} from '@angular/core';
import * as moment from 'moment';
import {ApiService} from './api.service';
import {UserService} from './user.service';
import {Observable, Subject} from 'rxjs';
import {debounceTime, switchMap} from 'rxjs/operators';

export interface Question {
    id: string;
    question: string;
    emoji: string;
    value: number;
    color: string;
}

@Injectable({providedIn: 'root'})
export class QuestionService {

    questions = {
        '72eciMp5RMiA2u5dfwgtAX': {
            question: 'Wie gut geht es Dir?',
            emoji: '🙂',
            value: 0,
            color: '#ff5e80',
        },
        'oDHa9ZEb5KNChgmJ65fBx2': {
            question: 'Wie ängstlich fühlst Du Dich?',
            emoji: '😳',
            value: 0,
            color: '#ffce56',
        },
        'rdjhVEbqnope4vL8MfAJ9Y': {
            question: 'Wie wütend bist Du?',
            emoji: '😡',
            value: 0,
            color: '#36a2eb',
        },
        'kcz8NZb2chFP1RiZdURTw2': {
            question: 'Wie einsam fühlst Du Dich?',
            emoji: '🚶‍',
            value: 0,
            color: '#4bc0c0',
        },
        'o4uyZ9so3oiuAzspbH3YPf': {
            question: 'Wie gestresst fühlst Du Dich?',
            emoji: '🤯',
            value: 0,
            color: '#97bbcd',
        },
        'ggonDssvB639H2Bzbd4ac2': {
            question: 'Wie zufrieden bist Du?',
            emoji: '😊',
            value: 0,
            color: '#d47ce9',
        },
        'bJyjEuGz6VF3kwVxz7RQ8c': {
            question: 'Wie lange hast du geschlafen?',
            emoji: '🌙',
            value: 0,
            color: '#ff5e80',
        },
        'rPjhtwjTyfAQ433jVDHSvU': {
            question: 'Wie lange hast Du Dich heute über Corona informiert (Nachrichten, Social Media, TV...)',
            emoji: '📺',
            value: 0,
            color: '#ffce56',
        },
        '84rfLqZxi9X9Y8y9hQrLKB': {
            question: 'Wie lange hattest Du heute Kontakt zu Anderen (Telefon, Skype, persönlich)?',
            emoji: '💬',
            value: 0,
            color: '#36a2eb',
        },
        'vSvCia11kNsj43DVqiMNF9': {
            question: 'Wie lange warst Du heute an der frischen Luft?',
            emoji: '🌤‍',
            value: 0,
            color: '#4bc0c0',
        },
        '73WakrfVbNJBaAmhQtEeDv': {
            question: 'Wie lange hast Du heute Sport gemacht?',
            emoji: '💪',
            value: 0,
            color: '#d47ce9',
        },
    };

    moodQuestions: Question[] = [
        '72eciMp5RMiA2u5dfwgtAX',
        'oDHa9ZEb5KNChgmJ65fBx2',
        'rdjhVEbqnope4vL8MfAJ9Y',
        'kcz8NZb2chFP1RiZdURTw2',
        'o4uyZ9so3oiuAzspbH3YPf',
        'ggonDssvB639H2Bzbd4ac2',
    ].map((id) => Object.assign(this.questions[id], {id, value: this.getStoredValue(id)}));

    healthQuestions: Question[] = [
        'bJyjEuGz6VF3kwVxz7RQ8c',
        'rPjhtwjTyfAQ433jVDHSvU',
        '84rfLqZxi9X9Y8y9hQrLKB',
        'vSvCia11kNsj43DVqiMNF9',
        '73WakrfVbNJBaAmhQtEeDv',
    ].map((id) => Object.assign(this.questions[id], {id, value: this.getStoredValue(id)}));

    public readonly valueChanges$ = new Subject();
    public readonly onSave$: Observable<void>;

    getMoodById(id: string): Question {
        return this.moodQuestions.find(m => m.id === id);
    }

    public async setValue(id: string, value: number) {
        this.questions[id].value = value;
        await this.storeValue(id, value);
        this.valueChanges$.next({id, value});
    }

    private async storeValue(id: string, value: number) {
        if (window.localStorage) {
            window.localStorage.setItem(`question.${id}`, JSON.stringify({value, date: this.getDate()}));
        }
    }

    private getStoredValue(id: string): number {
        if (window.localStorage) {
            const item = window.localStorage.getItem(`question.${id}`);
            if (item) {

                try {
                    const p = JSON.parse(item);
                    if (p.date === this.getDate()) {
                        return p.value;
                    }
                } catch (e) {

                }

            }
        }

        return 0;
    }

    private getDate(): string {
        return moment().format('YYYY-MM-DD');
    }

    constructor(
        private readonly api: ApiService,
        private readonly userService: UserService,
    ) {
        this.onSave$ = this.valueChanges$.pipe(
            debounceTime(150),
        ).pipe(switchMap(async () => {
            await this.api.postQuestionnaire({
                userId: this.userService.user.id,
                responseDate: moment().format('YYYY-MM-DD'),
                healthResponses: this.healthQuestions.map((q) => ({
                    questionId: q.id,
                    response: q.value,
                })),
                moodResponses: this.moodQuestions.map((q) => ({
                    questionId: q.id,
                    response: q.value,
                })),
            });
        }));
    }
}
