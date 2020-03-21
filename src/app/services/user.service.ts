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

@Injectable({providedIn: 'root'})
export class UserService {

    public user?: User

    private readonly baseUrl = `http://${window.location.hostname}:8080`;

    constructor(private http: HttpClient) {

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

    public async new(): Promise<User> {
        return this.user = {
            id: generate()
        }
    }

    public async signUp(data: UserData): Promise<User> {

        this.user = {
            ...data,
            id: this.user?.id,
            pet: data.pet === '1'
        }

        await this.http
            .post<User>(`${this.baseUrl}/register`, this.user)
            .toPromise()

        if (window.localStorage) {
            window.localStorage.setItem('user', JSON.stringify(this.user))
        }

        return this.user
    }

    public async loadUser(): Promise<User | undefined> {
        const userJson = window.localStorage.getItem('user')

        if (!userJson) {
            return
        }

        this.user = JSON.parse(userJson)
        return this.user
    }

}

