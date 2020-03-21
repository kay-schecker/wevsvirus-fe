import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {generate} from 'short-uuid';

export interface UserData {
    gender: string
    yearOfBirth: string
    plz: string
    householdSize: number
    pet: boolean
}


export interface User extends Partial<UserData> {
    id: string
}

@Injectable({
    providedIn: 'root'
})
export class UserService {

    baseUrl = '/backend';

    public readonly user: User = {
        id: generate()
    }

    constructor(private http: HttpClient) {
    }

    signUp(data: UserData): Promise<User> {

        this.user = {
            id: this.user.id,
            ...data,
        }

        return this.http
            .post<IQuestionnaire>(this.baseUrl, this.user)
            .toPromise()
            .then(() => user);
    }
}
