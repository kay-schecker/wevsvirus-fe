import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {generate} from 'short-uuid';

export interface UserData {
    gender: 'MALE' | 'FEMALE' | 'DIVERS'
    yearOfBirth: number
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

    baseUrl = 'http://localhost:8080';

    public user: User = {
        id: generate()
    }

    constructor(private http: HttpClient) {

        this.signUp({
            gender: 'MALE',
            yearOfBirth: 1988,
            plz: '75321',
            householdSize: 2,
            pet: true,
        })
    }

    public signUp(data: UserData): Promise<User> {

        this.user = {id: this.user?.id, ...data}

        return this.http
            .post<User>(`${this.baseUrl}/register`, this.user)
            .toPromise()
            .then(() => this.user);
    }

}

