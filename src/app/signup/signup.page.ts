import {Component} from '@angular/core';
import {generate} from 'short-uuid';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage {

  public readonly userId = generate()

}
