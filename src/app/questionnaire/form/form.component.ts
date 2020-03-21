import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'quest-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
})
export class QuestFormComponent implements OnInit {


    public questions = [{
        question: 'Wie gut geht es Dir?',
        emoji: '🙂'
    }, {
        question: 'Wie ängstlich fühlst Du Dich?',
        emoji: '😳'
    }, {
        question: 'Wie wütend bist Du?',
        emoji: '😡'
    }, {
        question: 'Wie einsam fühlst Du Dich?',
        emoji: '🚶‍'
    }, {
        question: 'Wie gestresst fühlst Du Dich?',
        emoji: '🤯'
    }, {
        question: 'Wie zufrieden bist Du?',
        emoji: '😊'
    }]

    constructor() {
    }

    ngOnInit() {
    }

}
