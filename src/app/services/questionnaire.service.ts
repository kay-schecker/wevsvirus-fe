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

    private readonly baseUrl = `http://${window.location.hostname}:8080`;

    constructor(private http: HttpClient) {
    }

    send(questionnaire: IQuestionnaire) {
        return this.http.post<IQuestionnaire>(this.baseUrl, questionnaire);
    }
}
