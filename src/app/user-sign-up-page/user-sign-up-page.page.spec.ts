import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UserSignUpPagePage } from './user-sign-up-page.page';

describe('UserSignUpPagePage', () => {
  let component: UserSignUpPagePage;
  let fixture: ComponentFixture<UserSignUpPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSignUpPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UserSignUpPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
