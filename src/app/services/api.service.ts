import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from './api/user';
import {Question} from './api/question';

@Injectable({providedIn: 'root'})
export class ApiService {

    private readonly baseUrl = 'https://www.wiegehts.app';

    constructor(
        private readonly http: HttpClient,
    ) {

        /*this.new().then(() => {
            this.signUp({
                gender: 'MALE',
                yearOfBirth: 1989,
                plz: '75321',
                householdSize: 2,
                pet: true,
            })
        })*/

    }

    public register = (user: User) => this.http.post<User>(`${this.baseUrl}/register`, user).toPromise();
    public getMood = (userId: string) => this.http.get<Array<Question>>(`${this.baseUrl}/mood?id=${userId}`).toPromise();
    public getHealth = (userId: string) => this.http.get<Array<Question>>(`${this.baseUrl}/health?id=${userId}`).toPromise();
    public getHeat = (date: string) => this.http.get(`${this.baseUrl}/heat?responseDate=${date}`).toPromise();

    public postQuestionnaire = (questionnaire: {
        userId: string
        responseDate: string // 2020-03-20
        moodResponses: {
            questionId: string
            response: number
        }[],
        healthResponses: {
            questionId: string
            response: number
        }[]
    }) => this.http.post(`${this.baseUrl}/questionnaire`, questionnaire).toPromise();

}
