import {Component, OnInit} from '@angular/core';

import 'leaflet/dist/leaflet.css';
import {circle, latLng, polygon, tileLayer} from 'leaflet';

@Component({
    selector: 'app-schland',
    templateUrl: './schland.page.html',
    styleUrls: ['./schland.page.scss'],
})
export class SchlandPage implements OnInit {

    options = {
        layers: [
            tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 18, attribution: '...'}),
        ],
        zoom: 3,
        // center: latLng(46.879966, -121.726909),
        center: latLng(51.9481, 10, 26517),
    };
    layersControl = {
        baseLayers: {
            'Open Street Map': tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
            'Open Cycle Map': tileLayer('http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
        },
        overlays: {
            'Big Circle': circle([ 46.95, -122 ], { radius: 5000 }),
            'Big Square': polygon([[ 46.8, -121.55 ], [ 46.9, -121.55 ], [ 46.9, -121.7 ], [ 46.8, -121.7 ]])
        }
    };

    constructor() {
    }

    ngOnInit() {
    }

}
