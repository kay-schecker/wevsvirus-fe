import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {cloneDeep, isEqual, set} from 'lodash';
import {distinctUntilChanged, filter} from 'rxjs/operators';

interface Settings {
    reminderPushNotification: {
        enabled: boolean
        time: {
            hour: number,
            minute: number,
        }
    },
}

@Injectable({providedIn: 'root'})
export class SettingsService {

    public static readonly defaultSettings: Settings = {
        reminderPushNotification: {
            enabled: false,
            time: {
                hour: 20,
                minute: 0,
            },
        },
    };

    private readonly subject = new BehaviorSubject<Settings>(undefined);
    public readonly settings$ = this.subject.pipe(
        filter(v => !!v),
        distinctUntilChanged(isEqual),
    );

    constructor() {

        this.settings$.subscribe(settings => {
            if (window.localStorage) {
                window.localStorage.setItem('settings', JSON.stringify(settings));
            }
        });

        if (window.localStorage) {
            const storedSettings = window.localStorage.getItem('settings');
            this.next(storedSettings ? JSON.parse(storedSettings) : SettingsService.defaultSettings);
        }

    }

    public set<T = any>(path: string, value: T) {
        const settings = cloneDeep<Settings>(this.subject.value);
        set(settings, path, value);
        this.next(settings);
    }

    private next(settings: Settings) {
        this.subject.next(settings);
    }

}
