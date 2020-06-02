import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PopinfoPage } from './popinfo.page';

describe('PopinfoPage', () => {
  let component: PopinfoPage;
  let fixture: ComponentFixture<PopinfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopinfoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PopinfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
