import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

interface IQuestionnaire {
    uid: number,
    answer1: string,
}


@Injectable({
    providedIn: 'root',
})
export class QuestionnaireService {

    baseUrl: string = '/backend';

    constructor(private http: HttpClient) {
    }

    send(questionnaire: IQuestionnaire) {
        return this.http.post<IQuestionnaire>(this.baseUrl, questionnaire);
    }
}
