import {Component, OnInit} from '@angular/core';
import {UserData, UserService} from '../../services/user.service';
import {AlertController, ModalController} from '@ionic/angular';
import {Router} from '@angular/router';
import {PrivacyModal} from '../../modal/privacy/privacy.modal';

@Component({
    selector: 'app-user-sign-up-form',
    templateUrl: './sign-up-form.component.html',
    styleUrls: ['./sign-up-form.component.scss'],
})
export class SignUpFormComponent implements OnInit {

    signUpData: UserData = {
        yearOfBirth: null,
        gender: null,
        plz: '',
        householdSize: null,
        pet: null,
    };

    privacyAccepted = false

    constructor(
        private readonly userService: UserService,
        private readonly alertController: AlertController,
        private readonly modalController: ModalController,
        private readonly router: Router,
    ) {
    }

    ngOnInit() {
    }

    radioSelect($event, attributeToChange) {
        this.signUpData[attributeToChange] = $event.detail.value;
    }

    async showPrivacyLayer() {
        (await this.modalController.create({
            component: PrivacyModal,
        })).present();
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
