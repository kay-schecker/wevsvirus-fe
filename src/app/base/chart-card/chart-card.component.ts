import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {UserService} from '../../services/user.service';
import * as moment from 'moment';
import {QuestionService} from '../../services/question.service';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {ObservableInput} from 'observable-input';
import {BaseChartDirective} from 'ng2-charts';
import {ChartDataSets} from 'chart.js';
import {ToastController} from '@ionic/angular';
import {Question} from '../../services/api/question';

@Component({
    selector: 'chart-card',
    templateUrl: './chart-card.component.html',
    styleUrls: ['./chart-card.component.scss'],
})
export class ChartCardComponent {

    @Input()
    @ObservableInput()
    mode: Observable<'mood' | 'health'>;

    @ViewChild(BaseChartDirective, null) chart: BaseChartDirective;

    private readonly daysToShow = 7;

    private readonly dates: moment.Moment[] = Array
        .from(new Array(this.daysToShow - 1))
        .reduce((dates) => [
            ...dates,
            dates[dates.length - 1].clone().subtract(1, 'day'),
        ], [moment()])
        .reverse();

    private readonly title$ = this.mode.pipe(map((m) => `Deine ${m === 'mood' ? 'Stimmung' : 'Aktivität'}`));
    private readonly questions$ = this.mode.pipe(map((mode) => this.questionService[`${mode}Questions`]));

    private readonly hiddenQuestionIds$ = new BehaviorSubject<Set<string>>(new Set());

    private readonly render$ = new BehaviorSubject<string>(undefined);

    private readonly chart$ = combineLatest([
        this.mode,
        this.render$,
    ]).pipe(switchMap(([mode]) => this.computeChart(mode)));

    constructor(
        private readonly apiService: ApiService,
        private readonly userService: UserService,
        private readonly questionService: QuestionService,
        private readonly toastController: ToastController,
    ) {
        this.questionService.onSave$.subscribe(() => {
            this.render$.next(new Date().toISOString());
        });
    }

    private async toggleQuestion(q: Question) {
        const nextValue = new Set(this.hiddenQuestionIds$.value);
        nextValue[nextValue.has(q.id) ? 'delete' : 'add'](q.id);
        this.hiddenQuestionIds$.next(nextValue);

        for (const dataSet of this.chart.chart.data.datasets) {
            dataSet.hidden = nextValue.has((dataSet as any).id);
        }

        const top = await this.toastController.getTop();

        if (top) {
            top.dismiss();
        }

        (await this.toastController.create({
            header: nextValue.has(q.id) ? 'Ausgeblendet:' : 'Eingeblendet:',
            message: q.question,
            duration: 2500,
            position: 'top',
            color: 'primary',
        })).present();

        this.chart.chart.update();
    }

    private computeChart = async (mode: 'mood' | 'health') => ({
        type: 'line',
        data: await this.loadData(mode),
        colors: [],
        legend: false,
        labels: this.dates.map((m) => m.locale('de-DE').format('dd')),
        options: {
            responsive: true,
            maintainAspectRatio: true,

            scales: {
                yAxes: [{
                    ticks: {
                        display: true,
                        autoSkipPadding: 2,
                        min: 0,
                        // max: mode === 'mood' ? 100 : 20,
                    },
                }],
            },
            tooltips: {
                enabled: false,
            },
        },
    });

    private loadData = async (mode: 'mood' | 'health') => {

        const data = await this.apiService[mode === 'mood' ? 'getMood' : 'getHealth'](this.userService.user.id);

        return this.questionService[`${mode}Questions`].map<ChartDataSets>((q) => {
            return ({
                id: q.id,
                data: this.dates.map((date) => {
                    if (data[q.id]) {
                        return data[q.id][date.format('YYYY-MM-DD')];
                    }
                }),
                label: q.question,
                cubicInterpolationMode: 'monotone',
                hidden: false,
                pointRadius: 5,
                hitRadius: 15,
                borderColor: q.color,
                pointBackgroundColor: q.color,
                pointBorderColor: q.color,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: q.color,
                pointHoverBorderColor: q.color,
                fill: false,
            });
        });
    };

}
