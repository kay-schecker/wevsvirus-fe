import {Component} from '@angular/core';
import {ToastController} from '@ionic/angular';

import {UserService} from '../services/user.service';
import {Plugins} from '@capacitor/core';
import {SettingsService} from '../services/settings.service';
import {map} from 'rxjs/operators';
import {NotificationService} from '../services/notification.service';

const {Clipboard} = Plugins;

@Component({
    selector: 'app-settings',
    templateUrl: './settings.page.html',
    styleUrls: ['./settings.page.scss'],
})
export class SettingsPage {

    private readonly settings: {
        enablePush: boolean
    } = {
        enablePush: true,
    };

    private readonly user = this.userService.loadUser();
    private readonly settings$ = this.settingsService.settings$.pipe(map(s => {
        return {
            ...s,
            reminderPushNotification: {
                ...s.reminderPushNotification,
                time: (() => {
                    const date = new Date();
                    date.setHours(s.reminderPushNotification.time.hour);
                    date.setMinutes(s.reminderPushNotification.time.minute);
                    return date.toISOString();
                })(),
            },
        };
    }));

    constructor(
        private readonly userService: UserService,
        private readonly settingsService: SettingsService,
        private readonly notificationService: NotificationService,
        private readonly toastController: ToastController,
    ) {

    }

    private async copyUserIdToClipboard(userId: string) {
        await Clipboard.write({
            string: userId,
        });

        (await this.toastController.create({
            position: 'top',
            color: 'primary',
            translucent: false,
            message: 'Benutzer-ID kopiert',
            duration: 2000,
        })).present();
    }

    private async setReminderPushNotificationTime(time: string) {
        if (this.settings.enablePush) {
            const date = new Date(time);

            this.settingsService.set('reminderPushNotification.time', {
                hour: date.getHours(),
                minute: date.getMinutes(),
            });
        }
    }

}
