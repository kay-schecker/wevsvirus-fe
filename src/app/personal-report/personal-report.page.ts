import {Component, OnInit} from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
    selector: 'app-personal-report',
    templateUrl: './personal-report.page.html',
    styleUrls: ['./personal-report.page.scss'],
})
export class PersonalReportPage implements OnInit {

    Highcharts: typeof Highcharts = Highcharts;
    chartOptions: Highcharts.Options = {
        series: [{
            data: [1, 2, 3],
            type: 'line',
        }],
    };

    constructor() {
    }

    ngOnInit() {
    }

}
