import {Component, Input} from '@angular/core';

import * as Highcharts from 'highcharts';
import MapModule from 'highcharts/modules/map';
import {HttpClient} from '@angular/common/http';

MapModule(Highcharts);

@Component({
    selector: 'leafletLayersDemo',
    templateUrl: './layers-demo.component.html',
})
export class LeafletLayersDemoComponent {

    public readonly Highcharts: typeof Highcharts = Highcharts; // Highcharts, it's Highcharts

    @Input()
    questionId: string;

    private readonly world = this.http.get('./assets/world3.json').toPromise();
    private readonly data = this.http.get(`http://${window.location.hostname}:8080/heat?responseDate=${new Date().toISOString().substring(0, 10)}`).toPromise();

    constructor(
        private readonly http: HttpClient,
    ) {
    }

    chartMap: Promise<{
        questionId: string,
        chartOptions: any, // Highcharts.Options,
    }[]> = Promise.all([this.world, this.data]).then(([mapWorld, data]) => {


        return Object.entries(data).map(([questionId, d]) => {
            console.log(d.map(([plz, value]) => [String(plz).slice(0, 2), value]));

            return {
                questionId,
                chartOptions: ({
                    chart: {map: mapWorld},
                    title: {text: ''},

                    mapNavigation: {
                        enabled: false,
                        buttonOptions: {
                            verticalAlign: 'bottom',
                        },
                    },

                    colorAxis: {
                        dataClasses: [{
                            from: 0,
                            to: 1,
                            color: '#FFFFFF',
                        }, {
                            from: 1,
                            to: 20,
                            color: '#BCFFF7',
                        }, {
                            from: 20,
                            to: 40,
                            color: '#91E5DB',
                        }, {
                            from: 40,
                            to: 60,
                            color: '#00BCA6',
                        }, {
                            from: 60,
                            to: 80,
                            color: '#00675B',
                        }, {
                            from: 80,
                            to: 100,
                            color: '#002C27',
                        }],
                        min: 1,
                        max: 100,
                        type: 'linear',
                        minColor: '#FFFFFF',
                        maxColor: '#000000',
                    },

                    tooltip: {
                        headerFormat: '',
                        pointFormat: '<strong>PLZ {point.properties.plz}XXX:</strong> {point.value}%',
                    },

                    legend: {
                        enabled: false,
                    },

                    series: [{
                        data: d.map(([plz, value]) => [String(plz).slice(0, 2), Math.ceil(value)]),
                        keys: ['plz', 'value'],
                        name: '',
                        joinBy: 'plz',
                        states: {
                            hover: {
                                color: '#a4edba',
                                // format: 'LOREM {point.properties.plz}: {value}'
                            },
                        },
                        dataLabels: {
                            enabled: false,
                        },
                    }],
                }),
            };
        });

    });

}
