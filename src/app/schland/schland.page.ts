import {Component, OnInit} from '@angular/core';
// import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {QuestionService} from '../services/question.service';

@Component({
    selector: 'app-schland',
    templateUrl: './schland.page.html',
    styleUrls: ['./schland.page.scss'],
})
export class SchlandPage implements OnInit {

    mode = this.questionService.getAllMoodQuestions()[0].id

    constructor(public readonly questionService: QuestionService) {
    }

    ngOnInit() {

    }

}
