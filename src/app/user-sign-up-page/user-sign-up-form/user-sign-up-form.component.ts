import {Component, OnInit} from '@angular/core';
import {UserData, UserService} from '../../services/user.service';
import {AlertController} from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
    selector: 'app-user-sign-up-form',
    templateUrl: './user-sign-up-form.component.html',
    styleUrls: ['./user-sign-up-form.component.scss'],
})
export class UserSignUpFormComponent implements OnInit {
    Arr = Array;

    signUpData: UserData = {
        yearOfBirth: null,
        gender: null,
        plz: '',
        householdSize: null,
        pet: null,
    };

    constructor(
        private readonly userService: UserService,
        private readonly alertController: AlertController,
        private readonly router: Router,
    ) {
    }

    ngOnInit() {
    }

    radioSelect($event, attributeToChange) {
        this.signUpData[attributeToChange] = $event.detail.value;
    }

    async sendSignUp() {
        if (this.signUpData.yearOfBirth && this.signUpData.gender && this.signUpData.plz
            && this.signUpData.householdSize && this.signUpData.pet !== null
        ) {
            this.userService.signUp(this.signUpData)
                .then(() => {
                    this.router.navigate(['']);
                })
                .catch(() => {
                    this.alertController.create({
                        header: 'Fehler',
                        message: 'Leider ist etwas schief gelaufen. Bitte versuchen Sie es später nochmal.',
                        buttons: ['OK'],
                    }).then((alert: any) => {
                        alert.present();
                    });
                });

        } else { // invalid form
            this.alertController.create({
                header: 'Eingaben unvollständig',
                message: 'Bitte beantworten Sie sämtliche Fragen.',
                buttons: ['OK'],
            }).then((alert) => {
                alert.present();
            });
        }

    }

}
