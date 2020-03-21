import {Injectable} from '@angular/core';

export interface MoodQuestion {
    id: string
    question: string
    emoji: string
    value: number
}

export interface HealthQuestion {
    id: string
    question: string
    emoji: string
    value: {
        hours: number
        minutes: number
    }
}

const moodQuestions: MoodQuestion[] = [{
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
}];

const healthQuestions: HealthQuestion[] = [{
    id: 'bJyjEuGz6VF3kwVxz7RQ8c',
    question: 'Wie lange hast du geschlafen?',
    emoji: '🌙',
    value: {
        hours: 0,
        minutes: 0,
    },
}, {
    id: 'rPjhtwjTyfAQ433jVDHSvU',
    question: 'Wie lange hast Du Dich heute über Corona informiert (Nachrichten, Social Media, TV..)',
    emoji: '📰',
    value: {
        hours: 0,
        minutes: 0,
    },
}, {
    id: '84rfLqZxi9X9Y8y9hQrLKB',
    question: 'Wie lange hattest Du heute Kontakt zu Anderen (Telefon, Skype, persönlich)?',
    emoji: '💬',
    value: {
        hours: 0,
        minutes: 0,
    },
}, {
    id: 'vSvCia11kNsj43DVqiMNF9',
    question: 'Wie lange warst Du heute an der frischen Luft?',
    emoji: '🌤‍',
    value: {
        hours: 0,
        minutes: 0,
    },
}, {
    id: 'bJyjEuGz6VF3kwVxz7RQ8c',
    question: 'Wie lange hast Du heute Sport gemacht?',
    emoji: '💪',
    value: {
        hours: 0,
        minutes: 0,
    },
}];

@Injectable({
    providedIn: 'root',
})
export class QuestionService {

    constructor() {
    }

    getAllMoodQuestions = () => moodQuestions;
    getAllHealthQuestions = () => healthQuestions;
}
