import {Component, OnInit} from '@angular/core';
import {UserData} from '../../services/user.service';

@Component({
    selector: 'app-user-sign-up-form',
    templateUrl: './user-sign-up-form.component.html',
    styleUrls: ['./user-sign-up-form.component.scss'],
})
export class UserSignUpFormComponent implements OnInit {

    signUpData: UserData = {
        yearOfBirth: null,
        gender: 'MALE',
        plz: '',
        householdSize: null,
        pet: false,
    };

    constructor() {
    }

    radioSelect($event, attributeToChange) {
        console.log($event);
        this.signUpData[attributeToChange] = $event.detail.value;
    }

    ngOnInit() {
    }

    sendSignUp() {

    }

}
