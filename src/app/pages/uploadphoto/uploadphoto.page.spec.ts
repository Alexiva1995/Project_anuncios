import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UploadphotoPage } from './uploadphoto.page';

describe('UploadphotoPage', () => {
  let component: UploadphotoPage;
  let fixture: ComponentFixture<UploadphotoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadphotoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UploadphotoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
