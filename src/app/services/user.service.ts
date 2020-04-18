import {Injectable} from '@angular/core';
import {generate} from 'short-uuid';
import {ApiService} from './api.service';
import {NotificationService} from './notification.service';
import {SettingsService} from './settings.service';

export interface UserData {
    gender: 'MALE' | 'FEMALE' | 'DIVERS';
    yearOfBirth: number;
    plz: string;
    householdSize: number;
    pet: boolean;
}


export interface User extends UserData {
    id: string;
}

@Injectable({providedIn: 'root'})
export class UserService {

    public user?: User;

    constructor(
        private readonly api: ApiService,
        private readonly notificationService: NotificationService,
        private readonly settingsService: SettingsService,
    ) {
    }

    public async signUp(data: UserData): Promise<User> {

        this.user = {
            ...data,
            id: generate(),
        };

        await this.api.register(this.user);

        if (window.localStorage) {
            window.localStorage.setItem('user', JSON.stringify(this.user));
        }

        const enabled = await this.notificationService.showInitialConfigAlert();
        this.settingsService.set('reminderPushNotification.enabled', enabled);

        return this.user;
    }

    public async loadUser(): Promise<User | undefined> {
        const userJson = window.localStorage.getItem('user');

        if (!userJson) {
            return;
        }

        this.user = JSON.parse(userJson);
        return this.user;
    }

}

