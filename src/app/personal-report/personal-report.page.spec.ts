import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PersonalReportPage } from './personal-report.page';

describe('PersonalReportPage', () => {
  let component: PersonalReportPage;
  let fixture: ComponentFixture<PersonalReportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalReportPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PersonalReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
