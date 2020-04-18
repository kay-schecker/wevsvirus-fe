import {Component} from '@angular/core';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.modal.html',
  styleUrls: ['./privacy.modal.scss'],
})
export class PrivacyModal {

  constructor(
      private readonly modalController: ModalController,
  ) {
  }

  public async close() {
    (await this.modalController.getTop()).dismiss();
  }

}
