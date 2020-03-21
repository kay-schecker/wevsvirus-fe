import {Component, ViewChild} from '@angular/core';
import {generate} from 'short-uuid';
import {IonSlides} from '@ionic/angular';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.page.html',
    styleUrls: ['./signup.page.scss'],
})
export class SignupPage {

    @ViewChild('slider') slider: IonSlides;

    public readonly userId = generate()

    public next(e: Event) {
        // e.preventDefault();
        // e.stopPropagation();
        // this.slider.lockSwipes(true)
        this.slider.slideNext();
    }

}
