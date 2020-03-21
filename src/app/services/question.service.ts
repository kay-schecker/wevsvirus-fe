import {Injectable} from '@angular/core';

export interface MoodQuestion {
    id: string
    question: string
    emoji: string
    value: number
}

const moodQuestions = [{
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

@Injectable({
    providedIn: 'root',
})
export class QuestionService {

    constructor() {
    }

    getAllMoodQuestions() : Array<MoodQuestion>{
        return moodQuestions;
    }
}
