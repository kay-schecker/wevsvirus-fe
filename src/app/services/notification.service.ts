import {Injectable} from '@angular/core';

import {LocalNotification, Plugins} from '@capacitor/core';
import {ApiService} from './api.service';
import {AlertController} from '@ionic/angular';
import {SettingsService} from './settings.service';

const {LocalNotifications} = Plugins;

@Injectable({providedIn: 'root'})
export class NotificationService {

    // returns true if enabled
    // returns false if disabled
    // returns undefined if not supported
    public async enabled(): Promise<boolean | undefined> {
        try {
            return (await LocalNotifications.areEnabled()).value;
        } catch (e) {
            return undefined;
        }
    }

    private getPending = () => LocalNotifications.getPending();

    public showInitialConfigAlert() {

        return new Promise(async (resolve) => {

            (await this.alertController.create({
                header: 'Jede Stimmung zählt!',
                message: [
                    'Daher möchten wir dich gerne 1x am Tag daran erinnern unsere Fragen zu beantworten.',
                    'Nur so erhalten wir ein aussagekräftiges Bild für ganz Deutschland.',
                ].join(' '),
                buttons: [
                    {
                        text: 'Nein danke',
                        role: 'cancel',
                        cssClass: 'secondary',
                        handler: () => resolve(false),
                    }, {
                        text: 'Sehr gerne',
                        handler: () => resolve(true),
                    },
                ],
            })).present();

        });

    }

    public async schedule(notifications: LocalNotification[]): Promise<boolean> {
        const granted = await this.requestPermission();

        if (!granted) {
            (await this.alertController.create({
                header: 'Ups ...',
                message: [
                    'Leider konnte die Erinnerung nicht aktiviert werden, da wir Dir keine Push-Benachrichtigungen senden dürfen.',
                    'Bitte erlaube dies in den Systemeinstellungen.',
                ].join(' '),
                buttons: [{
                    text: 'Okay',
                }],
            })).present();

            return false;
        }

        try {
            await LocalNotifications.schedule({notifications});
        } catch (e) {
            (await this.alertController.create({
                header: 'Ups ...',
                message: [
                    'Leider konnte die Erinnerung nicht aktiviert werden. Fehler:',
                    e.message || e,
                ].join(' '),
                buttons: [{
                    text: 'Okay',
                }],
            })).present();
        }

        return true;
    }

    public async requestPermission(): Promise<boolean> {
        const {granted} = await LocalNotifications.requestPermission();

        if (!granted) {
            this.settingsService.set('reminderPushNotification.enabled', false);
        }

        return granted;
    }

    public async cancelAll(): Promise<void> {
        const {notifications} = await this.getPending();

        if (notifications.length > 0) {
            await LocalNotifications.cancel({notifications});
        }
    }

    constructor(
        private readonly api: ApiService,
        private readonly alertController: AlertController,
        private readonly settingsService: SettingsService,
    ) {

    }

}
