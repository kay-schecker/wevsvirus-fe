import {Component} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
})
export class AppComponent {

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
    ) {
        this.initializeApp();
    }

    private readonly menuItems = [{
        title: 'Stimmung',
        url: '/tabs/mood',
        icon: 'happy-outline',
    }, {
        title: 'Auswertung',
        url: '/tabs/chart',
        icon: 'bar-chart-outline',
    }, {
        title: 'Karte',
        url: '/tabs/map',
        icon: 'map-outline',
    }, {
        title: 'Einstellungen',
        url: '/settings',
        icon: 'cog-outline',
    }, {
        title: 'Impressum',
        url: '/imprint',
        icon: 'alert-circle-outline',
    }, {
        title: 'Datenschutzerklärung',
        url: '/privacy',
        icon: 'body-outline',
    }];

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }
}
