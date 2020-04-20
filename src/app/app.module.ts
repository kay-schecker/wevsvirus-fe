import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy, Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {QuestionService} from './services/question.service';
import {HttpClientModule} from '@angular/common/http';
import {SettingsService} from './services/settings.service';
import {distinctUntilChanged, map, skip} from 'rxjs/operators';
import {NotificationService} from './services/notification.service';
import {isEqual} from 'lodash';
import {ModalModule} from './modal/modal.module';
import * as moment from 'moment';

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        ModalModule,
        HttpClientModule,
    ],
    providers: [
        StatusBar,
        SplashScreen,
        QuestionService,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    ],
    bootstrap: [AppComponent],
})
export class AppModule {

    constructor(
        private readonly platform: Platform,
        private readonly settingsService: SettingsService,
        private readonly notificationService: NotificationService,
    ) {

        settingsService.settings$
            .pipe(
                skip(1), //
                map(s => s.reminderPushNotification),
                distinctUntilChanged(isEqual),
            )
            .subscribe(async ({enabled, time}) => {

                await this.notificationService.cancelAll();

                if (enabled) {

                    try {

                        await this.notificationService.schedule([{
                            title: 'Bleib am Ball',
                            body: 'Hey, wie geht\'s dir heute denn eigentlich? Stimmung und Aktivität schon erfasst?',
                            id: 999,
                            schedule: {
                                every: 'day',
                                on: {hour: time.hour, minute: time.minute},
                            },
                        }]);

                    } catch (e) {
                        alert(e.message || e);
                    }

                    alert(moment()
                        .set('hour', time.hour)
                        .set('minute', time.minute)
                        .set('second', 0)
                        .toDate().toISOString());
                }
            });

    }
}
