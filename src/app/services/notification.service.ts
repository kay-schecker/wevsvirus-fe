import {Injectable} from '@angular/core';

import {LocalNotification, Plugins} from '@capacitor/core';
import {ApiService} from './api.service';
import {AlertController} from '@ionic/angular';

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
    };

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

    public async schedule(notifications: LocalNotification[]): Promise<LocalNotification[]> {
        try {
            await LocalNotifications.schedule({notifications});
        } catch (e) {
            alert(e.message || e);
        }
        return notifications;
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
    ) {
    }

}
