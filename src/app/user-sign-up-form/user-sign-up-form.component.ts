import { Component, OnInit } from '@angular/core';
import {UserData} from '../services/user.service';

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
    householdSize: 0,
    pet: false,
  };

  constructor() {
  }

  ngOnInit() {
  }

  sendSignUp() {

  }

}
