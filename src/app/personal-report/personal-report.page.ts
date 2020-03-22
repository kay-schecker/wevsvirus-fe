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
    labels: {};

    constructor(private readonly questionService: QuestionService) {
    }

    async ngOnInit() {
        const user = JSON.parse(window.localStorage.getItem('user'));
        this.moodQuestions = await this.questionService.loadUserMoodQuestions(user.id);
        this.labels = this.questionService.getAllMoodQuestions().reduce((acc, q) => {
            return {
                ...acc,
                [q.id]: q.question,
            };
        }, {});

        this.showChart();
    }

    showChart() {
        this.chartOptions = {
            chart: {
                zoomType: 'x',
            },
            title: {
                text: '',
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
                enabled: true,
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

            series: Object.entries(this.moodQuestions).map(([id, plot]) => {
                return {
                    type: 'line',
                    name: this.labels[id],
                    data: ((plot || []) as any).map((d) => {
                        try {
                            return [Date.parse(d[0]), d[1]];
                        } catch (e) {
                            return [];
                        }
                    }).sort((a, b) => {
                        return a[0] < b[0] ? 1 : -1;
                    }).slice(0, 7),
                };
            }),
        };

    }
}
