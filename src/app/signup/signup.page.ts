import {Component, OnInit, ViewChild} from '@angular/core';
import {IonSlides} from '@ionic/angular';
import {UserService} from '../services/user.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.page.html',
    styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

    @ViewChild('slider', null) slider: IonSlides;

    constructor(public readonly userService: UserService) {
    }

    ngOnInit(): void {
    }

    public next(e: Event) {
        // e.preventDefault();
        // e.stopPropagation();
        // this.slider.lockSwipes(true)
        this.slider.slideNext();
    }

}
