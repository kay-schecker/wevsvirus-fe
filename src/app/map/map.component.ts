import {Component, EventEmitter, HostListener, Output, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, combineLatest, from, Observable} from 'rxjs';
import * as moment from 'moment';
import {sortBy} from 'lodash';
import {map} from 'rxjs/operators';
import {IonSlides, ModalController} from '@ionic/angular';
import {Question, QuestionService} from '../services/question.service';
import {DomSanitizer} from '@angular/platform-browser';
import {MapModalComponent} from './modal/modal.component';
import {ApiService} from '../services/api.service';

/**
 * https://mapshaper.org/
 */

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss'],
})
export class MapComponent {

    constructor(
        private readonly http: HttpClient,
        private readonly api: ApiService,
        private readonly questionService: QuestionService,
        private readonly domSanitizer: DomSanitizer,
        private readonly modalController: ModalController,
    ) {
    }

    private static readonly daysToShow = 6;

    @ViewChild('slider', null)
    slider: IonSlides;

    private readonly dates: moment.Moment[] = Array
        .from(new Array(MapComponent.daysToShow - 1))
        .reduce((dates) => [
            ...dates,
            dates[dates.length - 1].clone().subtract(1, 'day'),
        ], [moment().subtract(1, 'day')])
        .reverse();

    private readonly svg$ = this.http
        .get('./assets/geo/germany.svg', {responseType: 'text'})
        .pipe(map((svgText) => {
            const parser = new DOMParser();
            return (parser.parseFromString(svgText, 'text/xml'));
        }));

    private zoomed = false;

    private legend = [
        {boundary: 1, color: '#BCFFF7'},
        {boundary: 20, color: '#56FFEB'},
        {boundary: 40, color: '#00EFD3'},
        {boundary: 60, color: '#00BCA6'},
        {boundary: 80, color: '#008979'},
        {boundary: 100, color: '#195750'},
    ];

    private readonly questionId$ = new BehaviorSubject('72eciMp5RMiA2u5dfwgtAX');
    private readonly data$ = this.fetchData();

    @Output()
    private readonly slideChange = new EventEmitter<{ label: string }>();

    private readonly slides$ = combineLatest([
        this.svg$,
        this.data$,
        this.questionId$,
    ]).pipe(map(([svg, dataSet, questionId]) => dataSet.map(([date, data]) => ({
        date,
        svg: this.computeSVG(svg, data[questionId]),
    }))));

    @HostListener('click', ['$event.target.tagName', '$event.target.dataset', '$event.target'])
    async onClick(tagName: string, dataSet: { plz: string }) {

        if (tagName !== 'path') {
            return;
        }

        const modal = await this.modalController.create({
            component: MapModalComponent,
            componentProps: {
                ...dataSet,
                initialSlide: await this.slider.getActiveIndex(),
                data: await this.data$.toPromise(),
            },
            swipeToClose: true,
        });

        await modal.present();
    }

    private async onSlideDidChange(slider: IonSlides) {
        const label = this.dates[await slider.getActiveIndex()].locale('de-DE').format('dd, DD.MM.YYYY');
        this.slideChange.emit({label});
    }

    private selectQuestion(q: Question) {
        this.questionId$.next(q.id);
    }

    private fetchData(): Observable<any> {
        return from(Promise.all(this.dates.map(async mom => {
            const responseDate = mom.format('YYYY-MM-DD');
            const responseData = await this.api.getHeat(responseDate);
            return [responseDate, responseData];
        })));
    }

    private computeSVG(svg: Document, data: any) {

        this.setStyle(svg.querySelectorAll('path'), {
            fill: '#f7f7f7',
            stroke: '#cccccc',
        });

        for (const [plz, value] of data || []) {
            if (value > 0) {
                const nodes = svg.querySelectorAll(`[data-plz="${plz}"]`) as NodeListOf<SVGPathElement>;
                this.setStyle(nodes, {fill: this.getColorByValue(value)});
            }
        }

        const str = new XMLSerializer().serializeToString(svg);
        return this.domSanitizer.bypassSecurityTrustHtml(str);
    }

    private setStyle(nodes: NodeListOf<SVGPathElement>, style: {}) {
        for (const node of Array.from(nodes)) {
            Object.assign(node.style, style);
        }
    }

    private getColorByValue = (value: number): string => sortBy(this.legend, 'boundary')
        .find(({boundary}) => value <= boundary).color;

    private async toggleZoom() {
        this.zoomed = !this.zoomed;
        await this.slider.lockSwipes(this.zoomed);
    }
}
