import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SchlandPage } from './schland.page';

describe('SchlandPage', () => {
  let component: SchlandPage;
  let fixture: ComponentFixture<SchlandPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchlandPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SchlandPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
