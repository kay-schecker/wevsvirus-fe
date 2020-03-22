import {Component, OnInit} from '@angular/core';

import 'leaflet/dist/leaflet.css';

@Component({
    selector: 'app-schland',
    templateUrl: './schland.page.html',
    styleUrls: ['./schland.page.scss'],
})
export class SchlandPage implements OnInit {

    showDemo = false;


    ngOnInit() {

        // Primarily for debugging
        setTimeout(() => {
            this.showDemo = true;
        }, 200);

    }

}
