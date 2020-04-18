import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';
import {padStart} from 'lodash';

@Pipe({
    name: 'timePipe',
})
export class TimePipePipe implements PipeTransform {

    transform(value: number): string {
        const d = moment.duration(value, 'hours');
        return [
            padStart(String(d.hours()), 2, '0'),
            padStart(String(d.minutes()), 2, '0'),
        ].join(':');
    }

}
