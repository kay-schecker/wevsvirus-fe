import {Component, OnInit} from '@angular/core';

import {circle, geoJSON, icon, latLng, Layer, marker, polygon, tileLayer} from 'leaflet';

import {LeafletLayersDemoModel} from './layers-demo.model';
import {HttpClient} from '@angular/common/http';

const plzGeoJson = require('./plz.json');

@Component({
    selector: 'leafletLayersDemo',
    templateUrl: './layers-demo.component.html',
})
export class LeafletLayersDemoComponent implements OnInit {

    // Open Street Map and Open Cycle Map definitions
    LAYER_OCM = {
        id: 'opencyclemap',
        name: 'Open Cycle Map',
        enabled: true,
        layer: tileLayer('http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png', {
            maxZoom: 18,
            attribution: 'Open Cycle Map',
        }),
    };
    LAYER_OSM = {
        id: 'openstreetmap',
        name: 'Open Street Map',
        enabled: false,
        layer: tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 18,
            attribution: 'Open Street Map',
        }),
    };


    // layer1: any = geoJSON({
    //     type: 'Polygon',
    //     coordinates: [[
    //         [-121.6, 46.87],
    //         [-121.5, 46.87],
    //         [-121.5, 46.93],
    //         [-121.6, 46.89],
    //     ]],
    // });

    geoJSON = {
        id: 'geoJSON',
        name: 'Geo JSON Polygon',
        enabled: true,
        layer: geoJSON(
            ({
                type: 'Polygon',
                coordinates: [[
                    [-121.6, 46.87],
                    [-121.5, 46.87],
                    [-121.5, 46.93],
                    [-121.6, 46.89],
                ]],
            }) as any,
            {style: () => ({color: '#ff7800'})}),
    };

    circle = {
        id: 'circle',
        name: 'Circle',
        enabled: true,
        layer: circle([46.95, -122], {radius: 5000}),
    };
    polygon = {
        id: 'polygon',
        name: 'Polygon',
        enabled: true,
        layer: polygon([[46.8, -121.85], [46.92, -121.92], [46.87, -121.8]]),
    };
    square = {
        id: 'square',
        name: 'Square',
        enabled: true,
        layer: polygon([[46.8, -121.55], [46.9, -121.55], [46.9, -121.7], [46.8, -121.7]]),
    };
    marker = {
        id: 'marker',
        name: 'Marker',
        enabled: true,
        layer: marker([46.879966, -121.726909], {
            icon: icon({
                iconSize: [25, 41],
                iconAnchor: [13, 41],
                iconUrl: '2273e3d8ad9264b7daa5bdbf8e6b47f8.png',
                shadowUrl: '44a526eed258222515aa21eaffd14a96.png',
            }),
        }),
    };


    // Form model object
    model = new LeafletLayersDemoModel(
        [this.LAYER_OSM, this.LAYER_OCM],
        this.LAYER_OCM.id,
        [this.circle, this.polygon, this.square, this.marker, this.geoJSON],
    );


    // Values to bind to Leaflet Directive
    layers: Layer[];
    layersControl = {
        baseLayers: {
            'Open Street Map': this.LAYER_OSM.layer,
            'Open Cycle Map': this.LAYER_OCM.layer,
        },
        overlays: {
            Circle: this.circle.layer,
            Square: this.square.layer,
            Polygon: this.polygon.layer,
            Marker: this.marker.layer,
            GeoJSON: this.geoJSON.layer,
        },
    };
    options = {
        zoom: 10,
        //center: latLng(51.9481, 10.26517),
        center: latLng(46.879966, -121.726909),

    };


    constructor(private http: HttpClient) {
        this.apply();
    }

    ngOnInit(): void {

        function getFormattedDate(date) {
            let year = date.getFullYear();
            let month = (1 + date.getMonth()).toString().padStart(2, '0');
            let day = date.getDate().toString().padStart(2, '0');

            return year + "-" + month + "-" + day;
        }


        this.http.get(`http://${window.location.hostname}:8080/heat?responseDate=` + getFormattedDate(new Date())).toPromise()
            .then((resp) => {

                const wieGehtEsDirAntwortenNachPLZ = resp['72eciMp5RMiA2u5dfwgtAX'];
                console.log("REP ", wieGehtEsDirAntwortenNachPLZ);
                console.log("GEOJ", plzGeoJson);

                plzGeoJson.features
                    .forEach((feature) => {
                        console.log("GEOMETRY", feature.geometry);
                        this.geoJSON.layer.addLayer(geoJSON(feature.geometry, {
                            style: () => ({color: '#dddddd'}),
                        }));
                    });

            });


        this.geoJSON.layer.addLayer(
            geoJSON(
                ({
                    type: 'Polygon',
                    coordinates: [[
                        [-121.6, 46.87],
                        [-121.5, 46.87],
                        [-121.5, 46.83],
                        [-121.6, 46.79],
                    ]],
                }) as any,
                {
                    style: () => ({color: '#dddddd'}),
                },
            ),
        );
    }

    apply() {

        // Get the active base layer
        const baseLayer = this.model.baseLayers.find((l: any) => (l.id === this.model.baseLayer));

        // Get all the active overlay layers
        const newLayers = this.model.overlayLayers
            .filter((l: any) => l.enabled)
            .map((l: any) => l.layer);
        newLayers.unshift(baseLayer.layer);

        this.layers = newLayers;

        return false;
    }
}
