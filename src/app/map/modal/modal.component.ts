import {Component, Input, OnInit} from '@angular/core';
import {ModalController, PickerController} from '@ionic/angular';
import {QuestionService} from '../../services/question.service';
import {combineLatest, Subject} from 'rxjs';
import * as moment from 'moment';
import {map} from 'rxjs/operators';

@Component({
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss'],
})
export class MapModalComponent implements OnInit {

    @Input()
    plz: string;

    @Input()
    data: Array<[string, {}]>;

    @Input()
    initialSlide: number;

    @Input()
    answers: {
        [key: string]: any
    };

    showSlider = false;

    private readonly plz$ = new Subject();

    private readonly answers$ = this.plz$.pipe(map((plz) => {
        return this.data.map(([date, data]) => {
            const reducedDataSet = Object.entries(data).reduce((acc, [qId, a]) => {
                const dp = (a as any).find(([p]) => p === plz);

                return ({
                    ...acc,
                    [qId]: dp ? dp[1] : undefined,
                });
            }, {});

            return {date: moment(date).locale('de-DE').format('dd, DD.MM.YYYY'), data: reducedDataSet};
        });
    }));

    public readonly vm$ = combineLatest([this.plz$, this.answers$]).pipe(map(([plz, answers]) => ({plz, answers})));

    constructor(
        private readonly modalController: ModalController,
        private readonly questionService: QuestionService,
        private readonly pickerController: PickerController,
    ) {
    }

    public async close() {
        (await this.modalController.getTop()).dismiss();
    }

    public async showPicker(zip: string) {

        const zips = [...new Set(Array
            .from(document.querySelectorAll<SVGPathElement>(`path[data-plz]`))
            .map(c => c.dataset.plz))]
            .sort();

        (await this.pickerController.create({
            columns: [{
                name: 'plz',
                selectedIndex: zips.indexOf(zip),
                options: zips.map(plz => ({
                    text: plz + 'XXX',
                    value: plz,
                })),
            }],
            buttons: [
                {
                    text: 'Abbrechen',
                    role: 'cancel',
                },
                {
                    text: 'Übernehmen',
                    handler: v => this.plz$.next(v.plz.value),
                },
            ],
        })).present();
    }

    ngOnInit(): void {
        setTimeout(() => {
            this.plz$.next(this.plz);
            this.showSlider = true;
        }, 0);
    }

    private getColumns(numColumns, numOptions, columnOptions) {
        const columns = [];
        for (let i = 0; i < numColumns; i++) {
            columns.push({
                name: `col-${i}`,
                options: this.getColumnOptions(i, numOptions, columnOptions),
            });
        }

        return columns;
    }

    private getColumnOptions(columnIndex, numOptions, columnOptions) {
        const options = [];
        for (let i = 0; i < numOptions; i++) {
            options.push({
                text: columnOptions[columnIndex][i % numOptions],
                value: i,
            });
        }

        return options;
    }


}
