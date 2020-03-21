import {Component, OnInit} from '@angular/core';
import * as Highcharts from 'highcharts';
import {MoodQuestion, QuestionService} from '../services/question.service';

@Component({
    selector: 'app-personal-report',
    templateUrl: './personal-report.page.html',
    styleUrls: ['./personal-report.page.scss'],
})
export class PersonalReportPage implements OnInit {
    Highcharts: typeof Highcharts = Highcharts;
    chartOptions: Highcharts.Options;

    moodQuestions: Array<MoodQuestion> = [];

    constructor(private readonly questionService: QuestionService) {
    }

    async ngOnInit() {
        const user = JSON.parse(window.localStorage.getItem('user'));
        this.moodQuestions = await this.questionService.loadUserMoodQuestions(user.id);
        this.showChart();
    }

    showChart() {
        const dataOneQuestion = this.moodQuestions['72eciMp5RMiA2u5dfwgtAX'];

        let dataOneQuestionWithDatesConverted = dataOneQuestion
            .map((d) => {
                try {
                    return [Date.parse(d[0]), d[1]];
                } catch (e) {
                    return [];
                }
            });
        dataOneQuestionWithDatesConverted = dataOneQuestionWithDatesConverted.sort((a, b) => {
            return a[0] < b[0] ? 1 : -1;
        });

        this.chartOptions = {
            chart: {
                zoomType: 'x',
            },
            title: {
                text: 'Wie gut geht es Dir?',
            },
            subtitle: {
                text: document.ontouchstart === undefined ?
                    'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in',
            },
            xAxis: {
                type: 'datetime',
            },
            yAxis: {
                title: {
                    text: 'Stimmung',
                },
            },
            legend: {
                enabled: false,
            },
            plotOptions: {
                area: {

                    marker: {
                        radius: 2,
                    },
                    lineWidth: 1,
                    states: {
                        hover: {
                            lineWidth: 1,
                        },
                    },
                    threshold: null,
                },
            },

            series: [{
                type: 'line',
                name: '',
                data: dataOneQuestionWithDatesConverted,
            }],
        };

        // this.chartOptions = {
        //     series: [{
        //         data: [1, 2, 3],
        //         type: 'line',
        //     }],
        // };
    }
}
