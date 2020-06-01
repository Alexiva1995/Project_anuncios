import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SeeadvertisementsPage } from './seeadvertisements.page';

describe('SeeadvertisementsPage', () => {
  let component: SeeadvertisementsPage;
  let fixture: ComponentFixture<SeeadvertisementsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeeadvertisementsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SeeadvertisementsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
