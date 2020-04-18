import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'slider',
    templateUrl: './slider.component.html',
    styleUrls: ['./slider.component.scss'],
})
export class SliderComponent {

    @Input()
    emoji: string;

    @Input()
    min: number;

    @Input()
    max: number;

    @Input()
    step = 1;

    @Input()
    value = 50;

    @Output()
    valueChange = new EventEmitter();


    constructor() {
    }

    private handleChange(newValue: number) {
        this.valueChange.emit(newValue);
        this.value = newValue;
    }

}
