import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

export interface IQuestionnaire {
    userId: string
    responseDate: string // 2020-03-20
    moodResponses: [{
        questionId: string
        response: number
    }],
    healthResponses: [{
        questionId: string
        response: {
            hours: number
            minutes: number
        }
    }]
}


@Injectable({
    providedIn: 'root',
})
export class QuestionnaireService {

    private readonly baseUrl = `http://${window.location.hostname}:8080`;

    constructor(private http: HttpClient) {
    }

    async save(questionnaire: IQuestionnaire): Promise<IQuestionnaire> {
        await this.http.post<IQuestionnaire>(this.baseUrl + '/questionnaire', questionnaire).toPromise();
        return questionnaire
    }
}
